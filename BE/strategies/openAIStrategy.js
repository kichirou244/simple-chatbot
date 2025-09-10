import IAIService from "../services/aiService.js";
import "dotenv/config";

import OpenAI from "openai";
const apiKey = process.env.OPENAI_API_KEY;
const openAI = new OpenAI({ apiKey });

class OpenAIStrategy extends IAIService {
  async ask(model, question) {
    const response = await openAI.responses.create({
      model: model,
      input: question,
    });

    return response.output_text;
  }
}

export default OpenAIStrategy;
