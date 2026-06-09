import { Telegraf } from "telegraf";

const bot = new Telegraf(process.env.BOT_TOKEN);

// START
bot.start((ctx) => {
  ctx.reply("🤖 BetBrain AI ONLINE (Render Cloud)");
});

// STATUS
bot.command("status", (ctx) => {
  ctx.reply("🟢 System Active\nAI Engine: READY");
});

// PREDICT (calls AI engine)
bot.command("predict", async (ctx) => {
  try {
    const res = await fetch("https://betbrain-ai-1.onrender.com/predict"); 
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

// SAFE LAUNCH (IMPORTANT)
bot.launch()
  .then(() => console.log("🟢 BOT CONNECTED TO TELEGRAM"))
  .catch(err => console.log("❌ BOT FAILED:", err.message));

console.log("🤖 BetBrain AI BOT STARTED");
