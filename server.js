import express from "express";
import fetch from "node-fetch"; // Αν έχεις Node 18+, μπορείς να χρησιμοποιήσεις global fetch
const app = express();
app.use(express.json());
app.use(express.static(".")); // σερβίρει το index.html

const WEBHOOK = "https://discord.com/api/webhooks/WEBHOOK_ID/WEBHOOK_TOKEN"; // 🔴 Βάλε το δικό σου

app.post("/send", async (req, res) => {
  const { name, msg } = req.body;
  const payload = {
    username: name || "Anon",
    content: msg
  };

  const r = await fetch(WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (r.ok) res.sendStatus(200);
  else res.sendStatus(500);
});

app.listen(3000, () => console.log("✅ Server στο http://localhost:3000"));

