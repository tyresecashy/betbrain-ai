export function validateFixtures(fixtures) {
  const errors = [];
  const valid = [];

  for (const fx of fixtures) {
    const fxErrors = [];

    if (!fx.id || typeof fx.id !== "string") {
      fxErrors.push("Missing or invalid id");
    }

    if (!fx.match || typeof fx.match !== "string") {
      fxErrors.push("Missing or invalid match");
    }

    if (typeof fx.odds !== "number" || fx.odds < 1.01 || fx.odds > 20) {
      fxErrors.push("Invalid odds range");
    }

    if (typeof fx.strength !== "number" || fx.strength < 0 || fx.strength > 10) {
      fxErrors.push("Invalid strength range");
    }

    if (typeof fx.volatility !== "number" || fx.volatility < 0 || fx.volatility > 10) {
      fxErrors.push("Invalid volatility range");
    }

    if (fxErrors.length > 0) {
      errors.push({
        fixtureId: fx.id,
        errors: fxErrors
      });
    } else {
      valid.push(fx);
    }
  }

  return {
    valid,
    errors,
    total: fixtures.length,
    passed: valid.length,
    failed: errors.length
  };
}
