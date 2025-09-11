import AIStrategy from "./aiStrategy.js";
import "dotenv/config";

import { GoogleGenAI } from "@google/genai";
const apiKey = process.env.GEMINI_API_KEY;
const client = new GoogleGenAI({ apiKey: apiKey });

class GeminiStrategy extends AIStrategy {
  async ask(model, question) {
    try {
      const response = await client.models.generateContent({
        model: model,
        contents: question,
      });

      return response.text;
    } catch (error) {
      return error;
    }
  }
}
export default GeminiStrategy;
