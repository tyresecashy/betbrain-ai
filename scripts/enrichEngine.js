export function enrichMatch(match) {

  // 1. BASE LEAGUE VOLATILITY
  const leagueVol = {
    "Premier League": 0.72,
    "La Liga": 0.65,
    "Serie A": 0.60,
    "Bundesliga": 0.68,
    "Ligue 1": 0.78,
    "World Cup Qualifiers": 0.74
  };

  const baseVolatility = leagueVol[match.competition] || 0.7;

  // 2. ODD GAP SIGNAL
  const oddsGap = Math.abs(match.odds_home - match.odds_away);

  // 3. UPSERT PROBABILITY (simplified intelligence model)
  let upsetProbability =
    (oddsGap / 3) +
    (match.actual_result !== "Home Win" ? 0.25 : 0);

  upsetProbability = Math.min(1, upsetProbability);

  // 4. INJURY INFERENCE (no real data → pattern-based logic)
  let injuryImpact = 0;

  if (match.actual_result !== "Home Win" && match.odds_home < 1.60) {
    injuryImpact = 1.5; // favorite upset → likely disruption
  }

  if (match.actual_result === "Draw" && oddsGap > 1.5) {
    injuryImpact = 1.0;
  }

  // 5. VOLATILITY SCORE
  const volatilityScore =
    baseVolatility +
    (upsetProbability * 0.25) +
    (injuryImpact * 0.1);

  // 6. CONFIDENCE SCORE (prediction strength)
  const strengthGap = Math.max(0, 1 - oddsGap / 4);

  const confidence =
    strengthGap +
    (1 - upsetProbability) -
    volatilityScore * 0.3;

  // 7. CLASSIFICATION SYSTEM
  let classification = "KING";

  if (confidence > 0.75) classification = "SAFE";
  else if (confidence > 0.55) classification = "BOOST";
  else classification = "KING";

  // 8. RETURN ENRICHED MATCH
  return {
    ...match,

    injury_layer: {
      injuryImpact,
      inferred: injuryImpact > 0,
    },

    upset_probability: Number(upsetProbability.toFixed(3)),
    volatility_score: Number(volatilityScore.toFixed(3)),
    confidence: Number(confidence.toFixed(3)),
    classification
  };
}
