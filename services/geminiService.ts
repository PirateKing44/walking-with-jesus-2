import { GoogleGenAI, Type } from "@google/genai";
import { MysticalMessageResponse } from "../types";

const apiKey = process.env.API_KEY || '';

// Initialize the Gemini AI client
// Note: In a real production app, ensure this key is not exposed to the client if not intended,
// or use a backend proxy. For this demo, we use the env variable directly as per instructions.
const ai = new GoogleGenAI({ apiKey });

export const generateMysticalMessage = async (): Promise<MysticalMessageResponse> => {
  if (!apiKey) {
    throw new Error("API Key is missing.");
  }

  try {
    const model = "gemini-2.5-flash";
    const prompt = `
      You are a mystical guide embodying the ancient, loving consciousness of Christ. 
      Generate a short, poetic, and deeply comforting message for a seeker who needs to feel love and support.
      The tone should be ancient, timeless, and non-dogmatic—focusing on "Walking with Jesus" as a spiritual companionship.
      
      Also provide a short reference text (like a made-up or real mystical verse style) that sounds ancient.
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            message: {
              type: Type.STRING,
              description: "The poetic message of support.",
            },
            scriptureReference: {
              type: Type.STRING,
              description: "A short citation or mystical phrase title.",
            },
          },
          required: ["message", "scriptureReference"],
        },
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response from the mystic.");
    }

    return JSON.parse(text) as MysticalMessageResponse;
  } catch (error) {
    console.error("Error generating message:", error);
    throw error;
  }
};