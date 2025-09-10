import { GoogleGenAI } from "@google/genai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

const gemini = new GoogleGenAI({ apiKey });

export const generateResponse = async (msg) => {
  const response = await gemini.models.generateContent({
    model: "gemini-2.5-flash",
    contents: msg,
  });

  return response.text;
};
