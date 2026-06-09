export function runStrategy(fixtures) {

  const enriched = fixtures.map(f => {

    const score = f.scores.final;
    const edge = f.scores.valueEdge;
    const risk = f.scores.risk;

    const stability = score - (risk * 0.6);
    const adjustedEdge = edge * 8;

    let interpretation = [];

    if (score > 6) interpretation.push("strong statistical performance");
    else if (score > 4.5) interpretation.push("moderate statistical performance");
    else interpretation.push("weak statistical performance");

    if (adjustedEdge > 0.5) interpretation.push("market inefficiency detected");
    else if (adjustedEdge > 0.2) interpretation.push("slight value signal");

    if (risk < 2) interpretation.push("low volatility fixture");
    else interpretation.push("high volatility fixture");

    return {
      ...f,
      stability,
      adjustedEdge,
      interpretation
    };
  });

  const sorted = [...enriched].sort((a, b) => b.stability - a.stability);
  const n = sorted.length;

  const SAFE = [];
  const BOOST = [];
  const KING = [];

  for (let i = 0; i < sorted.length; i++) {

    const f = sorted[i];
    const percentile = ((n - i) / n) * 100;

    const score = f.scores.final;
    const edge = f.scores.valueEdge;
    const odds = f.odds;
    const risk = f.scores.risk;

    let tier = "BOOST";

    // =========================
    // SAFE = high stability, low risk favorites
    // =========================
    if (percentile >= 70 && risk < 2.2) {
      tier = "SAFE";
    }

    // =========================
    // KING = true value mispricing ONLY
    // HARD FILTER: odds must be >= 2.0
    // =========================
    else if (
      edge > 0.12 &&
      odds >= 2.0 &&
      risk < 3 &&
      percentile <= 40
    ) {
      tier = "KING";
    }

    const reason = `
Signal Analysis:
- Score: ${score.toFixed(2)}
- Edge: ${edge.toFixed(3)}
- Odds: ${odds}
- Risk: ${risk.toFixed(2)}
- Percentile: ${percentile.toFixed(1)}%

Interpretation:
${f.interpretation.join(" • ")}

Decision:
Classified as ${tier}
    `.trim();

    const final = { ...f, tier, reason };

    if (tier === "SAFE") SAFE.push(final);
    else if (tier === "KING") KING.push(final);
    else BOOST.push(final);
  }

  return { SAFE, BOOST, KING };
}
