import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { X, Send, User, Bot, Loader2, MessageSquare } from 'lucide-react';
import { CONTACT_INFO, PRICING_DATA, FAQS } from '../../constants';
import { supabase } from '../../lib/supabase';

type Message = {
    id: string;
    type: 'bot' | 'user';
    content: string;
    options?: string[];
};

type ChatState = 'idle' | 'asking_booking_type' | 'asking_dog_size' | 'asking_dates' | 'giving_advice';

export const ChatBot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            type: 'bot',
            content: "Woof! 🐾 I'm PawBot. I can help you with pricing, booking advice, or answer questions about our home-stay rules. What's on your mind?",
            options: ['Help me plan a booking', 'Price Check', 'Packing List', 'Talk to Founder']
        }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [chatState, setChatState] = useState<ChatState>('idle');
    const [bookingRef, setBookingRef] = useState({
        type: '',
        size: '',
        dates: ''
    });

    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (isOpen) scrollToBottom();
    }, [messages, isOpen]);

    const handleSend = async (content: string) => {
        if (!content.trim()) return;

        const userMsg: Message = { id: Date.now().toString(), type: 'user', content };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsLoading(true);

        // Smart Logic Layer
        setTimeout(async () => {
            let botResponse = "";
            let options: string[] = [];
            let nextState: ChatState = chatState;

            const lower = content.toLowerCase();

            // 1. STATE-BASED BOOKING ADVISOR
            if (chatState === 'asking_booking_type') {
                setBookingRef(prev => ({ ...prev, type: content }));
                botResponse = "Got it. And how big is your furkid? (Small, Medium, Large, or Giant?)";
                options = ['Small (under 10kg)', 'Medium (10-20kg)', 'Large (20-30kg)', 'Giant (over 30kg)'];
                nextState = 'asking_dog_size';
            }
            else if (chatState === 'asking_dog_size') {
                setBookingRef(prev => ({ ...prev, size: content }));
                botResponse = "Perfect. Last question: Are you looking at any specific dates or a holiday period? (e.g. CNY, Raya, or just a weekend?)";
                options = ['Check Peak Dates', 'Tell me more'];
                nextState = 'asking_dates';
            }
            else if (chatState === 'asking_dates') {
                botResponse = "Based on that, here is my PawBot Advice:\n\n1. Slots fill up 2-3 weeks early for Peak Seasons (CNY/Raya).\n2. Since you have a " + (bookingRef.size || "dog") + ", please ensure they are tick-free before arrival!\n3. We recommend bringing their own food to avoid tummy upsets.\n\nWould you like to see the exact price for a " + (bookingRef.size || "dog") + "?";
                options = ['Show me Pricing', 'Talk to Founder'];
                nextState = 'idle';
            }
            else if (lower.includes('plan') || lower.includes('booking advice')) {
                botResponse = "I'd love to help you plan! First, is this for Boarding (overnight) or Daycare (day only)?";
                options = ['Boarding', 'Daycare'];
                nextState = 'asking_booking_type';
            }


            // 2. KNOWLEDGE BASE SEARCH (FAQS / RULES)
            else if (lower.includes('price') || lower.includes('how much') || lower.includes('cost')) {
                botResponse = "Our Boarding starts at RM40/night and Daycare at RM20 for small dogs. Peak season (holidays) has a small surcharge. Check our detailed pricing for cats and big dogs as well!";
                options = ['Detailed Price List', 'Help me plan'];
            }
            else if (lower.includes('vaccine') || lower.includes('vaccinated') || lower.includes('injection')) {
                botResponse = "Safety first! 💉 All guests MUST be fully vaccinated (DHPPi + Lepto). We also require them to be on updated tick/flea prevention. Can you share your pet's vaccine card via WhatsApp later?";
                options = ['Talk to Founder', 'Booking SOP'];
            }
            else if (lower.includes('male') || lower.includes('neutered') || lower.includes('diaper')) {
                botResponse = "For the comfort of all guests, male dogs are required to wear 'Belly Bands' (diapers) while indoors to prevent marking. Please bring enough for their stay! 🐾";
                options = ['What else to bring?', 'Talk to Founder'];
            }
            else if (lower.includes('pack') || lower.includes('bring') || lower.includes('prepare')) {
                botResponse = "Packing List 🎒:\n- Own Food (labeled)\n- Leash & Harness\n- Vaccine Card\n- Diapers (for males)\n- Favorite toy or bedding (optional)";
                options = ['Booking SOP', 'Talk to Founder'];
            }
            else if (lower.includes('founder') || lower.includes('human') || lower.includes('whatsapp')) {
                botResponse = "Sure thing! My founder is ready to help you personally on WhatsApp.";
                options = ['Open WhatsApp'];
            }
            else {
                // Default fallback
                botResponse = "I'm still learning! 🐾 I can help with 'Pricing', 'Packing List', or give you 'Booking Advice'. What would you like to know?";
                options = ['Help me plan', 'Price Check', 'Packing List', 'Talk to Founder'];
                nextState = 'idle';
            }

            setChatState(nextState);
            const botMsg: Message = { id: (Date.now() + 1).toString(), type: 'bot', content: botResponse, options };
            setMessages(prev => [...prev, botMsg]);
            setIsLoading(false);

            // Log to Supabase if credentials exist
            try {
                await supabase.from('chat_logs').insert([
                    { user_msg: content, bot_response: botResponse, timestamp: new Date().toISOString() }
                ]);
            } catch (e) {
                // Silently fail if supabase not configured
            }
        }, 800);
    };

    const handleOptionClick = (option: string) => {
        if (option === 'Open WhatsApp') {
            window.open(`https://wa.me/${CONTACT_INFO.whatsapp.replace(/\D/g, '')}`, '_blank');
        } else if (option === 'Detailed Price List' || option === 'Show me Pricing') {
            window.location.hash = '#pricing';
            setIsOpen(false);
        } else if (option === 'Check Peak Dates') {
            window.location.hash = '#faq'; // Assuming holiday dates are in FAQ
            setIsOpen(false);
        } else {
            handleSend(option);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-[100] font-sans">
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-brand-green p-4 rounded-full shadow-2xl text-white hover:scale-110 transition-all flex items-center justify-center relative group"
                >
                    <MessageSquare size={28} />
                    <span className="absolute right-full mr-4 bg-white text-brand-dark px-3 py-1.5 rounded-xl shadow-lg border border-stone-100 text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                        Chat with us! 🐾
                    </span>
                </button>
            )}

            {isOpen && (
                <div className="bg-white w-[350px] sm:w-[400px] h-[550px] rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-stone-100 animate-in slide-in-from-bottom-5 duration-300">
                    <div className="bg-brand-green p-5 flex justify-between items-center text-white">
                        <div className="flex items-center gap-3">
                            <div className="bg-white/20 p-2 rounded-full">
                                <Bot size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold">PawBot Assistant</h3>
                                <div className="flex items-center gap-1.5 text-[10px] opacity-80 uppercase tracking-widest font-bold">
                                    <span className="w-1.5 h-1.5 bg-green-300 rounded-full animate-pulse" />
                                    Online
                                </div>
                            </div>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="hover:bg-black/10 p-2 rounded-full transition-colors">
                            <X size={20} />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-stone-50">
                        {messages.map((msg) => (
                            <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[85%] flex gap-2 ${msg.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                    <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center shadow-sm ${msg.type === 'user' ? 'bg-brand-cream text-brand-brown' : 'bg-brand-green text-white'}`}>
                                        {msg.type === 'user' ? <User size={16} /> : <Bot size={16} />}
                                    </div>
                                    <div className="space-y-2">
                                        <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.type === 'user' ? 'bg-white text-brand-dark rounded-tr-none' : 'bg-brand-green/10 text-stone-800 rounded-tl-none border border-brand-green/10'}`}>
                                            {msg.content.split('\n').map((line, i) => (
                                                <p key={i} className={i > 0 ? 'mt-1' : ''}>{line}</p>
                                            ))}
                                        </div>
                                        {msg.type === 'bot' && msg.options && (
                                            <div className="flex flex-wrap gap-2 pt-1">
                                                {msg.options.map((opt) => (
                                                    <button
                                                        key={opt}
                                                        onClick={() => handleOptionClick(opt)}
                                                        className="text-xs bg-white border border-brand-green/30 text-brand-green px-3 py-1.5 rounded-full hover:bg-brand-green hover:text-white transition-all font-medium shadow-sm active:scale-95"
                                                    >
                                                        {opt}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-brand-green/10 p-3 rounded-2xl rounded-tl-none animate-pulse flex items-center gap-2">
                                    <Loader2 size={16} className="animate-spin text-brand-green" />
                                    <span className="text-xs text-stone-500 font-medium">Analyzing...</span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="p-4 bg-white border-t border-stone-100">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSend(input)}
                                placeholder="Ask about prices, rules, or bookings..."
                                className="flex-1 bg-stone-100 border-none rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-brand-green transition-all"
                            />
                            <button
                                onClick={() => handleSend(input)}
                                disabled={!input.trim() || isLoading}
                                className="bg-brand-green text-white p-2.5 rounded-xl hover:bg-brand-dark transition-all disabled:opacity-50 disabled:scale-100 active:scale-90 shadow-md"
                            >
                                <Send size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
