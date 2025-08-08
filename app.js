// Load .env for local testing
require('dotenv').config();
const express = require('express');

const app = express();
app.use(express.json());

// Use env var if set, otherwise fallback
const verifyToken = process.env.VERIFY_TOKEN || "my-secret-token";
const port = process.env.PORT || 3000;

// GET: Webhook verification
app.get('/webhook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode === 'subscribe' && token === verifyToken) {
    console.log('✅ WEBHOOK VERIFIED');
    res.status(200).send(challenge);
  } else {
    res.status(403).send('Verification failed');
  }
});

// POST: Handle webhook events
app.post('/webhook', (req, res) => {
  console.log(`📩 Webhook received at ${new Date().toISOString()}`);
  console.log(JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});

// Simple health check
app.get('/', (req, res) => res.send('OK'));

app.listen(port, () => {
  console.log(`🚀 Webhook listening on port ${port}`);
});
