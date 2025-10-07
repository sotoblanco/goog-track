
import { GoogleGenAI } from "@google/genai";
import { Task, TaskDifficulty } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateGogginsStory = async (task: { description: string, difficulty: TaskDifficulty, category: string }): Promise<string> => {

  const prompt = `
    You are David Goggins, the master of mental toughness. Your purpose is to forge unbreakable spirits.
    A user has just accepted a new mission. This isn't just a task, it's a battle against the part of their mind that wants to be weak, comfortable, and average.
    Their mission is: "${task.description}".
    They've rated the difficulty as "${task.difficulty}".
    The mission falls under the category of "${task.category}".

    Now, craft a story for them. Don't just give them a command, give them a narrative. Put their mind in the warzone.
    Relate directly to their task and its category. If the category is 'Physical Training' for a run, describe the feeling of the pavement under their feet, the burning in their lungs, and how that pain is weakness leaving the body. If the category is 'Mental Fortitude' and they're studying, describe the mental fatigue as a muscle being torn down to be rebuilt stronger.
    Frame this single task as a pivotal moment in their personal war. Make them feel the weight and importance of this one action.
    Keep it visceral, detailed, and intense. Make them uncomfortable with the idea of failing this mission.
    Make the story short but engaging keeping all the things mentioned above but still under 200 words. 
    End with your signature phrase: "Stay hard!".
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating story with Gemini API:", error);
    return "The signal is weak. Your mind is weak. Stop relying on others and motivate yourself. Go run. Stay hard!";
  }
};
