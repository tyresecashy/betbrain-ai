import fs from "fs";

const leagues = ["Premier League","La Liga","Serie A","Bundesliga","Ligue 1","International"];

function rand(min,max){
  return +(Math.random()*(max-min)+min).toFixed(2);
}

function outcome(home, away){
  const diff = home - away;
  if (diff > 0.8) return "Home Win";
  if (diff < -0.8) return "Away Win";
  return Math.random() > 0.5 ? "Home Win" : "Draw";
}

function makeMatch(i){
  const homeOdds = rand(1.10, 3.50);
  const awayOdds = rand(1.20, 4.50);

  return {
    match: `Team${i} vs Team${i+1}`,
    competition: leagues[Math.floor(Math.random()*leagues.length)],
    date: "2026-06-09",
    odds_home: homeOdds,
    odds_draw: rand(3.0, 6.5),
    odds_away: awayOdds,
    actual_result: outcome(homeOdds, awayOdds)
  };
}

const batch = Array.from({length: 100}, (_,i)=>makeMatch(i));

fs.writeFileSync("datasets/batch_generated.json", JSON.stringify(batch,null,2));

console.log("Generated 100 fixtures");
