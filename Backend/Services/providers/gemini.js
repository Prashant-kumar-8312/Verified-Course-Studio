/**
 * Gemini AI Provider Adapter
 * Uses @google/genai SDK (v1+)
 */
import { GoogleGenAI } from "@google/genai";

const getModel = () => process.env.GEMINI_MODEL || "gemini-3.8-flash";
// Support both GEMINI_API_KEY and GEMINI env var names
const getApiKey = () => process.env.GEMINI_API_KEY || process.env.GEMINI;

export function isGeminiConfigured() {
  return !!getApiKey();
}

function buildClient() {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured in .env");
  }
  return new GoogleGenAI({ apiKey });
}

/**
 * Call Gemini with a JSON-mode prompt.
 * @param {string} prompt
 * @param {object|null} schema   - Optional JSON schema object (responseSchema)
 * @param {number} timeoutMs
 * @returns {Promise<object>}    - Parsed JSON object
 */
export async function callGemini(prompt, schema = null, timeoutMs = 60000) {
  const ai = buildClient();
  const model = getModel();
  const start = Date.now();

  const config = {
    responseMimeType: "application/json",
  };
  if (schema) {
    config.responseSchema = schema;
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config,
    });

    clearTimeout(timer);

    const text = response.text;
    if (!text) throw new Error("Gemini returned an empty response");

    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch {
      throw new Error("Gemini returned non-JSON response");
    }

    return {
      provider: "gemini",
      model,
      status: "success",
      content: parsed,
      durationMs: Date.now() - start,
      usage: response.usageMetadata || null,
      error: null,
    };
  } catch (err) {
    clearTimeout(timer);
    const isTimeout = err.name === "AbortError" || err.message?.includes("aborted");
    return {
      provider: "gemini",
      model,
      status: isTimeout ? "timeout" : "error",
      content: null,
      durationMs: Date.now() - start,
      usage: null,
      error: err.message,
    };
  }
}
