import OpenAiAgent from "../strategies/openAiAgent.js";
import GeminiAgent from "../strategies/geminiAgent.js";
import AiContext from "../contexts/aiContext.js";

const aiAgents = {
  openai: new OpenAiAgent(),
  gemini: new GeminiAgent(),
};

export const askAI = async (req, res) => {
  const aiContext = new AiContext(aiAgents);
  
  try {
    const { aiAgent, model, question } = req.body;

    if (aiAgent && aiAgents[aiAgent]) aiContext.setStrategy(aiAgents[aiAgent]);

    const answer = await aiContext.ask(model, question);

    if (answer.status)
      return res.status(answer.status).json({ message: answer.name });

    res.json({ question, answer });
  } catch (error) {
    res.status(500).json({ message: error.message || "Server Error" });
  }
};
