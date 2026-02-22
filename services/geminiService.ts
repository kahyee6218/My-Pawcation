import { GoogleGenerativeAI } from '@google/generative-ai';
import { SYSTEM_INSTRUCTIONS } from '../constants';

// Replace with your actual API Key or set VITE_GEMINI_API_KEY in .env
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';
const genAI = new GoogleGenerativeAI(API_KEY);

export const sendMessage = async (message: string, history: any[] = []) => {
    if (!API_KEY) {
        console.warn('Gemini API Key is missing. Please add VITE_GEMINI_API_KEY to your .env file.');
        return "I'm sorry, but my AI engine is currently disconnected. Please contact My Pawcation directly via WhatsApp for assistance!";
    }

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // Check if user wants to reset the chat
        if (message.toLowerCase() === 'reset chat') {
            return "I've reset our conversation history. How else can I help you today?";
        }

        const chat = model.startChat({
            history: history,
            generationConfig: {
                maxOutputTokens: 1000,
            },
        });

        const prompt = `${SYSTEM_INSTRUCTIONS}\n\nUser Question: ${message}`;
        const result = await chat.sendMessage(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error('Gemini API Error:', error);
        throw error;
    }
};
