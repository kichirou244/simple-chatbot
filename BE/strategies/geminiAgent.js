import AIAgent from "./aiAgent.js";
import "dotenv/config";

import { GoogleGenAI } from "@google/genai";
const apiKey = process.env.GEMINI_API_KEY;
const client = new GoogleGenAI({ apiKey: apiKey });

class GeminiAgent extends AIAgent {
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
export default GeminiAgent;
