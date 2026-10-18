const fs = require('fs');

const app = fs.readFileSync('app/app.js', 'utf8');

console.log('=== SESSION RESTORE STRESS ===');
const mcqsAccess = (app.match(/s\.mcqs\.length/g) || []).length;
const casesAccess = (app.match(/s\.cases\.length/g) || []).length;
const guardedMcqs = (app.match(/\(s\.mcqs \|\| \[\]\)\.length/g) || []).length;
const guardedCases = (app.match(/\(s\.cases \|\| \[\]\)\.length/g) || []).length;

console.log('s.mcqs.length accesses:', mcqsAccess);
console.log('s.cases.length accesses:', casesAccess);
console.log('Guarded (s.mcqs || []).length:', guardedMcqs);
console.log('Guarded (s.cases || []).length:', guardedCases);
console.log('Unprotected mcqs:', mcqsAccess - guardedMcqs);
console.log('Unprotected cases:', casesAccess - guardedCases);

console.log('\n=== INJECTION SURFACE ===');
const evalCount = (app.match(/eval\(/g) || []).length;
const funcConstructor = (app.match(/new Function\(/g) || []).length;
console.log('eval() calls:', evalCount);
console.log('new Function() calls:', funcConstructor);

console.log('\n=== localStorage OPERATIONS ===');
const lsGet = (app.match(/localStorage\.getItem\(/g) || []).length;
const lsSet = (app.match(/localStorage\.setItem\(/g) || []).length;
const lsRemove = (app.match(/localStorage\.removeItem\(/g) || []).length;
console.log('getItem:', lsGet, 'setItem:', lsSet, 'removeItem:', lsRemove);

console.log('\n=== JSON.parse CALLS ===');
const jsonParse = (app.match(/JSON\.parse\(/g) || []).length;
console.log('JSON.parse calls:', jsonParse);

console.log('\n=== INNERHTML / OUTERHTML (XSS SURFACE) ===');
const innerHTML = (app.match(/\.innerHTML\s*=/g) || []).length;
const outerHTML = (app.match(/\.outerHTML\s*=/g) || []).length;
console.log('innerHTML assignments:', innerHTML);
console.log('outerHTML assignments:', outerHTML);

console.log('\n=== EVENT HANDLER REGISTRATION ===');
const addEventListener = (app.match(/\.addEventListener\(/g) || []).length;
console.log('addEventListener calls:', addEventListener);

console.log('\n=== TIMER MANIPULATION ===');
const setTimeoutCalls = (app.match(/setTimeout\(/g) || []).length;
const setIntervalCalls = (app.match(/setInterval\(/g) || []).length;
const clearTimeoutCalls = (app.match(/clearTimeout\(/g) || []).length;
const clearIntervalCalls = (app.match(/clearInterval\(/g) || []).length;
console.log('setTimeout:', setTimeoutCalls, 'setInterval:', setIntervalCalls);
console.log('clearTimeout:', clearTimeoutCalls, 'clearInterval:', clearIntervalCalls);

console.log('\n=== PROTOTYPE POLLUTION CHECK ===');
const protoAssign = (app.match(/__proto__/g) || []).length;
const constructorAssign = (app.match(/\.constructor\s*=/g) || []).length;
console.log('__proto__ references:', protoAssign);
console.log('constructor assignments:', constructorAssign);