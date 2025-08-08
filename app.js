// server.js
import express from "express";
import bodyParser from "body-parser";

const app = express();
const PORT = 3000;
const VERIFY_TOKEN = "my-secret-token";

app.use(bodyParser.json());

// Verification endpoint
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode && token && mode === "subscribe" && token === VERIFY_TOKEN) {
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

// Handle incoming messages
app.post("/webhook", (req, res) => {
  console.log("📩 Webhook Event:", JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});

app.listen(PORT, () => console.log(`🚀 Webhook listening on port ${PORT}`));
