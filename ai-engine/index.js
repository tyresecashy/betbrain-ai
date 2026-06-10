const express = require("express");

const app = express();
app.use(express.json());

// ⚽ SIMPLE TEAM DATABASE (expandable later)
const teams = {
  Arsenal: { form: 8, attack: 7, defense: 6 },
  Chelsea: { form: 6, attack: 6, defense: 7 },
  Liverpool: { form: 9, attack: 9, defense: 6 },
  ManCity: { form: 9, attack: 9, defense: 8 }
};

// 🧠 REAL PREDICTION ENGINE
function predictMatch(teamA, teamB) {
  const A = teams[teamA];
  const B = teams[teamB];

  if (!A || !B) {
    return { error: "Unknown teams" };
  }

  // core scoring formula (your AI brain v1)
  const scoreA =
    A.form * 0.4 +
    A.attack * 0.3 +
    (10 - B.defense) * 0.3 +
    Math.random();

  const scoreB =
    B.form * 0.4 +
    B.attack * 0.3 +
    (10 - A.defense) * 0.3 +
    Math.random();

  const pick = scoreA > scoreB ? teamA : teamB;

  const confidence =
    Math.abs(scoreA - scoreB) * 10 + 50;

  return {
    teamA,
    teamB,
    pick,
    confidence: Math.min(98, Math.round(confidence))
  };
}

// 🌐 API
app.get("/predict", (req, res) => {
  const result = predictMatch("Arsenal", "Chelsea");
  res.json(result);
});

// 🌍 WEBSITE
app.get("/", (req, res) => {
  res.send(`
    <html>
      <head>
        <title>BetBrain AI</title>
        <style>
          body { font-family: Arial; background:#0f0f0f; color:white; text-align:center; padding-top:60px; }
          .card { background:#1c1c1c; padding:20px; border-radius:12px; width:320px; margin:auto; }
          .pick { font-size:28px; color:#00ff88; }
        </style>
      </head>
      <body>
        <h1>🧠 REAL AI PREDICTIONS</h1>
        <div class="card" id="box">Loading...</div>

        <script>
          fetch("/predict")
            .then(res => res.json())
            .then(d => {
              document.getElementById("box").innerHTML =
                "<div class='pick'>" + d.pick + "</div>" +
                "<p>Match: " + d.teamA + " vs " + d.teamB + "</p>" +
                "<p>Confidence: " + d.confidence + "%</p>";
            });
        </script>
      </body>
    </html>
  `);
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log("🧠 REAL AI ENGINE RUNNING ON PORT", PORT);
});
