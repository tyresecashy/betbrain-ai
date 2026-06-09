import fs from "fs";

const DATA_DIR = "datasets";
const MAIN_FILE = `${DATA_DIR}/football_odds_dataset.json`;
const NEW_FILE = `${DATA_DIR}/batch_generated.json`;
const OUTPUT_FILE = `${DATA_DIR}/clean.json`;

function loadJSON(path) {
  try {
    return JSON.parse(fs.readFileSync(path, "utf-8"));
  } catch (e) {
    return [];
  }
}

// Validate structure
function isValidFixture(f) {
  return (
    f &&
    typeof f.match === "string" &&
    typeof f.odds_home === "number" &&
    typeof f.odds_draw === "number" &&
    typeof f.odds_away === "number" &&
    typeof f.actual_result === "string"
  );
}

const main = loadJSON(MAIN_FILE);
const batch = loadJSON(NEW_FILE);

// combine
let merged = [...main, ...batch];

// remove invalid rows
merged = merged.filter(isValidFixture);

// dedupe by match + date
const seen = new Set();
merged = merged.filter(f => {
  const key = `${f.match}_${f.date}`;
  if (seen.has(key)) return false;
  seen.add(key);
  return true;
});

// stats
const summary = {
  total: merged.length,
  fromMain: main.length,
  fromBatch: batch.length
};

fs.writeFileSync(OUTPUT_FILE, JSON.stringify(merged, null, 2));

console.log("=== MERGE ENGINE REPORT ===");
console.log(`Main: ${summary.fromMain}`);
console.log(`Batch: ${summary.fromBatch}`);
console.log(`Final: ${summary.total}`);
console.log("===========================");
