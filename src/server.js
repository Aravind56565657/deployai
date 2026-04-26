'use strict';

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const { classify } = require('./classifier');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', model: process.env.GEMINI_MODEL || 'gemini-1.5-flash' });
});

// POST /classify
// Body: { "message": "user input text" }
app.post('/classify', async (req, res) => {
  const { message } = req.body;

  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    return res.status(400).json({
      error: 'Request body must include a non-empty "message" string.',
    });
  }

  try {
    const result = await classify(message.trim());
    return res.json(result);
  } catch (err) {
    console.error('[classify error]', err.message);

    if (err.message?.includes('GEMINI_API_KEY')) {
      return res.status(500).json({ error: 'Gemini API key is not configured.' });
    }

    // Gemini quota / network errors — return fallback
    return res.status(502).json({
      error: 'Classification service unavailable.',
      detail: err.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`\n  DeployAI Chat  →  http://localhost:${PORT}`);
  console.log(`  POST /classify  { "message": "..." }`);
  console.log(`  GET  /health\n`);
});
