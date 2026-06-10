const express = require("express");

const app = express();
app.use(express.json());

// AI ENGINE ENDPOINT
app.post("/predict", (req, res) => {
  const { match } = req.body;

  if (!match) {
    return res.json({ error: "No match provided" });
  }

  return res.json({
    match,
    prediction: "SAFE PICK 🔥",
    confidence: 74,
    risk: "MEDIUM",
    factors: [
      "Base AI engine active",
      "Termux AI connected",
      "Volatility model pending upgrade"
    ]
  });
});

const PORT = 4000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("🧠 AI ENGINE RUNNING ON PORT", PORT);
});
