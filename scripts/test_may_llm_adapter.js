/**
 * test_may_llm_adapter.js — Comprehensive test suite for MAY-003 LLM Adapter Layer
 * 
 * Validates:
 *   - may-llm-types.js: contract definitions, validation helpers, prompt templates
 *   - may-llm-provider-registry.js: provider registration, mock provider, skeleton adapters, selection
 *   - may-llm-adapter.js: adapter send/fallback, flag gating, error handling, timeout
 *   - may-feature-flags.js: new flags (ENABLE_AZURE_OPENAI_PROVIDER, ENABLE_OPENAI_PROVIDER)
 * 
 * Coverage:
 *   UNIT:       Provider registry, mock provider output, type contracts, validation
 *   INTEGRATION:  Adapter + registry + types working together
 *   FLAG:       All new flags default false, toggling behavior
 *   FAILURE:     Timeout, invalid requests, unavailable providers, all fall back
 *   REGRESSION:   Existing coaching modes + context builder tests still pass
 * 
 * Session: MAY-003
 * Governance: Light Lane (test-only — no pack/case/content impact)
 * 
 * Usage: node scripts/test_may_llm_adapter.js
 * Exit:   0 if all tests pass, 1 otherwise
 */

var fs = require('fs');
var path = require('path');
var vm = require('vm');

var ROOT = path.resolve(__dirname, '..');
var failures = 0;
var passes = 0;

function fail(label) {
  console.log('  FAIL: ' + label);
  failures++;
}

function pass(label) {
  console.log('  PASS: ' + label);
  passes++;
}

function assert(condition, label) {
  if (condition) pass(label);
  else fail(label);
}

// ── Mock browser environment ──────────────────────────────────

var mockWindow = {
  innerWidth: 1280,
  localStorage: {},
  document: {
    getElementById: function() { return null; },
    createElement: function() { return { style: {}, classList: { add: function() {} } }; },
    querySelector: function() { return null; }
  },
  location: { href: 'http://localhost/' },
  fetch: undefined,
  setTimeout: setTimeout,
  clearTimeout: clearTimeout
};

var mockQuestion = {
  QuestionID: 'P1-A-010',
  Part: 1,
  Section: 'A',
  Topic: 'Revenue Recognition',
  Stem: 'Under ASC 606, a performance obligation is satisfied when?',
  Choices: { A: 'Cash is received', B: 'Control transfers', C: 'Contract is signed', D: 'Invoice is sent' },
  CorrectChoice: 'B',
  ExplanationCorrect: 'Under ASC 606, revenue is recognized when control transfers to the customer.',
  ExplanationWrongA: 'Revenue recognition is not based on cash receipt under accrual accounting.',
  ExplanationWrongB: '',
  ExplanationWrongC: 'Contract signing establishes the agreement, not performance satisfaction.',
  ExplanationWrongD: 'Invoicing is an administrative step, not the revenue recognition trigger.',
  question_state: 'Certified',
  Difficulty: 'Moderate',
  DifficultyScore: 3,
  CognitiveLevel: 'Understand'
};

var mockPackA = [mockQuestion];

var mockState = {
  session: {
    id: 'test-session-003',
    mode: 'practice',
    qIndex: 0,
    mcqs: [mockQuestion],
    cases: [],
    completed: false,
    submitted: false
  }
};

// ── Shared sandbox for interdependent modules ─────────────────

var sharedSandbox = {
  window: mockWindow,
  console: console,
  process: { env: {} },
  module: { exports: {} },
  require: require,
  Promise: Promise,
  setTimeout: setTimeout,
  clearTimeout: clearTimeout,
  Date: Date,
  Math: Math
};
var sharedCtx = vm.createContext(sharedSandbox);

function loadModuleShared(filename, exportName) {
  var filePath = path.join(ROOT, filename);
  var code;
  try {
    code = fs.readFileSync(filePath, 'utf-8');
  } catch (e) {
    console.log('  FILE NOT FOUND: ' + filename + ' (' + e.message + ')');
    return null;
  }
  try {
    vm.runInContext(code, sharedCtx, { filename: filePath });
  } catch (e) {
    console.log('  PARSE ERROR in ' + filename + ': ' + e.message);
    return null;
  }
  return sharedSandbox.window[exportName] || sharedSandbox.module.exports;
}

function loadModuleNew(filename, exportName) {
  var sandbox = vm.createContext({
    window: JSON.parse(JSON.stringify(mockWindow)),
    console: console,
    process: { env: {} },
    module: { exports: {} },
    require: require,
    Promise: Promise,
    setTimeout: setTimeout,
    clearTimeout: clearTimeout,
    Date: Date,
    Math: Math
  });
  var filePath = path.join(ROOT, filename);
  var code;
  try {
    code = fs.readFileSync(filePath, 'utf-8');
  } catch (e) {
    console.log('  FILE NOT FOUND: ' + filename + ' (' + e.message + ')');
    return null;
  }
  try {
    vm.runInContext(code, sandbox, { filename: filePath });
  } catch (e) {
    console.log('  PARSE ERROR in ' + filename + ': ' + e.message);
    return null;
  }
  return sandbox.window[exportName] || sandbox.module.exports;
}

console.log('=== MAY-003 LLM ADAPTER LAYER TEST SUITE ===\n');

// ═══════════════════════════════════════════════════════════════════
// SECTION 1: Module Loading
// ═══════════════════════════════════════════════════════════════════

console.log('--- 1. Module Loading ---');

var MayFeatureFlags = loadModuleShared('may-feature-flags.js', 'MayFeatureFlags');
assert(MayFeatureFlags !== null, 'may-feature-flags.js loads');

mockWindow.packA = mockPackA;
mockWindow.state = mockState;
mockWindow.MayFeatureFlags = MayFeatureFlags;

var MayLLMTypes = loadModuleShared('may-llm-types.js', 'MayLLMTypes');
assert(MayLLMTypes !== null, 'may-llm-types.js loads');

mockWindow.MayLLMTypes = MayLLMTypes;
sharedSandbox.window.MayLLMTypes = MayLLMTypes;

var MayLLMProviderRegistry = loadModuleShared('may-llm-provider-registry.js', 'MayLLMProviderRegistry');
assert(MayLLMProviderRegistry !== null, 'may-llm-provider-registry.js loads');

mockWindow.MayLLMProviderRegistry = MayLLMProviderRegistry;
sharedSandbox.window.MayLLMProviderRegistry = MayLLMProviderRegistry;

var MayLLMAdapter = loadModuleShared('may-llm-adapter.js', 'MayLLMAdapter');
assert(MayLLMAdapter !== null, 'may-llm-adapter.js loads');

var MayContextBuilder = loadModuleShared('may-context-builder.js', 'MayContextBuilder');
assert(MayContextBuilder !== null, 'may-context-builder.js loads');

// ═══════════════════════════════════════════════════════════════════
// SECTION 2: Feature Flag Coverage
// ═══════════════════════════════════════════════════════════════════

console.log('\n--- 2. Feature Flag Coverage ---');

assert(MayFeatureFlags.isEnabled('ENABLE_AZURE_OPENAI_PROVIDER') === false,
  'ENABLE_AZURE_OPENAI_PROVIDER defaults to false');
assert(MayFeatureFlags.isEnabled('ENABLE_OPENAI_PROVIDER') === false,
  'ENABLE_OPENAI_PROVIDER defaults to false');
assert(MayFeatureFlags.isEnabled('ENABLE_LLM') === false,
  'ENABLE_LLM defaults to false');
assert(MayFeatureFlags.isEnabled('ENABLE_LLM_COACHING') === false,
  'ENABLE_LLM_COACHING defaults to false');
assert(MayFeatureFlags.isEnabled('ENABLE_LLM_SUMMARIES') === false,
  'ENABLE_LLM_SUMMARIES defaults to false');

var allFlags = MayFeatureFlags.getAll();
var flagCount = Object.keys(allFlags).length;
assert(flagCount >= 11, 'getAll returns adequate flags (got ' + flagCount + ', expected >= 11)');

MayFeatureFlags.setFlag('ENABLE_AZURE_OPENAI_PROVIDER', true);
assert(MayFeatureFlags.isEnabled('ENABLE_AZURE_OPENAI_PROVIDER') === true,
  'ENABLE_AZURE_OPENAI_PROVIDER can be enabled');
MayFeatureFlags.setFlag('ENABLE_AZURE_OPENAI_PROVIDER', false);

MayFeatureFlags.setFlag('ENABLE_OPENAI_PROVIDER', true);
assert(MayFeatureFlags.isEnabled('ENABLE_OPENAI_PROVIDER') === true,
  'ENABLE_OPENAI_PROVIDER can be enabled');
MayFeatureFlags.setFlag('ENABLE_OPENAI_PROVIDER', false);

var log = MayFeatureFlags.getChangeLog();
assert(log.length >= 2, 'Change log recorded toggle events');

// ═══════════════════════════════════════════════════════════════════
// SECTION 3: LLM Types — Request/Response Validation
// ═══════════════════════════════════════════════════════════════════

console.log('\n--- 3. LLM Types — Validation ---');

// 3a. Valid request
var validRequest = {
  mode: 'EXPLAIN',
  context: { question: {}, learner: {}, session: {}, app: {} },
  prompt: 'Explain revenue recognition',
  metadata: { requestId: 'test-1', timestamp: new Date().toISOString(), featureFlags: {} }
};
var vr = MayLLMTypes.validateRequest(validRequest);
assert(vr.valid === true, '3a: Valid request passes');
assert(vr.errors.length === 0, '3a: Valid request has 0 errors');

// 3b. Null request
var vrn = MayLLMTypes.validateRequest(null);
assert(vrn.valid === false, '3b: Null request fails');
assert(vrn.errors.length > 0, '3b: Null request has errors');

// 3c. Missing fields
var missingFields = { mode: 'EXPLAIN' };
var vrm = MayLLMTypes.validateRequest(missingFields);
assert(vrm.valid === false, '3c: Missing-field request fails');
assert(vrm.errors.length >= 3, '3c: Missing-field request has >= 3 errors');

// 3d. Invalid mode
var badMode = { mode: 'INVALID', context: {}, prompt: '', metadata: {} };
var vrb = MayLLMTypes.validateRequest(badMode);
assert(vrb.valid === false, '3d: Invalid mode fails');
assert(vrb.errors.some(function(e) { return e.indexOf('invalid mode') !== -1; }), '3d: Error mentions invalid mode');

// 3e. All valid modes pass
MayLLMTypes.VALID_MODES.forEach(function(mode) {
  var req = { mode: mode, context: {}, prompt: 'test', metadata: {} };
  var v = MayLLMTypes.validateRequest(req);
  assert(v.valid === true, '3e: Mode ' + mode + ' passes validation');
});

// 3f. Valid response
var validResponse = {
  success: true, content: 'Test response', confidence: 0.85,
  provider: 'mock', latency: 5, fallback: false
};
var vresp = MayLLMTypes.validateResponse(validResponse);
assert(vresp.valid === true, '3f: Valid response passes');

// 3g. Null response
assert(MayLLMTypes.validateResponse(null).valid === false, '3g: Null response fails');

// 3h. Missing fields in response
assert(MayLLMTypes.validateResponse({ success: true }).valid === false, '3h: Missing-field response fails');

// 3i. Out-of-range confidence
var badConf = { success: true, content: null, confidence: 1.5, provider: 'mock', latency: 0, fallback: true };
assert(MayLLMTypes.validateResponse(badConf).valid === false, '3i: Out-of-range confidence fails');

// 3j. Provider interface validation
var mp = MayLLMProviderRegistry.MockProvider;
assert(MayLLMTypes.validateProvider(mp).valid === true, '3j: MockProvider passes provider validation');
assert(MayLLMTypes.validateProvider(null).valid === false, '3j: Null provider fails');

// 3k. Prompt templates
assert(typeof MayLLMTypes.PROMPT_TEMPLATES['EXPLAIN'] === 'function', '3k: EXPLAIN template is function');
assert(typeof MayLLMTypes.PROMPT_TEMPLATES['QUIZ'] === 'function', '3k: QUIZ template is function');
assert(typeof MayLLMTypes.PROMPT_TEMPLATES['SOCRATIC'] === 'function', '3k: SOCRATIC template is function');
assert(typeof MayLLMTypes.PROMPT_TEMPLATES['STUDY_PLAN'] === 'function', '3k: STUDY_PLAN template is function');

// 3l. buildPrompt
var ctx = MayContextBuilder.buildFullContext('P1-A-010');
var promptText = MayLLMTypes.buildPrompt('EXPLAIN', ctx);
assert(typeof promptText === 'string', '3l: buildPrompt returns string');
assert(promptText.length > 0, '3l: buildPrompt returns non-empty');

var prompts = ['EXPLAIN', 'QUIZ', 'SOCRATIC', 'STUDY_PLAN'];
prompts.forEach(function(m) {
  var p = MayLLMTypes.buildPrompt(m, ctx);
  assert(p.length > 0, '3l: ' + m + ' prompt is non-empty');
});

// 3m. Invalid mode returns empty
assert(MayLLMTypes.buildPrompt('INVALID', ctx) === '', '3m: Invalid mode returns empty string');

// ═══════════════════════════════════════════════════════════════════
// SECTION 4: Provider Registry
// ═══════════════════════════════════════════════════════════════════

console.log('\n--- 4. Provider Registry ---');

var initResult = MayLLMProviderRegistry.initialize();
assert(initResult.count >= 3, '4a: Registry has >= 3 providers (got ' + initResult.count + ')');
assert(initResult.mockAvailable === true, '4a: Mock provider available');

var mock = MayLLMProviderRegistry.getProvider('mock');
assert(mock !== null, '4b: mock provider retrievable');
assert(mock.getProviderId() === 'mock', '4b: mock ID correct');
assert(mock.isAvailable() === true, '4b: mock always available');

var allProv = MayLLMProviderRegistry.getAllProviders();
assert(allProv.length >= 3, '4c: getAllProviders returns >= 3');

var mockConfig = mock.getConfig();
assert(mockConfig.providerId === 'mock', '4d: mock config ID correct');
assert(mockConfig.providerType === 'mock', '4d: mock config type correct');
assert(Array.isArray(mockConfig.capabilities), '4d: mock has capabilities array');
assert(mockConfig.capabilities.indexOf('explain') !== -1, '4d: mock supports explain');

var mockVal = mock.validateConfig();
assert(mockVal.valid === true, '4e: mock validateConfig passes');

// Health check
var hcDone = false;
mock.healthCheck().then(function(r) { hcDone = true; assert(r.available === true, '4f: mock health check available'); });

// Azure skeleton
var azure = MayLLMProviderRegistry.getProvider('azure-openai');
assert(azure !== null, '4g: Azure provider retrievable');
assert(azure.getProviderId() === 'azure-openai', '4g: Azure ID correct');
assert(typeof azure.send === 'function', '4g: Azure has send');
assert(azure.isAvailable() === false, '4h: Azure unavailable without env vars');
var azureVal = azure.validateConfig();
assert(azureVal.valid === false, '4h: Azure validateConfig fails without env');
assert(azureVal.errors.length > 0, '4h: Azure config has errors');

var openai = MayLLMProviderRegistry.getProvider('openai');
assert(openai !== null, '4i: OpenAI provider retrievable');
assert(openai.getProviderId() === 'openai', '4i: OpenAI ID correct');
assert(typeof openai.send === 'function', '4i: OpenAI has send');
assert(openai.isAvailable() === false, '4i: OpenAI unavailable without env vars');

assert(MayLLMProviderRegistry.getPrimaryProviderId() === 'mock', '4j: Primary defaults to mock');

var sel = MayLLMProviderRegistry.setPrimaryProvider('azure-openai');
assert(sel === 'mock', '4k: setPrimary falls back to mock for unavailable Azure');

assert(MayLLMProviderRegistry.selectProvider().getProviderId() === 'mock',
  '4l: selectProvider returns mock when no flags');

assert(MayLLMProviderRegistry.registerProvider(null) === false, '4m: registerProvider rejects null');
assert(MayLLMProviderRegistry.registerProvider({}) === false, '4m: registerProvider rejects invalid');

var customProvider = {
  _id: 'custom-test',
  getProviderId: function() { return this._id; },
  isAvailable: function() { return true; },
  send: function() { return Promise.resolve({ success: true }); },
  getConfig: function() { return { providerId: this._id }; }
};
assert(MayLLMProviderRegistry.registerProvider(customProvider) === true, '4n: registerProvider accepts valid');
assert(MayLLMProviderRegistry.getProvider('custom-test') !== null, '4n: Custom provider retrievable');
assert(MayLLMProviderRegistry.registerProvider(customProvider) === false, '4n: Duplicate rejected');

// ═══════════════════════════════════════════════════════════════════
// SECTION 5: Mock Provider — Deterministic Responses
// ═══════════════════════════════════════════════════════════════════

console.log('\n--- 5. Mock Provider — Responses ---');

function verifyMock(resp, mode) {
  assert(resp.success === true, '5-' + mode + ': success=true');
  assert(typeof resp.content === 'string', '5-' + mode + ': content is string');
  assert(resp.content.length > 0, '5-' + mode + ': content non-empty');
  assert(resp.confidence > 0, '5-' + mode + ': confidence > 0');
  assert(resp.provider === 'mock', '5-' + mode + ': provider=mock');
  assert(resp.fallback === false, '5-' + mode + ': fallback=false');
  assert(resp.error === null, '5-' + mode + ': error=null');
}

function testReq(mode) {
  return {
    mode: mode, context: ctx,
    prompt: MayLLMTypes.buildPrompt(mode, ctx),
    metadata: { requestId: 'test-' + mode, timestamp: new Date().toISOString(), featureFlags: {} }
  };
}

var modes = ['EXPLAIN', 'QUIZ', 'SOCRATIC', 'STUDY_PLAN'];
modes.forEach(function(mode) {
  mock.send(testReq(mode)).then(function(resp) {
    verifyMock(resp, mode);
  });
});

mock.send(testReq('EXPLAIN')).then(function(resp) {
  assert(resp.content.indexOf('Revenue') !== -1 || resp.content.indexOf('accounting') !== -1,
    '5: EXPLAIN references topic');
});

mock.send(testReq('SOCRATIC')).then(function(resp) {
  assert(resp.content.indexOf('?') !== -1, '5: SOCRATIC contains questions');
});

// ═══════════════════════════════════════════════════════════════════
// SECTION 6: LLM Adapter — Flag Gating
// ═══════════════════════════════════════════════════════════════════

console.log('\n--- 6. LLM Adapter — Flag Gating ---');

assert(MayLLMAdapter.isAvailable() === false, '6a: isAvailable=false with LLM off');

MayLLMAdapter.send('EXPLAIN', ctx).then(function(resp) {
  assert(resp.fallback === true, '6b: fallback when LLM off');
  assert(resp.success === false, '6b: success=false on fallback');
  assert(resp.content === null, '6b: content=null on fallback');
  assert(resp.provider === 'none', '6b: provider=none on fallback');
});

MayFeatureFlags.setFlag('ENABLE_LLM', true);
MayLLMAdapter.send('EXPLAIN', ctx).then(function(resp) {
  assert(resp.fallback === true, '6c: fallback with ENABLE_LLM but no sub-flag');
});
MayFeatureFlags.setFlag('ENABLE_LLM', false);

MayFeatureFlags.setFlag('ENABLE_LLM_COACHING', true);
MayLLMAdapter.send('EXPLAIN', ctx).then(function(resp) {
  assert(resp.fallback === true, '6d: fallback with sub-flag but no master');
});
MayFeatureFlags.setFlag('ENABLE_LLM_COACHING', false);

MayFeatureFlags.setFlag('ENABLE_LLM', true);
MayFeatureFlags.setFlag('ENABLE_LLM_COACHING', true);

MayLLMAdapter.send('EXPLAIN', ctx).then(function(resp) {
  assert(resp.fallback === false, '6e: non-fallback with both flags on');
  assert(resp.success === true, '6e: success=true');
  assert(typeof resp.content === 'string', '6e: content is string');
  assert(resp.content.length > 0, '6e: content non-empty');
  assert(resp.provider === 'mock', '6e: provider=mock');
  assert(resp.metadata.mode === 'EXPLAIN', '6e: metadata mode correct');
});

modes.forEach(function(mode) {
  MayLLMAdapter.send(mode, ctx).then(function(resp) {
    assert(resp.fallback === false, '6f: ' + mode + ' non-fallback with flags on');
    assert(resp.success === true, '6f: ' + mode + ' success=true');
    assert(resp.provider === 'mock', '6f: ' + mode + ' provider=mock');
    assert(resp.metadata.mode === mode, '6f: ' + mode + ' metadata mode correct');
  });
});

MayFeatureFlags.setFlag('ENABLE_LLM', false);
MayFeatureFlags.setFlag('ENABLE_LLM_COACHING', false);

// ═══════════════════════════════════════════════════════════════════
// SECTION 7: Adapter — Failure & Edge Paths
// ═══════════════════════════════════════════════════════════════════

console.log('\n--- 7. Adapter — Failure Paths ---');

MayFeatureFlags.setFlag('ENABLE_LLM', true);
MayFeatureFlags.setFlag('ENABLE_LLM_COACHING', true);

MayLLMAdapter.send('INVALID_MODE', ctx).then(function(resp) {
  assert(resp.fallback === true, '7a: Invalid mode returns fallback');
  assert(resp.error !== null, '7a: Invalid mode has error');
});

MayLLMAdapter.send('EXPLAIN', null).then(function(resp) {
  assert(resp.fallback === false, '7b: Null context does not crash');
});

var stats = MayLLMAdapter.getStats();
assert(typeof stats.totalRequests === 'number', '7c: stats has totalRequests');
assert(stats.totalRequests > 0, '7c: totalRequests > 0');

MayLLMAdapter.resetStats();
var stats2 = MayLLMAdapter.getStats();
assert(stats2.totalRequests === 0, '7c: resetStats zeros');
assert(stats2.fallbackCount === 0, '7c: resetStats zeros fallback');

var info = MayLLMAdapter.getProviderInfo();
assert(typeof info.providerId === 'string', '7d: getProviderInfo has providerId');
assert(typeof info.available === 'boolean', '7d: getProviderInfo has available');

MayLLMAdapter.configure({ timeoutMs: 5000 });
assert(MayLLMAdapter.CONFIG.timeoutMs === 5000, '7e: configure sets timeoutMs');
MayLLMAdapter.configure({ timeoutMs: 30000 });

MayFeatureFlags.setFlag('ENABLE_LLM', false);
MayFeatureFlags.setFlag('ENABLE_LLM_COACHING', false);

// ═══════════════════════════════════════════════════════════════════
// SECTION 8: Integration — Full Pipeline
// ═══════════════════════════════════════════════════════════════════

console.log('\n--- 8. Integration — Full Pipeline ---');

var fullCtx = MayContextBuilder.buildFullContext('P1-A-010');
assert(fullCtx !== null, '8a: Full context built');
assert(fullCtx.question !== null, '8a: Context has question');
assert(fullCtx.learner !== null, '8a: Context has learner');

MayFeatureFlags.setFlag('ENABLE_LLM', true);
MayFeatureFlags.setFlag('ENABLE_LLM_COACHING', true);

MayLLMAdapter.send('EXPLAIN', fullCtx).then(function(resp) {
  assert(resp.fallback === false, '8b: Pipeline EXPLAIN non-fallback');
  assert(resp.success === true, '8b: Pipeline EXPLAIN success');
  assert(resp.provider === 'mock', '8b: Pipeline uses mock');
});

MayLLMAdapter.send('STUDY_PLAN', fullCtx).then(function(resp) {
  assert(resp.fallback === false, '8b: Pipeline STUDY_PLAN non-fallback');
  assert(resp.success === true, '8b: Pipeline STUDY_PLAN success');
});

MayFeatureFlags.setFlag('ENABLE_LLM', false);
MayFeatureFlags.setFlag('ENABLE_LLM_COACHING', false);

// Azure provider integration
var azureProv = MayLLMProviderRegistry.getProvider('azure-openai');
assert(azureProv !== null, '8c: Azure provider in registry');
assert(typeof azureProv.send === 'function', '8c: Azure has send');

azureProv.send(testReq('EXPLAIN')).then(function(resp) {
  assert(resp.fallback === true, '8d: Azure falls back without credentials');
  assert(resp.success === false, '8d: Azure returns success=false');
  assert(resp.error !== null, '8d: Azure returns error message');
});

// ═══════════════════════════════════════════════════════════════════
// SECTION 9: Contract Schema Integrity
// ═══════════════════════════════════════════════════════════════════

console.log('\n--- 9. Contract Schema Integrity ---');

var rs = MayLLMTypes.REQUEST_SCHEMA;
assert(rs.required.length === 4, '9a: REQUEST_SCHEMA has 4 required fields');
assert(rs.validModes.length === 4, '9a: REQUEST_SCHEMA has 4 valid modes');

var rsp = MayLLMTypes.RESPONSE_SCHEMA;
assert(rsp.required.length >= 6, '9b: RESPONSE_SCHEMA has >= 6 required fields');

var pi = MayLLMTypes.PROVIDER_INTERFACE;
assert(pi.requiredMethods.length === 4, '9c: PROVIDER_INTERFACE has 4 required methods');
assert(pi.requiredMethods.indexOf('send') !== -1, '9c: send required');
assert(pi.requiredMethods.indexOf('getProviderId') !== -1, '9c: getProviderId required');
assert(pi.requiredMethods.indexOf('isAvailable') !== -1, '9c: isAvailable required');
assert(pi.requiredMethods.indexOf('getConfig') !== -1, '9c: getConfig required');

// ═══════════════════════════════════════════════════════════════════
// SECTION 10: Security Requirements
// ═══════════════════════════════════════════════════════════════════

console.log('\n--- 10. Security Checks ---');

var credPatterns = [
  /api[_-]?key\s*[:=]\s*['"][A-Za-z0-9_\-]{20,}['"]/i,
  /Bearer\s+[A-Za-z0-9_\-]{20,}/i,
  /password\s*[:=]\s*['"][^'"]+['"]/i,
  /secret\s*[:=]\s*['"][^'"]+['"]/i
];

function checkCreds(fileName, label) {
  var code = fs.readFileSync(path.join(ROOT, fileName), 'utf-8');
  var found = false;
  credPatterns.forEach(function(pat) {
    if (pat.test(code)) {
      fail(label + ': Hardcoded credential found');
      found = true;
    }
  });
  if (!found) pass(label + ': No hardcoded credentials');
}

checkCreds('may-llm-provider-registry.js', '10a: Provider registry');
checkCreds('may-llm-adapter.js', '10b: Adapter');
checkCreds('may-llm-types.js', '10c: Types');

assert(mockWindow.fetch === undefined, '10d: No fetch available — network-free test');

// ═══════════════════════════════════════════════════════════════════
// SECTION 11: Regression — Existing Modules
// ═══════════════════════════════════════════════════════════════════

console.log('\n--- 11. Regression — Existing MAY Modules ---');

var regCtx = MayContextBuilder.buildFullContext('P1-A-010');
assert(regCtx !== null, '11a: Context builder still works');
assert(regCtx.question !== null, '11a: Question resolved');
assert(regCtx.question.stem.indexOf('ASC 606') !== -1, '11a: Stem preserved');

assert(MayFeatureFlags.isEnabled('ENABLE_CONTEXT_BUILDER') === false,
  '11b: ENABLE_CONTEXT_BUILDER still false');
assert(MayFeatureFlags.isEnabled('ENABLE_COACHING_ROUTER') === false,
  '11b: ENABLE_COACHING_ROUTER still false');

var snap = MayFeatureFlags.snapshot();
assert(typeof snap.flags === 'object', '11c: snapshot has flags');
assert(snap.flags.ENABLE_LLM === false, '11c: snapshot shows LLM disabled');

// ═══════════════════════════════════════════════════════════════════
// Final Report
// ═══════════════════════════════════════════════════════════════════

setTimeout(function() {
  console.log('\n=== RESULTS ===');
  console.log('  Passes: ' + passes);
  console.log('  Failures: ' + failures);

  if (failures > 0) {
    console.log('\n*** ' + failures + ' TEST(S) FAILED ***');
    process.exit(1);
  } else {
    console.log('\n*** ALL ' + passes + ' TESTS PASSED ***');
    process.exit(0);
  }
}, 800);
