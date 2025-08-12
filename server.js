const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const usersPath = path.join(__dirname, 'users.json');

function readUsers() {
  try {
    const raw = fs.readFileSync(usersPath, 'utf8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

app.get('/api/users', (req, res) => {
  res.json(readUsers());
});

app.post('/api/notify', async (req, res) => {
  const { text, assignee } = req.body || {};
  if (!text || !assignee || !assignee.phone) {
    return res.status(400).json({ ok: false, error: 'invalid_body' });
  }

  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_FROM_NUMBER;

  if (!sid || !token || !from) {
    return res.status(500).json({ ok: false, error: 'missing_twilio_env' });
  }

  try {
    const twilio = require('twilio')(sid, token);
    const body = `New task assigned to you: "${text}"`;
    await twilio.messages.create({ body, from, to: assignee.phone });
    res.json({ ok: true });
  } catch (e) {
    res.status(502).json({ ok: false, error: 'twilio_error' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
