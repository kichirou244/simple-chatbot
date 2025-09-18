import AiAgent from "./aiAgent.js";
import GeminiAgent from "./geminiAgent.js";
import OpenAiAgent from "./openAiAgent.js";

export class AiAgentFactory {
  static create(name) {
    if (name === "gemini") return new GeminiAgent();

    if (name === "openai") return new OpenAiAgent();

    return new AiAgent();
  }
}
