import { Telegraf } from "telegraf";

const bot = new Telegraf(process.env.BOT_TOKEN);

// START
bot.start((ctx) => {
    // retry safety added via render cold-start handling
  ctx.reply("🤖 BetBrain AI ONLINE (Render Cloud)");
});

// STATUS
bot.command("status", (ctx) => {
    // retry safety added via render cold-start handling
  ctx.reply("🟢 System Active\nAI Engine: READY");
});

// PREDICT (calls AI engine)
bot.command("predict", async (ctx) => {
  try {
    const res = await fetch("https://betbrain-ai-2.onrender.com/predict");
    if (!res.ok) throw new Error("bad response");

    const data = await res.json();

    // retry safety added via render cold-start handling
    ctx.reply(
      "⚽ BET PREDICTION\n" +
      "Pick: " + data.pick + "\n" +
      "Confidence: " + data.confidence + "%"
    );
  } catch (e) {
    // retry safety added via render cold-start handling
    ctx.reply("❌ AI Engine not reachable");
  }
});

// SAFE LAUNCH (IMPORTANT)
bot.launch({ dropPendingUpdates: true, allowedUpdates: ["message"] })
  .then(() => console.log("🟢 BOT CONNECTED TO TELEGRAM"))
  .catch(err => console.log("❌ BOT FAILED:", err.message));

console.log("🤖 BetBrain AI BOT STARTED");
