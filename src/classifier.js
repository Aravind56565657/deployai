'use strict';

const { GoogleGenerativeAI } = require('@google/generative-ai');
const { INFERENCES, INFERENCE_TO_ACTION, ACTIONS, REPLY_MAP } = require('./mappings');

// Compact inference list: "I-001:upload_zip_file, I-002:paste_github_url, ..."
const INFERENCE_LIST = Object.entries(INFERENCES)
  .map(([id, label]) => `${id}:${label}`)
  .join(', ');

const SYSTEM_PROMPT = `You are a classification engine. Map user messages to the closest inference ID.

Rules:
- Return ONLY a JSON object, no markdown, no explanation
- Pick exactly ONE inference_id from the list below
- Fallback to I-132 if nothing matches
- Users may be short ("deploy"), informal, multilingual, or unclear — still classify

INFERENCES: ${INFERENCE_LIST}

Output format:
{"inference_id":"I-XXX","confidence":"high|medium|low"}`;

let genAI = null;
let model = null;

function initGemini() {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is not set in environment variables');
  }
  if (!genAI) {
    genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    model = genAI.getGenerativeModel({
      model: process.env.GEMINI_MODEL || 'gemini-2.0-flash',
      systemInstruction: SYSTEM_PROMPT,
      generationConfig: {
        temperature: 0.1,
        topP: 0.9,
        maxOutputTokens: 512,
      },
    });
  }
  return model;
}

function parseGeminiResponse(raw) {
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
  const m = initGemini();

  const result = await m.generateContent(userMessage);
  const raw = result.response.text();

  try {
    const parsed = parseGeminiResponse(raw);
    return buildResult(parsed.inference_id, parsed.confidence);
  } catch {
    return buildResult('I-132', 'low');
  }
}

module.exports = { classify };
