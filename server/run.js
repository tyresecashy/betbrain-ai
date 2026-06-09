import { fixtures } from "./data.js";
import { validateFixtures } from "./validator.js";
import { analyzeFixtures } from "./analyzer.js";
import { runStrategy } from "./strategist.js";
import { buildSlip } from "./slipBuilder.js";

const valid = validateFixtures(fixtures).valid;
const analyzed = analyzeFixtures(valid);
const strategy = runStrategy(analyzed);
const slip = buildSlip(strategy);

console.log(JSON.stringify(slip, null, 2));
