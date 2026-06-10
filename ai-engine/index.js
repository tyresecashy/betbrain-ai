const express = require("express");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("AI ENGINE LIVE");
});

app.get("/predict", (req, res) => {
  res.json({
    pick: "Arsenal",
    confidence: 74
  });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log("🧠 AI ENGINE RUNNING ON PORT", PORT);
});
