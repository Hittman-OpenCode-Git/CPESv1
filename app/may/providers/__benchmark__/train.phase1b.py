"""
train.phase1b.py — Fine-tune google/mobilebert-uncased for 4-way CMA intent classification.

Pipeline:
  1. Load gold.intents.json (48 items, 12 per mode) and heldout.intents.json (24 items).
  2. 4-fold stratified cross-validation (3 per mode held out per fold, 9 train) for honest estimate.
  3. Pick best fold checkpoint, then final-train on all 48 items.
  4. Export quantized ONNX (q8) to app/may/providers/models/mobilebert-intent-q8/

Lane: Light Lane (no pack/case/governance writes).
"""

import json
import os
import sys
import time
import shutil
from pathlib import Path

import numpy as np
import torch
from torch.utils.data import Dataset, DataLoader
from transformers import (
    AutoTokenizer,
    AutoModelForSequenceClassification,
    get_linear_schedule_with_warmup,
)
from optimum.onnxruntime import ORTQuantizer, ORTOptimizer, ORTModelForSequenceClassification
from optimum.onnxruntime.configuration import AutoQuantizationConfig, QuantizationConfig

BASE_MODEL = "nreimers/MiniLM-L6-H384-uncased"
LABELS = ["EXPLAIN", "QUIZ", "SOCRATIC", "STUDY_PLAN"]
LABEL2ID = {l: i for i, l in enumerate(LABELS)}
ID2LABEL = {i: l for i, l in enumerate(LABELS)}
MAX_LEN = 64  # free-text queries are short
BATCH_SIZE = 4  # small dataset → small batch
EPOCHS_PER_FOLD = 8
LR = 2e-5
WARMUP_RATIO = 0.2
WEIGHT_DECAY = 0.01
MAX_GRAD_NORM = 1.0

REPO = Path(__file__).resolve().parents[2]  # app/may/providers/ -> app/may -> app -> CMA root
BENCH = Path(__file__).resolve().parent
GOLD = BENCH / "gold.intents.json"
HELDOUT = BENCH / "heldout.intents.json"
OUT_DIR = BENCH.parent / "models" / "mobilebert-intent-q8"
CV_RESULTS = BENCH / "train-phase1b-cv-results.json"
TRAIN_RESULTS = BENCH / "train-phase1b-final-results.json"


class IntentDataset(Dataset):
    def __init__(self, items, tokenizer):
        self.items = items
        self.tokenizer = tokenizer

    def __len__(self):
        return len(self.items)

    def __getitem__(self, idx):
        item = self.items[idx]
        enc = self.tokenizer(
            item["text"],
            max_length=MAX_LEN,
            padding="max_length",
            truncation=True,
            return_tensors="pt",
        )
        return {
            "input_ids": enc["input_ids"].squeeze(0),
            "attention_mask": enc["attention_mask"].squeeze(0),
            "label": torch.tensor(LABEL2ID[item["mode"]], dtype=torch.long),
        }


def load_gold():
    with open(GOLD, "r", encoding="utf-8") as f:
        return json.load(f)


def load_heldout():
    with open(HELDOUT, "r", encoding="utf-8") as f:
        return json.load(f)


def stratified_kfold(items, k=4, seed=42):
    """Split items into k folds stratified by mode."""
    by_mode = {}
    for it in items:
        by_mode.setdefault(it["mode"], []).append(it)
    rng = np.random.RandomState(seed)
    folds = [[] for _ in range(k)]
    for mode, lst in by_mode.items():
        idx = np.arange(len(lst))
        rng.shuffle(idx)
        for i, j in enumerate(idx):
            folds[i % k].append(lst[j])
    return folds


def train_one(tokenizer, train_items, eval_items=None, epochs=EPOCHS_PER_FOLD):
    model = AutoModelForSequenceClassification.from_pretrained(
        BASE_MODEL, num_labels=len(LABELS), id2label=ID2LABEL, label2id=LABEL2ID
    )
    train_ds = IntentDataset(train_items, tokenizer)
    train_dl = DataLoader(train_ds, batch_size=BATCH_SIZE, shuffle=True)
    optim = torch.optim.AdamW(model.parameters(), lr=LR, weight_decay=WEIGHT_DECAY)
    total_steps = len(train_dl) * epochs
    warmup_steps = max(1, int(total_steps * WARMUP_RATIO))
    sched = get_linear_schedule_with_warmup(optim, num_warmup_steps=warmup_steps, num_training_steps=total_steps)

    history = []
    for ep in range(epochs):
        model.train()
        ep_loss = 0.0
        ep_count = 0
        for batch in train_dl:
            optim.zero_grad()
            out = model(
                input_ids=batch["input_ids"],
                attention_mask=batch["attention_mask"],
                labels=batch["label"],
            )
            loss = out.loss
            loss.backward()
            torch.nn.utils.clip_grad_norm_(model.parameters(), MAX_GRAD_NORM)
            optim.step()
            sched.step()
            ep_loss += loss.item()
            ep_count += 1
        avg_loss = ep_loss / max(ep_count, 1)
        rec = {"epoch": ep + 1, "train_loss": round(avg_loss, 4)}
        if eval_items is not None:
            eval_acc = evaluate(model, tokenizer, eval_items)
            rec["eval_acc"] = round(eval_acc, 4)
        history.append(rec)
        log = f"  epoch {ep+1}/{epochs} loss={avg_loss:.4f}"
        if "eval_acc" in rec:
            log += f" eval_acc={rec['eval_acc']*100:.1f}%"
        print(log, flush=True)
    return model, history


@torch.no_grad()
def evaluate(model, tokenizer, items):
    model.eval()
    correct = 0
    for it in items:
        enc = tokenizer(it["text"], max_length=MAX_LEN, padding="max_length", truncation=True, return_tensors="pt")
        out = model(input_ids=enc["input_ids"], attention_mask=enc["attention_mask"])
        pred = int(out.logits.argmax(-1).item())
        if ID2LABEL[pred] == it["mode"]:
            correct += 1
    return correct / max(len(items), 1)


def export_onnx(model, tokenizer, onnx_dir):
    """Export the trained model to ONNX and dynamically quantize to int8 (q8).

    Uses optimum CLI to produce an ONNX model in transformers.js-compatible
    structure (config.json + tokenizer.json + onnx/model.onnx), then
    direct onnxruntime.quantize_dynamic for int8 quantization (avoids
    ORTQuantizer's strict shape-inference which fails on certain O2 outputs).
    """
    import onnx
    from onnxruntime.quantization import quantize_dynamic, QuantType

    onnx_dir.mkdir(parents=True, exist_ok=True)
    # Stage fp32 model in a temporary Transformers save, then export via optimum.
    stage = onnx_dir / "_stage"
    if stage.exists():
        shutil.rmtree(stage, ignore_errors=True)
    stage.mkdir(exist_ok=True)
    model.save_pretrained(stage)
    tokenizer.save_pretrained(stage)

    # Export to ONNX via optimum CLI — transformers.js consumes single-file
    # model.onnx + config.json + tokenizer.json + vocab.txt.
    import subprocess
    # Use opset 17 (latest supported) and skip O2 (which causes shape inference issues downstream)
    cmd = [
        sys.executable, "-m", "optimum.exporters.onnx",
        "--model", str(stage),
        "--task", "text-classification",
        "--opset", "17",
        "--monolith",       # single file output
        str(onnx_dir),
    ]
    print("  exporting ONNX via optimum CLI:", " ".join(cmd), flush=True)
    subprocess.check_call(cmd, stdout=sys.stdout, stderr=sys.stderr)

    # Direct int8 dynamic quantization — handles shape inference robustly
    print("  applying dynamic int8 quantization (onnxruntime)...", flush=True)
    src_onnx = onnx_dir / "model.onnx"
    dst_onnx = onnx_dir / "model_quant.onnx"
    quantize_dynamic(
        str(src_onnx), str(dst_onnx),
        weight_type=QuantType.QInt8,
        extra_options={"DefaultTensorType": int(onnx.TensorProto.FLOAT)},
    )
    # Replace model.onnx with quantized version
    shutil.move(str(dst_onnx), str(src_onnx))

    # Sanity: list final files
    print("  files in export dir:", flush=True)
    for f in sorted(onnx_dir.rglob("*")):
        if f.is_file():
            print(f"    {f.relative_to(onnx_dir)} ({f.stat().st_size/1024:.1f} KB)", flush=True)

    # Clean up staging dir (ignore file-lock errors on Windows)
    try:
        if stage.exists():
            shutil.rmtree(stage, ignore_errors=True)
    except Exception as e:
        print(f"Warning: could not clean stage dir {stage}: {e}", flush=True)
        import time
        time.sleep(0.5)
        try:
            shutil.rmtree(stage, ignore_errors=True)
        except Exception:
            pass
    return onnx_dir


def main():
    print("=== Phase 1b Fine-Tune ===", flush=True)
    print(f"Base model: {BASE_MODEL}", flush=True)
    print(f"Max len: {MAX_LEN}, batch: {BATCH_SIZE}, epochs/fold: {EPOCHS_PER_FOLD}, lr: {LR}", flush=True)

    gold = load_gold()
    heldout = load_heldout()
    print(f"Gold train items: {len(gold)}", flush=True)
    print(f"Held-out test items: {len(heldout)} (NEVER train on these)", flush=True)
    print(f"Distribution by mode:", flush=True)
    by_mode = {}
    for it in gold:
        by_mode[it["mode"]] = by_mode.get(it["mode"], 0) + 1
    for m, c in sorted(by_mode.items()):
        print(f"  {m}: {c}", flush=True)

    tokenizer = AutoTokenizer.from_pretrained(BASE_MODEL)

    # ── 4-fold cross-validation ──
    print("\n=== 4-fold cross-validation ===", flush=True)
    folds = stratified_kfold(gold, k=4)
    cv_results = []
    for fold_idx in range(len(folds)):
        eval_set = folds[fold_idx]
        train_set = []
        for i, f in enumerate(folds):
            if i != fold_idx:
                train_set.extend(f)
        print(f"\nFold {fold_idx+1}/4: train={len(train_set)} eval={len(eval_set)}", flush=True)
        model, history = train_one(tokenizer, train_set, eval_items=eval_set)
        final_eval_acc = history[-1]["eval_acc"]
        cv_results.append({
            "fold": fold_idx + 1,
            "train_size": len(train_set),
            "eval_size": len(eval_set),
            "final_train_loss": history[-1]["train_loss"],
            "final_eval_acc": final_eval_acc,
            "history": history,
        })
        # Free model
        del model
        torch.cuda.empty_cache() if torch.cuda.is_available() else None

    mean_acc = float(np.mean([r["final_eval_acc"] for r in cv_results]))
    std_acc = float(np.std([r["final_eval_acc"] for r in cv_results]))
    print(f"\nCV mean acc: {mean_acc*100:.1f}% ± {std_acc*100:.1f}%", flush=True)

    # ── Final training on all 48 ──
    print("\n=== Final training on all 48 items ===", flush=True)
    final_model, final_history = train_one(tokenizer, gold, eval_items=None, epochs=EPOCHS_PER_FOLD)

    # ── Held-out evaluation (NEVER train on these) ──
    print("\n=== Held-out test evaluation (NEVER TRAINED ON) ===", flush=True)
    held_acc = evaluate(final_model, tokenizer, heldout)
    print(f"Held-out accuracy: {held_acc*100:.1f}% ({int(held_acc*len(heldout))}/{len(heldout)})", flush=True)

    # Per-mode breakdown on heldout
    per_mode = {}
    for it in heldout:
        mode = it["mode"]
        enc = tokenizer(it["text"], max_length=MAX_LEN, padding="max_length", truncation=True, return_tensors="pt")
        with torch.no_grad():
            out = final_model(input_ids=enc["input_ids"], attention_mask=enc["attention_mask"])
        pred = ID2LABEL[int(out.logits.argmax(-1).item())]
        if mode not in per_mode:
            per_mode[mode] = {"correct": 0, "total": 0}
        per_mode[mode]["total"] += 1
        if pred == mode:
            per_mode[mode]["correct"] += 1
    print("Per-mode held-out:", flush=True)
    for m, s in sorted(per_mode.items()):
        print(f"  {m}: {s['correct']}/{s['total']} = {s['correct']/s['total']*100:.1f}%", flush=True)

    # ── Persist results BEFORE export (export may fail on Windows file locks) ──
    print("\n=== Persisting CV + training results ===", flush=True)
    cv_payload = {
        "phase": "Phase 1b fine-tune (4-fold CV)",
        "model": BASE_MODEL,
        "labels": LABELS,
        "maxLen": MAX_LEN,
        "batchSize": BATCH_SIZE,
        "epochsPerFold": EPOCHS_PER_FOLD,
        "lr": LR,
        "folds": cv_results,
        "meanAcc": mean_acc,
        "stdAcc": std_acc,
        "generatedAt": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
    }
    with open(CV_RESULTS, "w", encoding="utf-8") as f:
        json.dump(cv_payload, f, indent=2)
    print(f"CV results: {CV_RESULTS}", flush=True)

    train_payload = {
        "phase": "Phase 1b final training",
        "model": BASE_MODEL,
        "labels": LABELS,
        "history": final_history,
        "heldOutAccuracy": held_acc,
        "perMode": per_mode,
        "generatedAt": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
    }
    with open(TRAIN_RESULTS, "w", encoding="utf-8") as f:
        json.dump(train_payload, f, indent=2)
    print(f"Final training results: {TRAIN_RESULTS}", flush=True)

    # ── Export quantized ONNX ──
    print("\n=== Exporting quantized ONNX (q8) ===", flush=True)
    if OUT_DIR.exists():
        try:
            shutil.rmtree(OUT_DIR, ignore_errors=True)
        except Exception as e:
            print(f"Warning: could not fully clean {OUT_DIR}: {e}", flush=True)
    export_onnx(final_model, tokenizer, OUT_DIR)
    print(f"Exported to {OUT_DIR}", flush=True)
    # Report file sizes
    total_bytes = 0
    for f in OUT_DIR.rglob("*"):
        if f.is_file():
            total_bytes += f.stat().st_size
    print(f"Total size: {total_bytes/1024/1024:.2f} MB", flush=True)

    # Update train_payload with export size now
    train_payload["exportDir"] = str(OUT_DIR)
    train_payload["exportSizeMB"] = total_bytes / 1024 / 1024
    with open(TRAIN_RESULTS, "w", encoding="utf-8") as f:
        json.dump(train_payload, f, indent=2)
    print(f"Final training results updated with export info", flush=True)

    return 0


if __name__ == "__main__":
    sys.exit(main())
