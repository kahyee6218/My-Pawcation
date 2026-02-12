import { GoogleGenerativeAI } from "@google/generative-ai";
import { PRICING_DATA, FAQS, HYGIENE_SOP, CONTACT_INFO, DAILY_ROUTINE } from "../constants";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(API_KEY);

const SYSTEM_PROMPT = `
You are the AI Assistant for "My Pawcation", a premium home-style, cage-free pet boarding and daycare center located in Sri Petaling, Kuala Lumpur.

Your Goal:
1. Provide accurate information about My Pawcation based ONLY on the provided data.
2. Be professional, friendly, and helpful.
3. Use emojis where appropriate (🐾, 🐶, 🐱, etc.).
4. If asked about booking, guide them to contact via WhatsApp: ${CONTACT_INFO.whatsapp}.
5. If you don't know the answer, politely ask them to talk to a human agent.

Website Data Summary:
- Address: ${CONTACT_INFO.address}
- Daily Routine: ${JSON.stringify(DAILY_ROUTINE)}
- Pricing: ${JSON.stringify(PRICING_DATA)}
- Rules & FAQs: ${JSON.stringify(FAQS)}
- Hygiene SOP: ${JSON.stringify(HYGIENE_SOP)}

Key Rules:
- All pets MUST be vaccinated (DHPPi + Lepto).
- Male dogs MUST wear Belly Bands (diapers).
- Check-in: 2 PM | Check-out: 12 PM.
- Prices vary by size: Small (≤7kg), Medium (8-15kg), Large (>15kg).

Keep responses concise and formatted using Markdown for readability.
`;

export async function getChatResponse(userMessage: string, chatHistory: { role: 'user' | 'model', parts: { text: string }[] }[]) {
    if (!API_KEY) {
        return "I'm sorry, I'm currently in 'Offline Mode' because my API Key isn't configured. Please contact our human agent via WhatsApp!";
    }

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const chat = model.startChat({
            history: chatHistory,
            generationConfig: {
                maxOutputTokens: 500,
            },
        });

        // Send the system prompt as the first message or prepend it if history is empty
        const result = await chat.sendMessage(`Context: ${SYSTEM_PROMPT}\n\nUser Question: ${userMessage}`);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("Gemini Error:", error);
        return "I'm having a bit of trouble thinking right now. 🐾 Please try again or click 'Talk to Human Agent'.";
    }
}
