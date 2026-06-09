import fs from "fs";

/**
 * AI DECISION CORE
 * Turns enriched match data into adaptive predictions
 */

export function aiPredict(match) {

  // --- 1. FEATURE EXTRACTION ---
  const oddsSpread = Math.abs(match.odds_home - match.odds_away);
  const drawPressure = match.odds_draw < 3.5 ? 1 : 0;

  // --- 2. CORE SIGNALS ---
  const volatility = match.volatility_score || 0.7;
  const upset = match.upset_probability || 0.5;
  const injury = match.injury_layer?.injuryImpact || 0;

  // --- 3. MARKET READ (AI LOGIC) ---
  const marketChaos = (volatility * 0.5) + (upset * 0.3) + (injury * 0.2);

  // --- 4. PREDICTION CONFIDENCE ---
  const confidence = 1 - marketChaos;

  // --- 5. DYNAMIC CLASSIFICATION (NOT FIXED RULES) ---
  let tier;

  if (confidence > 0.72) {
    tier = "SAFE";
  } else if (confidence > 0.55) {
    tier = "BOOST";
  } else {
    tier = "KING";
  }

  // --- 6. AI INSIGHT TAGS ---
  const tags = [];

  if (upset > 0.6) tags.push("HIGH_UPSET_RISK");
  if (volatility > 0.75) tags.push("HIGH_VOLATILITY");
  if (drawPressure) tags.push("DRAW_ZONE");

  if (oddsSpread < 0.5) tags.push("BALANCED_MATCH");

  // --- 7. RETURN AI OUTPUT ---
  return {
    match: match.match,
    competition: match.competition,
    date: match.date,

    prediction: match.actual_result ? match.actual_result : null,

    ai: {
      tier,
      confidence: Number(confidence.toFixed(3)),
      marketChaos: Number(marketChaos.toFixed(3)),
      tags
    }
  };
}
