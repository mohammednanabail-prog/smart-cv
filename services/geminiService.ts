
import { GoogleGenAI } from "@google/genai";
import type { Language } from "../types";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY environment variable not set. AI features will not work.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

const getLanguageName = (langCode: Language) => {
  switch(langCode) {
    case 'ar': return 'Arabic';
    case 'en': return 'English';
    case 'fr': return 'French';
    default: return 'English';
  }
};

export const generateSummary = async (jobTitle: string, language: Language): Promise<string> => {
  if (!API_KEY) return "AI service is unavailable. Please set the API_KEY.";

  const prompt = `
    Based on the job title "${jobTitle}", write a compelling and professional personal summary for a CV.
    The summary should be about 2-3 sentences long.
    The response must be in ${getLanguageName(language)}.
    Do not add any preamble or markdown. Just return the text of the summary.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text.trim();
  } catch (error) {
    console.error("Error generating summary:", error);
    return "Failed to generate summary.";
  }
};

export const generateSkills = async (jobTitle: string, language: Language): Promise<string[]> => {
  if (!API_KEY) return ["AI service unavailable"];

  const prompt = `
    Based on the job title "${jobTitle}", list the 5 most relevant and important skills for a CV.
    The response must be a comma-separated list.
    The response must be in ${getLanguageName(language)}.
    Example format: Skill 1, Skill 2, Skill 3, Skill 4, Skill 5
    Do not add any preamble, numbering, or markdown.
  `;
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text.trim().split(',').map(skill => skill.trim());
  } catch (error) {
    console.error("Error generating skills:", error);
    return ["Failed to generate skills."];
  }
};
   