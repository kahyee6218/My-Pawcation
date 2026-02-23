import { GoogleGenerativeAI, ChatSession } from '@google/generative-ai';
import { SYSTEM_INSTRUCTIONS } from '../constants';

// Replace with your actual API Key or set VITE_GEMINI_API_KEY in .env
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.API_KEY || '';
const genAI = new GoogleGenerativeAI(API_KEY);

let chatSession: ChatSession | null = null;

export const resetChat = () => {
    chatSession = null;
};

export const sendMessageToGemini = async (
    message: string,
    onProgress?: (text: string) => void
) => {
    if (!API_KEY) {
        console.warn('Gemini API Key is missing. Please add VITE_GEMINI_API_KEY to your .env file.');
        throw new Error("Configuration Error: API Key is missing or invalid.");
    }

    try {
        if (!chatSession) {
            const model = genAI.getGenerativeModel({
                model: "gemini-2.5-flash",
                systemInstruction: SYSTEM_INSTRUCTIONS,
            });

            chatSession = model.startChat({
                history: [],
                generationConfig: {
                    maxOutputTokens: 1000,
                    temperature: 0.7,
                },
            });
        }

        const result = await chatSession.sendMessageStream(message);

        let fullResponse = '';
        for await (const chunk of result.stream) {
            const chunkText = chunk.text();
            fullResponse += chunkText;
            if (onProgress) {
                onProgress(fullResponse);
            }
        }

    } catch (error) {
        console.error('Gemini API Error:', error);
        throw error;
    }
};

export const sendMessage = async (message: string, history: any[] = []) => {
    return "Legacy function disabled.";
};
