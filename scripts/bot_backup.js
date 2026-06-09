import { Telegraf } from "telegraf";

const bot = new Telegraf(process.env.BOT_TOKEN);

// START COMMAND
bot.start((ctx) => {
  ctx.reply("🤖 BetKing AI is ONLINE");
});

// STATUS
bot.command("status", (ctx) => {
  ctx.reply("🟢 System running\nAI Engine: ACTIVE\nDataset: LOADED");
});

// PREDICT (TEST MODE)
bot.command("predict", (ctx) => {
  ctx.reply("⚽ Test Mode:\nArsenal vs Chelsea → SAFE PICK (mock engine working)");
});

// FALLBACK
bot.on("text", (ctx) => {
  ctx.reply("Commands available:\n/start\n/status\n/predict");
});

bot.launch();
console.log("🤖 Bot fully running...");
