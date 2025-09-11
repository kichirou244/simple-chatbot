import AIStrategy from "./aiStrategy.js";
import "dotenv/config";

import OpenAI from "openai";
const apiKey = process.env.OPENAI_API_KEY;
const client = new OpenAI({ apiKey: apiKey });

class OpenAIStrategy extends AIStrategy {
  async ask(model, question) {
    try {
      const response = await client.responses.create({
        model: model,
        input: question,
      });

      return response.output_text;
    } catch (error) {
      return error.status;
    }
  }
}

export default OpenAIStrategy;
