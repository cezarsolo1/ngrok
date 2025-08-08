import 'dotenv/config';
import express from 'express';

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;
const VERIFY_TOKEN = process.env.VERIFY_TOKEN || 'dev-token';

app.get('/webhook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];
  if (mode === 'subscribe' && token === VERIFY_TOKEN) return res.status(200).send(challenge);
  return res.status(403).send('Verification failed');
});

app.post('/webhook', (req, res) => {
  console.log('📩', JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});

// (optional) simple health check
app.get('/', (_req, res) => res.send('OK'));

app.listen(port, () => console.log(`🚀 Webhook listening on port ${port}`));
