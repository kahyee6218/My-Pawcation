import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";

let chatInstance: Chat | null = null;

const getChatInstance = () => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

    if (!apiKey) {
        console.error("API Key is missing!");
        // We will let the caller handle the error, or return a mock/error instance if needed
        throw new Error("API Key is missing. Please set VITE_GEMINI_API_KEY in your .env or Vercel.");
    }

    if (!chatInstance) {
        const ai = new GoogleGenAI({ apiKey: apiKey });
        chatInstance = ai.chats.create({
            model: 'gemini-2.0-flash',
            config: {
                systemInstruction: SYSTEM_INSTRUCTION,
                temperature: 0.7,
            },
        });
    }
    return chatInstance;
};

export const sendMessageToGemini = async (
    message: string,
    onChunk: (text: string) => void
): Promise<string> => {
    let chat;
    try {
        chat = getChatInstance();
    } catch (e) {
        // If we can't get the chat instance (e.g. no API key), throw immediately
        throw e;
    }

    let fullText = "";

    try {
        const resultStream = await chat.sendMessageStream({ message });

        for await (const chunk of resultStream) {
            // The new @google/genai might return text differently or similar to the old.
            // Based on docs, it returns 'text' property or similar.
            // Let's assume the user's code structure is correct for the SDK they used.
            // However, safely accessing text is better.
            const c = chunk as GenerateContentResponse;
            const textChunk = c.text || "";
            if (textChunk) {
                fullText += textChunk;
                onChunk(fullText);
            }
        }
    } catch (error) {
        console.error("Error sending message to Gemini:", error);
        throw error;
    }

    return fullText;
};

export const resetChat = () => {
    chatInstance = null;
};
