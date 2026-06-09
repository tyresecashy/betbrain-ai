import express from "express";
import axios from "axios";
import { Telegraf } from "telegraf";

const app = express();
app.use(express.json());

// TOKEN from Render ENV
const bot = new Telegraf(process.env.BOT_TOKEN);

// HEALTH CHECK (Render needs this)
app.get("/", (req, res) => {
  res.send("BetBrain AI Cloud Bot Running");
});

// START
bot.start((ctx) => {
  ctx.reply("🤖 BetBrain AI ONLINE (Render Cloud)");
});

// STATUS
bot.command("status", (ctx) => {
  ctx.reply("🟢 Cloud Bot Active\nAI Engine: Connected Soon");
});

// PREDICT (TEMP MOCK - we connect Termux later)
bot.command("predict", async (ctx) => {
  const text = ctx.message.text.replace("/predict", "").trim();

  if (!text) {
    return ctx.reply("Send: /predict Team A vs Team B");
  }

  ctx.reply("🔄 Analyzing match...");

  // TEMP RESPONSE
  ctx.reply(`⚽ ${text}\nSAFE PICK 🔥\nConfidence: 72%`);
});

bot.launch();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on", PORT));
