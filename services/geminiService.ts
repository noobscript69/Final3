
import { GoogleGenAI, Type } from "@google/genai";
import { UserInput, BrandStrategy } from "../types";

export const generateBrandStrategy = async (input: UserInput): Promise<BrandStrategy> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Generate a comprehensive personal brand strategy for:
      Name: ${input.name}
      Industry: ${input.industry}
      Experience: ${input.experience}
      Goals: ${input.goals}
      Preferred Tone: ${input.tone}
      
      The strategy should include a radar-chart friendly set of 5 archetypes (e.g., Hero, Sage, Creator, Ruler, Outlaw) with scores from 0-100.
      Also include a vivid visual prompt for an AI image generator to create a professional brand conceptual background image.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          tagline: { type: Type.STRING },
          bio: { type: Type.STRING },
          mission: { type: Type.STRING },
          archetypes: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                subject: { type: Type.STRING },
                value: { type: Type.NUMBER }
              },
              required: ["subject", "value"]
            }
          },
          strategySteps: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                description: { type: Type.STRING }
              },
              required: ["title", "description"]
            }
          },
          visualPrompt: { type: Type.STRING }
        },
        required: ["tagline", "bio", "mission", "archetypes", "strategySteps", "visualPrompt"]
      }
    }
  });

  return JSON.parse(response.text.trim());
};

export const generateBrandImage = async (prompt: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        { text: `A high-end, professional, minimalist aesthetic background for a personal brand identity. Concept: ${prompt}. Cinematic lighting, 4k, clean composition, artistic.` }
      ]
    },
    config: {
      imageConfig: {
        aspectRatio: "16:9"
      }
    }
  });

  for (const part of response.candidates?.[0]?.content.parts || []) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  
  throw new Error("No image generated");
};
