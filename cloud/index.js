import express from "express";
import { Telegraf } from "telegraf";

console.log("🤖 BetBrain AI BOT STARTED");

const app = express();
app.get("/", (req, res) => res.send("BetBrain AI LIVE"));

const bot = new Telegraf(process.env.BOT_TOKEN);

// START
bot.start((ctx) => {
  ctx.reply("🤖 BetBrain AI ONLINE (Render Cloud)");
});

// STATUS
bot.command("status", (ctx) => {
  ctx.reply("🟢 System Active\nAI Engine: READY");
});

// PREDICT (TEMP)
bot.command("predict", (ctx) => {
  const text = ctx.message.text.replace("/predict", "").trim();

  if (!text) {
    return ctx.reply("Send: /predict Team A vs Team B");
  }

  ctx.reply(`⚽ ${text}\nSAFE PICK 🔥\nConfidence: 74%`);
});

bot.launch();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on", PORT));
