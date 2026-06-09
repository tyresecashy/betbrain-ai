import fs from "fs";
import { aiPredict } from "./aiCore.js";

const data = JSON.parse(
  fs.readFileSync("datasets/enriched_dataset.json", "utf-8")
);

const results = data.map(aiPredict);

fs.writeFileSync(
  "datasets/ai_predictions.json",
  JSON.stringify(results, null, 2)
);

console.log("=== AI ENGINE COMPLETE ===");
console.log("Matches processed:", results.length);
console.log("Saved → datasets/ai_predictions.json");
