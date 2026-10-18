// Session 88 — Delivery Blocklist Loader (derived from build_blocklist.js census)
// Sources: governance/DELIVERY_BLOCKLIST_AND_SIMILARITY_FLAGS.json + governance/DEFECT_MANIFEST_DL008_DL026.json
// Regenerate with: node scripts/build_blocklist.js
window._cmaDeliveryBlocklist = (function () {
    var entries = [
        {qid:"P1-B-071"},{qid:"P1-C-004"},{qid:"P1-C-024"},{qid:"P1-D-060"},{qid:"P1-E-048"},{qid:"P1-A-078"},
        {qid:"P1-A-104"},{qid:"P1-C-112"},{qid:"P1-C-115"},{qid:"P1-C-116"},{qid:"P1-C-123"},{qid:"P1B-A-132"},
        {qid:"P1B-A-146"},{qid:"P1B-B-102"},{qid:"P1B-B-110"},{qid:"P1B-B-190"},{qid:"P1B-C-160"},{qid:"P1B-C-179"},
        {qid:"P1B-D-109"},{qid:"P1B-D-139"},{qid:"P1B-E-076"},{qid:"P1B-F-100"},{qid:"P1B-B-219"},{qid:"P1B-C-202"},
        {qid:"P1B-A-169"},{qid:"P1B-A-176"},{qid:"P1B-C-214"},{qid:"P1B-C-220"},{qid:"P1B-C-221"},{qid:"P1B-C-225"},
        {qid:"P1B-C-226"},{qid:"P1B-C-229"},{qid:"P1B-C-236"},{qid:"P1B-C-240"},{qid:"P1-AC-071"},{qid:"P1-AC-072"},
        {qid:"P1-AC-073"},{qid:"P1-AC-074"},{qid:"P1-AC-075"},{qid:"P1-BC-019"},{qid:"P1-BC-020"},{qid:"P1-BC-021"},
        {qid:"P1-EC-022"},{qid:"P1-EC-041"},{qid:"P1-CC-107"},{qid:"P1-AC-102"},{qid:"P1-AC-114"},{qid:"P1-BC-111"},
        {qid:"P1-DC-112"},{qid:"P1-DC-113"},{qid:"P1-DC-118"},{qid:"P1-DC-128"},{qid:"P1-BD-017"},{qid:"P1-BD-064"},
        {qid:"P1-ED-052"},{qid:"P1-ED-070"},{qid:"P1-CD-107"},{qid:"P1-CD-110"},{qid:"P1-CD-121"},{qid:"P1-CD-126"},
        {qid:"P1-AD-098"},{qid:"P1E-A-009"},{qid:"P1E-A-020"},{qid:"P1E-A-036"},{qid:"P1E-A-045"},{qid:"P1E-A-054"},
        {qid:"P1E-A-065"},{qid:"P1E-A-076"},{qid:"P1E-B-006"},{qid:"P1E-B-023"},{qid:"P1E-B-027"},{qid:"P1E-B-039"},
        {qid:"P1E-C-009"},{qid:"P1E-C-017"},{qid:"P1E-C-040"},{qid:"P1E-D-027"},{qid:"P1E-E-003"},{qid:"P1E-E-006"},
        {qid:"P1E-E-008"},{qid:"P1E-F-008"},{qid:"P1E-F-009"},{qid:"P1E-F-010"},{qid:"P1E-F-014"},{qid:"P1E-F-018"},
        {qid:"P1E-B-077"},{qid:"P1E-B-081"},{qid:"P1E-B-082"},{qid:"P1E-C-061"},{qid:"P1E-C-064"},{qid:"P1E-D-043"},
        {qid:"P1E-D-053"},{qid:"P1E-D-057"},{qid:"P1E-D-059"},{qid:"P1E-E-051"},{qid:"P1E-E-053"},{qid:"P1E-E-057"},
        {qid:"P1E-E-064"},{qid:"P1E-F-050"},{qid:"P1E-F-066"},{qid:"P1E-C-080"},{qid:"P1E-C-089"},{qid:"P1E-D-062"},
        {qid:"P1E-D-065"},{qid:"P1-E-R04"},{qid:"P1-E-R11"},{qid:"P1-E-R32"},{qid:"P1E-B-109"},{qid:"P1E-B-110"},
        {qid:"P1E-B-115"},{qid:"P1E-E-124"}
    ];
    var set = {};
    entries.forEach(function (e) { set[e.qid] = true; });
    return { blocked: set, count: entries.length };
})();
