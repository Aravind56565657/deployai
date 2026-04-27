'use strict';

const Groq = require('groq-sdk');
const { INFERENCES, INFERENCE_TO_ACTION, ACTIONS, REPLY_MAP } = require('./mappings');

const INFERENCE_LIST = Object.entries(INFERENCES)
  .map(([id, label]) => `${id}:${label}`)
  .join(', ');

const SYSTEM_PROMPT = `You are a backend classification engine inside a chatbot system.

Your job is to read the user message and map it to exactly ONE inference ID from the list below.

Rules:
- Return ONLY a raw JSON object — no markdown, no explanation, no code fences
- Pick exactly ONE inference_id from the INFERENCES list
- If nothing matches or input is unclear, use I-132
- Users may be short ("deploy"), informal, multilingual (Hindi+English), or broken — still classify
- Be consistent and deterministic

INFERENCES: ${INFERENCE_LIST}

Output format (strict):
{"inference_id":"I-XXX","confidence":"high|medium|low"}`;

let groq = null;

function initGroq() {
  if (!process.env.GROQ_API_KEY) {
    throw new Error('GROQ_API_KEY is not set in environment variables');
  }
  if (!groq) {
    groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
  }
  return groq;
}

function parseResponse(raw) {
  const cleaned = raw.replace(/```json\s*/gi, '').replace(/```\s*/g, '').trim();
  return JSON.parse(cleaned);
}

function buildResult(inferenceId, confidence) {
  const validId = INFERENCES[inferenceId] ? inferenceId : 'I-132';
  const actionId = INFERENCE_TO_ACTION[validId] || 'A-026';

  return {
    inference_id: validId,
    inference_label: INFERENCES[validId],
    action_id: actionId,
    action_label: ACTIONS[actionId],
    confidence: ['high', 'medium', 'low'].includes(confidence) ? confidence : 'high',
    clarification_needed: actionId === 'A-026',
    chat_reply: REPLY_MAP[actionId],
  };
}

async function classify(userMessage) {
  const client = initGroq();

  const completion = await client.chat.completions.create({
    model: process.env.GROQ_MODEL || 'compound-beta-mini',
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user',   content: userMessage },
    ],
    temperature: 0.1,
    max_tokens: 64,
    response_format: { type: 'json_object' },
  });

  const raw = completion.choices[0]?.message?.content || '';

  try {
    const parsed = parseResponse(raw);
    return buildResult(parsed.inference_id, parsed.confidence);
  } catch {
    return buildResult('I-132', 'low');
  }
}

module.exports = { classify };
