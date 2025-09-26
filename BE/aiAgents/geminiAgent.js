import AiAgent from "./aiAgent.js";
import "dotenv/config";

import { GoogleGenAI } from "@google/genai";
const apiKey = process.env.GEMINI_API_KEY;
const client = new GoogleGenAI({ apiKey: apiKey });

class GeminiAgent extends AiAgent {
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
  
  async embedTexts(textChunk) {
    const result = await client.models.embedContent({
      model: "gemini-embedding-001",
      contents: [textChunk],
    });

    return result.embeddings[0].values;
  }
}
export default GeminiAgent;
