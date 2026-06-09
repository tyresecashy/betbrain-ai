import { fixtures } from "./data.js";
import { validateFixtures } from "./validator.js";
import { analyzeFixtures } from "./analyzer.js";

const valid = validateFixtures(fixtures).valid;
const analyzed = analyzeFixtures(valid);

// extract scores
const scores = analyzed.map(f => f.scores.final).sort((a,b)=>a-b);

const min = scores[0];
const max = scores[scores.length - 1];

// percentiles
function percentile(arr, p) {
  const idx = Math.floor(p * arr.length);
  return arr[idx];
}

const p30 = percentile(scores, 0.3);
const p60 = percentile(scores, 0.6);
const p85 = percentile(scores, 0.85);

console.log("\n📊 BETKING AI CALIBRATION REPORT\n");

console.log("MIN SCORE:", min.toFixed(3));
console.log("MAX SCORE:", max.toFixed(3));

console.log("\nRECOMMENDED THRESHOLDS:");
console.log("SAFE  ≥", p60.toFixed(3));
console.log("BOOST ≥", p30.toFixed(3), "and <", p60.toFixed(3));
console.log("KING  <", p30.toFixed(3));

console.log("\nRAW DISTRIBUTION:");
scores.forEach(s => console.log(s.toFixed(3)));
