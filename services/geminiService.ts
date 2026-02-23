import { GoogleGenAI, Chat } from "@google/genai";
import { SYSTEM_INSTRUCTIONS } from "../constants";

// Using gemini-2.5-flash — confirmed working with this API key
const MODEL_NAME = 'gemini-2.5-flash';

let chatInstance: Chat | null = null;

const getChatInstance = () => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.API_KEY || '';
    if (!apiKey) throw new Error("API Key is missing.");

    if (!chatInstance) {
        const ai = new GoogleGenAI({ apiKey: apiKey });
        chatInstance = ai.chats.create({
            model: MODEL_NAME,
            config: { systemInstruction: SYSTEM_INSTRUCTIONS, temperature: 0.7 },
        });
    }
    return chatInstance;
};

export const sendMessageToGemini = async (message: string, onChunk: (text: string) => void) => {
    const chat = getChatInstance();
    let fullText = "";
    const resultStream = await chat.sendMessageStream({ message });

    for await (const chunk of resultStream) {
        // Access .text directly — the @google/genai SDK exposes it as a property on each chunk
        const chunkText = chunk.text;
        if (chunkText) {
            fullText += chunkText;
            onChunk(fullText);
        }
    }
    return fullText;
};

export const resetChat = () => { chatInstance = null; };
