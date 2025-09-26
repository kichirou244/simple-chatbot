import dotenv from "dotenv";
import { Pinecone } from "@pinecone-database/pinecone";
import chunkTexts from "./src/chunkTexts.js";
import embedTexts from "./src/embeddingTexts.js";
import readFile from "./src/readFile.js";

dotenv.config();

const { PINECONE_API_KEY, PINECONE_INDEX_NAME } = process.env;

const pinecone = new Pinecone({ apiKey: PINECONE_API_KEY });
const index = pinecone.Index(PINECONE_INDEX_NAME).namespace("sample-4");
const filePath = "./data/sample2.txt";

async function indexDocs() {
  const text = readFile(filePath);
  const chunks = chunkTexts(text, 300, 60);

  const vectors = await Promise.all(
    chunks.map(async (chunk, idx) => ({
      id: `chunk-${idx}`,
      values: await embedTexts(chunk),
      metadata: { text: chunk },
    }))
  );

  await index.upsert(vectors);
  console.log("Documents indexed");
}

(async () => {
  await indexDocs();
})();