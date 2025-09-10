import IAIService from "../services/aiService.js";
import "dotenv/config";

import { GoogleGenAI } from "@google/genai";
const apiKey = process.env.GEMINI_API_KEY;
const geminiAI = new GoogleGenAI({ apiKey: apiKey });

class GeminiStrategy extends IAIService {
  async ask(model, question) {
    const response = await geminiAI.models.generateContent({
      model: model,
      contents: question,
    });

    return response.text;
  }
}
export default GeminiStrategy;
