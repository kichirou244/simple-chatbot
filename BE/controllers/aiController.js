import OpenAIStrategy from "../strategies/openAIStrategy.js";
import GeminiStrategy from "../strategies/geminiStrategy.js";
import IAIService from "../services/aiService.js";

const strategies = {
  openAI: new OpenAIStrategy(),
  gemini: new GeminiStrategy(),
};

const aiService = new IAIService(strategies);

export const askAI = async (req, res) => {
  const { provider, model, question } = req.body;

  if (provider && strategies[provider]) {
    aiService.setStrategy(strategies[provider]);
  }

  const answer = await aiService.ask(model, question);

  res.json({ model: model, question: question, answer: answer });
};
