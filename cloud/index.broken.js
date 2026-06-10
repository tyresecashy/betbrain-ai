import fetch from "node-fetch";
import { Telegraf } from "telegraf";

globalThis.fetch = fetch;

const bot = new Telegraf(process.env.BOT_TOKEN);

// START
bot.start((ctx) => {
  ctx.reply("🤖 BetBrain AI ONLINE (Render Cloud)");
});

// STATUS
bot.command("status", (ctx) => {
  ctx.reply("🟢 System Active\nAI Engine: READY");
});

// PREDICT (CLEAN VERSION)
bot.command("predict", async (ctx) => {
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

setTimeout(() => console.log("🔄 Bot retry mode active"), 3000);
console.log("🤖 BetBrain AI BOT STARTED");
console.log("Server running on 3000");

async function startBot() {
  try {
      dropPendingUpdates: true
    });

  } catch (err) {
    console.log("❌ BOT LAUNCH FAILED:", err.message);
  }
}

startBot();

async function safeStart() {
  try {
    console.log("⏳ Initializing Telegram connection...");

    // small delay helps Termux network stabilize
    await new Promise(r => setTimeout(r, 2000));

    await bot.launch();

    console.log("🟢 TELEGRAM CONNECTED");
    console.log("🟢 BOT FULLY ACTIVE");
  } catch (err) {
    console.log("❌ TELEGRAM INIT FAILED:", err.message);
    console.log("🔁 RETRY MODE ACTIVE");
  }
}

safeStart();
