import fs from "fs";
import { enrichMatch } from "./enrichEngine.js";

const raw = JSON.parse(
  fs.readFileSync("datasets/football_odds_dataset.json", "utf-8")
);

const enriched = raw.map(enrichMatch);

fs.writeFileSync(
  "datasets/enriched_dataset.json",
  JSON.stringify(enriched, null, 2)
);

console.log("=== ENRICHMENT COMPLETE ===");
console.log("Input:", raw.length);
console.log("Output:", enriched.length);
console.log("Saved → datasets/enriched_dataset.json");
