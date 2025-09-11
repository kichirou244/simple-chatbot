import OpenAIStrategy from "../strategies/openAIStrategy.js";
import GeminiStrategy from "../strategies/geminiStrategy.js";
import AIContext from "../contexts/aiContext.js";

const strategies = {
  openAI: new OpenAIStrategy(),
  gemini: new GeminiStrategy(),
};

const aiContext = new AIContext(strategies);

export const askAI = async (req, res) => {
  try {
    const { provider, model, question } = req.body;

    if (provider && strategies[provider]) {
      aiContext.setStrategy(strategies[provider]);
    }

    const answer = await aiContext.ask(model, question);
    if (answer.status !== 200)
      return res.status(answer.status).json({ message: answer.name });

    res.json({ model, question, answer });
  } catch (error) {
    res.status(500).json({ message: error.message || "Server Error" });
  }
};
