import { Pinecone } from "@pinecone-database/pinecone";
import { AiAgentFactory } from "../aiAgents/aiAgentFactory.js";

class PineconeRetrieval {
  constructor() {
    this.pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
    this.index = this.pinecone
      .Index(process.env.PINECONE_INDEX_NAME)
      .namespace("sample-3");
    this.aiAgent = AiAgentFactory.create("gemini");
  }

  async getContext(query) {
    try {
      const queryEmbedding = await this.aiAgent.embedTexts(query);
      const context = await this.index.query({
        vector: queryEmbedding,
        topK: 3,
        includeMetadata: true,
      });

      console.log("Pinecone query context:", context);

      const result = context.matches
        .filter((match) => match.score >= 0.7)
        .map((match) => match.metadata.text)
        .join("\n\n");

      return result;
    } catch (error) {
      console.error("Error retrieving context from Pinecone:", error);
      return "";
    }
  }

  createPrompt(context, query) {
    if (!context) {
      return `Hãy sử dụng toàn bộ kiến thức bạn có để trả lời câu hỏi sau một cách chi tiết và chính xác nhất:\n\nCâu hỏi: ${query}`;
    }

    const augmentedPrompt = `
    Context information is below.\n
    ---------------------\n
    ${context}\n
    ---------------------\n
    Given the context information and not prior knowledge, 
    answer the query.\n
    Query: ${query}\n
    Answer: `;

    return augmentedPrompt;
  }
}
export default PineconeRetrieval;
