require('dotenv').config();
const express = require('express');
const path = require('path');
const { startBot, getStatus, stopBot } = require('./bot');

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Start bot automatically when server starts
startBot().catch(err => console.error('Bot failed to start:', err));

app.get('/status', (req, res) => {
  res.json({ status: getStatus(), name: process.env.BOT_NAME || 'Bot' });
});

// Simple admin middleware: check x-admin-key header
function checkAdmin(req, res, next) {
  const key = req.headers['x-admin-key'];
  if (!process.env.ADMIN_KEY || key !== process.env.ADMIN_KEY) {
    return res.status(401).json({ error: 'unauthorized' });
  }
  next();
}

app.post('/start', checkAdmin, async (req, res) => {
  try {
    await startBot();
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post('/stop', checkAdmin, async (req, res) => {
  try {
    await stopBot();
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));