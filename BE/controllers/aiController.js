import { AiAgentFactory } from "../aiAgents/aiAgentFactory.js";
import PineconeRetrieval from "../rag/pineconeRetrieval.js";

const pinecone = new PineconeRetrieval();

export const askAI = async (req, res) => {
  try {
    const { aiAgent, model, question } = req.body;

    const context = await pinecone.getContext(question);
    const prompt = pinecone.createPrompt(context, question);
    const agent = AiAgentFactory.create(aiAgent);

    console.log(`Prompt: ${prompt}`);
    
    const answer = await agent.ask(model, prompt);

    if (answer.status)
      return res.status(answer.status).json({ message: answer.name });

    res.json({ question, answer });
  } catch (error) {
    res.status(500).json({ message: error.message || "Server Error" });
  }
};
