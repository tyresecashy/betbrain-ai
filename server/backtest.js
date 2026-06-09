import { analyzeFixtures } from "./analyzer.js";
import { runStrategy } from "./strategist.js";
import { realFixtures } from "./realFixtures.js";

const analyzed = analyzeFixtures(realFixtures);
const { SAFE, BOOST, KING } = runStrategy(analyzed);

function evaluate(tier, name) {
  if (tier.length === 0) {
    console.log(`\n${name}: No picks`);
    return;
  }
  const wins = tier.filter(f => f.actualResult === f.outcome).length;
  const rate = ((wins / tier.length) * 100).toFixed(1);
  const status = name === "SAFE" ? rate >= 65 : name === "BOOST" ? rate >= 50 : rate >= 35;
  console.log(`\n${name} (${tier.length} picks)`);
  console.log(`  Wins: ${wins} / ${tier.length}`);
  console.log(`  Win Rate: ${rate}%`);
  console.log(`  Status: ${status ? "✅ PASS" : "❌ FAIL"}`);
  tier.forEach(f => {
    const hit = f.actualResult === f.outcome ? "✅" : "❌";
    console.log(`  ${hit} ${f.match} | predicted: ${f.outcome} | actual: ${f.actualResult}`);
  });
}

console.log("=== BETKING AI — BACKTEST REPORT ===");
evaluate(SAFE, "SAFE");
evaluate(BOOST, "BOOST");
evaluate(KING, "KING");
console.log("\n=== END REPORT ===");
