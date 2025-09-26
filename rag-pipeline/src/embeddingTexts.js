import { GoogleGenAI } from "@google/genai";

export default async function embedTexts(textChunk) {
  const genAi = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  const result = await genAi.models.embedContent({
    model: "gemini-embedding-001",
    contents: [textChunk],
  });

  console.log(`Embedding result:`, result.embeddings);

  return result.embeddings[0].values;
}
