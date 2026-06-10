import fetch from "node-fetch";
globalThis.fetch = fetch;

if (!process.env.BOT_TOKEN) { console.log("❌ BOT TOKEN MISSING"); process.exit(1); }
process.env.BOT_TOKEN = process.env.BOT_TOKEN || '8998144041:AAHvq98xtV-SGz9LRp-joHQ0jJy6EwOzgWY'
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
// PREDICT (TEMP)
bot.command("predict", async (ctx) => {
  try {
    const res = await fetch("http://localhost:4000/predict");
    const data = await res.json();
    ctx.reply(
  }

bot.command("predict", async (ctx) => { try { const res = await fetch("http://localhost:4000/predict"); const data = await res.json(); ctx.reply("⚽ BET PREDICTION\nPick: " + data.pick + "\nConfidence: " + data.confidence + "bot.command("predict", async (ctx) => {
  try {
    const res = await fetch("http://localhost:4000/predict");
    const data = await res.json();

    ctx.reply(
      "⚽ BET PREDICTION\n" +
      "Pick: " + data.pick + "\n" +
      "Confidence: " + data.confidence + "%"
    );
  } catch (e) {
    ctx.reply("❌ AI Engine not reachable");
  }
});
