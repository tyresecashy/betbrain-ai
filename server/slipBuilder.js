export function buildSlip(strategyResult) {

  return {
    meta: {
      system: "BetKing AI",
      version: "1.0.0"
    },

    SAFE: strategyResult.SAFE.map(fx => ({
      match: fx.match,
      odds: fx.odds,
      outcome: fx.outcome,
      score: fx.scores.final
    })),

    BOOST: strategyResult.BOOST.map(fx => ({
      match: fx.match,
      odds: fx.odds,
      outcome: fx.outcome,
      score: fx.scores.final
    })),

    KING: strategyResult.KING.map(fx => ({
      match: fx.match,
      odds: fx.odds,
      outcome: fx.outcome,
      score: fx.scores.final
    }))
  };
}
