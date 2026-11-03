const messages = {
  clock_in: "⏰ Clock-in reminder: Please clock in now.",
  clock_out: "⏰ Clock-out reminder: Please clock out now.",
  test: "✅ Test successful: your clock-in and clock-out Telegram reminders are connected.",
};

const type = process.env.REMINDER_TYPE;
const token = process.env.TELEGRAM_BOT_TOKEN;
const chatId = process.env.TELEGRAM_CHAT_ID;

if (!messages[type]) throw new Error(`Unknown reminder type: ${type}`);
if (!token || !chatId) throw new Error("Telegram secrets are missing.");

const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ chat_id: chatId, text: messages[type] }),
});

const result = await response.json();

if (!response.ok || !result.ok) {
  throw new Error(`Telegram send failed: ${result.description ?? response.status}`);
}

console.log(`Sent ${type} reminder.`);
