import axios from "axios";

const TOKEN = process.env.BOT_TOKEN || "YOUR_TOKEN_HERE";
const API = `https://api.telegram.org/bot${TOKEN}`;

let offset = 0;

console.log("🤖 RAW BOT STARTED");

async function getUpdates() {
  try {
    const res = await axios.get(`${API}/getUpdates`, {
      params: { offset, timeout: 30 }
    });

    const updates = res.data.result;

    for (const update of updates) {
      offset = update.update_id + 1;

      const msg = update.message?.text;
      const chatId = update.message?.chat?.id;

      if (!msg) continue;

      console.log("MSG:", msg);

      let reply = "Commands: /start /status /predict";

      if (msg === "/start") reply = "🤖 BetBrain AI is ONLINE";
      if (msg === "/status") reply = "🟢 System running\nAI Engine ACTIVE";
      if (msg === "/predict") reply = "⚽ Test Mode: SAFE PICK engine ready";

      await axios.post(`${API}/sendMessage`, {
        chat_id: chatId,
        text: reply
      });
    }

  } catch (e) {
    console.log("ERR:", e.message);
  }

  setTimeout(getUpdates, 1000);
}

getUpdates();
