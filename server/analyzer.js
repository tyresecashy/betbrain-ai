export function analyzeFixtures(fixtures) {
  return fixtures.map(f => {
    const strength = f.strength;

    const impliedProb = 1 / f.odds;
    const modelProb = strength / 10;

    const valueEdge = modelProb - impliedProb;
    const risk = f.volatility * 0.4;

    // NORMALIZED SCORE (NO OVERWEIGHTING)
    const final =
      (strength * 0.7) +
      (valueEdge * 6) -
      (risk * 0.8);

    return {
      ...f,
      scores: {
        strength,
        valueEdge,
        risk,
        final
      }
    };
  });
}
