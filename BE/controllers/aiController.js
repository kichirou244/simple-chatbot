import { AiAgentFactory } from "../strategies/aiAgentFactory.js";

export const askAI = async (req, res) => {
  try {
    const { aiAgent, model, question } = req.body;

    const agent = AiAgentFactory.create(aiAgent);
    
    const answer = await agent.ask(model, question);

    if (answer.status)
      return res.status(answer.status).json({ message: answer.name });

    res.json({ question, answer });
  } catch (error) {
    res.status(500).json({ message: error.message || "Server Error" });
  }
};
