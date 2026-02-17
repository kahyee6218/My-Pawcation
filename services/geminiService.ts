import { GoogleGenerativeAI, ChatSession } from "@google/generative-ai";
import { SYSTEM_INSTRUCTION } from "../constants";

let chatInstance: ChatSession | null = null;
let genAI: GoogleGenerativeAI | null = null;

const getChatInstance = () => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

    if (!apiKey) {
        throw new Error("API Key is missing. Please set VITE_GEMINI_API_KEY.");
    }

    if (!genAI) {
        genAI = new GoogleGenerativeAI(apiKey);
    }

    if (!chatInstance) {
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            systemInstruction: SYSTEM_INSTRUCTION,
        });

        chatInstance = model.startChat({
            history: [],
            generationConfig: {
                maxOutputTokens: 1000,
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
    const chat = getChatInstance();
    let fullText = "";

    try {
        const result = await chat.sendMessageStream(message);

        for await (const chunk of result.stream) {
            const chunkText = chunk.text();
            fullText += chunkText;
            onChunk(fullText);
        }

    } catch (error: any) {
        console.error("Gemini API Error:", error);

        // Handle specific error codes if possible
        if (error.message?.includes("429")) {
            throw new Error("Quota exceeded. Please try again in 1 minute.");
        } else if (error.message?.includes("404")) {
            throw new Error("Model not found. Please contact support.");
        }

        throw error;
    }

    return fullText;
};

export const resetChat = () => {
    chatInstance = null;
};
