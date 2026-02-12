import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { X, Send, User, Bot, Loader2, MessageSquare, Headphones, MoreHorizontal, Sparkles } from 'lucide-react';
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
            content: "Hello! 🐾 I'm your PawBot assistant. I can help you plan a stay, check our pricing, or connect you with a live agent. What can I do for you?",
            options: ['Plan a Booking', 'Price Inquiry', 'Rules & FAQ', 'Talk to Human Agent']
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

        // Intelligent Analysis & Knowledge Extraction
        setTimeout(async () => {
            let botResponse = "";
            let options: string[] = ['Plan a Booking', 'Rules & FAQ', 'Talk to Human Agent', 'Ask about Pricing'];
            let nextState: ChatState = chatState;

            const lower = content.toLowerCase().trim();

            // --- 0. DYNAMIC KNOWLEDGE BASE SEARCH ---
            const findBestAnswer = () => {
                // Check FAQs
                const faqMatch = FAQS.find(f =>
                    lower.includes(f.question.toLowerCase().split(' ').slice(0, 3).join(' ')) ||
                    f.question.toLowerCase().split(' ').some(word => word.length > 4 && lower.includes(word))
                );
                if (faqMatch) return faqMatch.answer;

                // Check Specific Pricing Logic
                if (lower.includes('price') || lower.includes('how much') || lower.includes('cost') || lower.includes('rm')) {
                    let priceNote = "Our Boarding starts at RM40 and Daycare at RM20 for small dogs.";
                    if (lower.includes('cat') || lower.includes('rabbit')) {
                        priceNote = `For cats/rabbits, Daycare is RM${PRICING_DATA.cats_rabbits.daycare[0].normal} and Boarding is RM${PRICING_DATA.cats_rabbits.boarding[0].normal}.`;
                    } else if (lower.includes('large') || lower.includes('giant') || lower.includes('big')) {
                        priceNote = `For large dogs (>15kg), Boarding is RM${PRICING_DATA.dogs.boarding[2].normal} and Daycare is RM${PRICING_DATA.dogs.daycare[2].normal}.`;
                    } else if (lower.includes('medium')) {
                        priceNote = `For medium dogs (8-15kg), Boarding is RM${PRICING_DATA.dogs.boarding[1].normal} and Daycare is RM${PRICING_DATA.dogs.daycare[1].normal}.`;
                    }
                    return `${priceNote} Peak seasons (CNY/Raya) have a RM10 surcharge. Would you like a person to calculate a final quote?`;
                }

                // Check Routine / Hours
                if (lower.includes('time') || lower.includes('routine') || lower.includes('schedule') || lower.includes('open')) {
                    return "Our daily routine starts at 7 AM with feeding. Check-in is at 2 PM and Check-out at 12 PM. We are open every day, but appointments are required!";
                }

                // Check Rules (Vaccines/Diapers)
                if (lower.includes('vaccine') || lower.includes('injection') || lower.includes('sick') || lower.includes('safety')) {
                    return "Safety is our priority! 💉 All pets must be fully vaccinated (DHPPi + Lepto). We also have strict hygiene SOPs and separate zones for cats and dogs.";
                }
                if (lower.includes('male') || lower.includes('boy') || lower.includes('pee') || lower.includes('diaper')) {
                    return "Male dogs are welcome but MUST wear 'Belly Bands' (diapers) indoors to prevent marking. Please bring your own!";
                }

                // Check Facility / Location
                if (lower.includes('where') || lower.includes('location') || lower.includes('address')) {
                    return `We are located at ${CONTACT_INFO.address}. It's a cage-free, home-style environment in Sri Petaling.`;
                }

                return null;
            };

            const knowledgeAnswer = findBestAnswer();

            // --- 1. STATE-BASED LOGIC (With Knowledge Override) ---
            if (chatState === 'asking_booking_type' && !knowledgeAnswer) {
                setBookingRef(prev => ({ ...prev, type: content }));
                botResponse = "Got it. And how big is your furkid? (Small, Medium, or Large?)";
                options = ['Small (≤7kg)', 'Medium (8–15kg)', 'Large (>15kg)'];
                nextState = 'asking_dog_size';
            }
            else if (chatState === 'asking_dog_size' && !knowledgeAnswer) {
                setBookingRef(prev => ({ ...prev, size: content }));
                botResponse = "Perfect. Last question: Are you looking at any specific dates or a holiday period? (CNY, Raya, School Holidays?)";
                options = ['Normal Weekday', 'Peak Season / Holiday'];
                nextState = 'asking_dates';
            }
            else if (chatState === 'asking_dates' && !knowledgeAnswer) {
                botResponse = "Based on our data for " + (bookingRef.type) + " a " + (bookingRef.size || "dog") + ":\n\n1. Slots fill up fast for holidays.\n2. Vaccination cards are mandatory.\n3. Bring their own food to avoid tummy upsets.\n\nShall I connect you with a Human Agent for the final booking confirmation?";
                options = ['Talk to Human Agent', 'Ask about Pricing'];
                nextState = 'idle';
            }
            // --- 2. GLOBAL OVERRIDE (TRUE INTELLIGENCE) ---
            else if (knowledgeAnswer) {
                botResponse = knowledgeAnswer;
                nextState = 'idle'; // Reset state if user asks a side question
            }
            else if (lower.includes('plan') || lower.includes('book')) {
                botResponse = "I'll help you plan! 🐾 Is this for Boarding (overnight) or Daycare (day only)?";
                options = ['Boarding', 'Daycare'];
                nextState = 'asking_booking_type';
            }
            else if (lower.includes('agent') || lower.includes('human') || lower.includes('founder') || lower.includes('talk to')) {
                botResponse = "Connecting you to our Human Support Agent on WhatsApp for personal assistance... 🐾";
                options = ['Open WhatsApp'];
            }
            else {
                botResponse = "I've analyzed your message based on our current SOPs. I can provide details on 'Pricing', 'Hygiene Rules', or 'Daily Routines'. What else would you like to know?";
                options = ['Plan a Booking', 'Detailed Price List', 'Talk to Human Agent'];
                nextState = 'idle';
            }

            setChatState(nextState);
            const botMsg: Message = { id: (Date.now() + 1).toString(), type: 'bot', content: botResponse, options };
            setMessages(prev => [...prev, botMsg]);
            setIsLoading(false);

            try {
                await supabase.from('chat_logs').insert([
                    { user_msg: content, bot_response: botResponse, timestamp: new Date().toISOString() }
                ]);
            } catch (e) { }
        }, 1500);
    };

    const handleOptionClick = (option: string) => {
        if (option === 'Open WhatsApp' || option === 'Talk to Human Agent') {
            window.open(`https://wa.me/${CONTACT_INFO.whatsapp.replace(/\D/g, '')}`, '_blank');
        } else if (option === 'Detailed Price List') {
            window.location.hash = '#pricing';
            setIsOpen(false);
        } else {
            handleSend(option);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-[100] font-sans">
            {/* Professional Chat Bubble */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-brand-brown p-4 rounded-full shadow-[0_10px_40px_rgba(109,76,65,0.3)] text-white hover:scale-110 active:scale-95 transition-all flex items-center justify-center relative group"
                >
                    <div className="relative">
                        <MessageSquare size={28} />
                        <span className="absolute -top-1 -right-1 w-3 h-3 bg-brand-green rounded-full border-2 border-brand-brown animate-pulse"></span>
                    </div>
                    <div className="absolute right-full mr-4 bg-white/95 backdrop-blur-md text-brand-brown px-4 py-2 rounded-2xl shadow-xl border border-brand-sand/30 text-xs font-bold opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0 whitespace-nowrap pointer-events-none">
                        Ask PawBot Anything! 🐾
                    </div>
                </button>
            )}

            {/* Premium Chat Window */}
            {isOpen && (
                <div className="bg-white/95 backdrop-blur-xl w-[360px] sm:w-[420px] h-[600px] rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.15)] flex flex-col overflow-hidden border border-white animate-in zoom-in-95 slide-in-from-bottom-10 duration-500">
                    {/* Refined Header */}
                    <div className="bg-gradient-to-br from-brand-brown to-brand-dark p-6 pb-8 flex justify-between items-start text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-green/10 rounded-full blur-3xl -mr-10 -mt-10"></div>

                        <div className="flex items-center gap-4 relative z-10">
                            <div className="relative">
                                <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 shadow-inner">
                                    <Bot size={28} className="text-brand-green" />
                                </div>
                                <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-brand-green rounded-full border-2 border-brand-brown flex items-center justify-center">
                                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping"></span>
                                </span>
                            </div>
                            <div>
                                <h3 className="font-display font-black text-lg tracking-tight">PawBot <span className="text-brand-green">Plus++</span></h3>
                                <div className="flex items-center gap-2 text-[10px] font-bold text-brand-sand uppercase tracking-wider">
                                    <Sparkles size={10} className="text-brand-green" />
                                    Active Support Agent
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="bg-white/10 hover:bg-white/20 p-2 rounded-xl transition-all active:scale-90"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Chat Experience Area */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gradient-to-b from-brand-cream/30 to-white">
                        {messages.map((msg) => (
                            <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-300`}>
                                <div className={`max-w-[85%] flex gap-3 ${msg.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                    <div className={`shrink-0 w-8 h-8 rounded-xl flex items-center justify-center shadow-sm ${msg.type === 'user' ? 'bg-brand-sand text-brand-brown' : 'bg-brand-brown text-white'}`}>
                                        {msg.type === 'user' ? <User size={14} /> : <Headphones size={14} />}
                                    </div>
                                    <div className="space-y-3">
                                        <div className={`p-4 rounded-[1.5rem] text-[13px] leading-relaxed shadow-sm ${msg.type === 'user' ? 'bg-white text-brand-dark rounded-tr-none border border-brand-sand/30 shadow-brand-brown/5' : 'bg-white text-brand-dark rounded-tl-none border border-brand-green/20 shadow-brand-green/5'}`}>
                                            {msg.content.split('\n').map((line, i) => (
                                                <p key={i} className={i > 0 ? 'mt-2 italic opacity-80 border-t border-brand-sand/20 pt-2' : ''}>{line}</p>
                                            ))}
                                        </div>
                                        {msg.type === 'bot' && msg.options && (
                                            <div className="flex flex-wrap gap-2 pt-1">
                                                {msg.options.map((opt) => (
                                                    <button
                                                        key={opt}
                                                        onClick={() => handleOptionClick(opt)}
                                                        className={`text-[11px] px-4 py-2 rounded-xl transition-all font-bold shadow-sm active:scale-95 border ${opt.includes('Agent') ? 'bg-brand-green text-white border-brand-green hover:bg-brand-dark' : 'bg-white text-brand-brown border-brand-sand/50 hover:border-brand-green hover:text-brand-green'}`}
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
                                <div className="bg-white border border-brand-green/20 p-4 rounded-[1.5rem] rounded-tl-none flex items-center gap-3 shadow-sm">
                                    <div className="flex gap-1">
                                        <span className="w-1.5 h-1.5 bg-brand-green rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                        <span className="w-1.5 h-1.5 bg-brand-green rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                        <span className="w-1.5 h-1.5 bg-brand-green rounded-full animate-bounce"></span>
                                    </div>
                                    <span className="text-[10px] text-stone-400 font-black uppercase tracking-widest">Agent Typing</span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Integrated Input Section */}
                    <div className="p-6 bg-white border-t border-brand-sand/20">
                        <div className="bg-brand-cream/50 p-1.5 rounded-2xl flex items-center gap-2 border border-brand-sand/30 shadow-inner group focus-within:border-brand-green transition-all">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSend(input)}
                                placeholder="Message our agents..."
                                className="flex-1 bg-transparent border-none rounded-xl px-4 py-3 text-[13px] focus:ring-0 outline-none placeholder:text-stone-400"
                            />
                            <button
                                onClick={() => handleSend(input)}
                                disabled={!input.trim() || isLoading}
                                className="bg-brand-brown text-white p-3 rounded-xl hover:bg-brand-dark transition-all disabled:opacity-50 active:scale-90 shadow-lg shadow-brand-brown/20"
                            >
                                <Send size={20} />
                            </button>
                        </div>
                        <p className="text-[9px] text-center text-stone-400 mt-4 font-medium uppercase tracking-widest flex items-center justify-center gap-2">
                            <Sparkles size={10} className="text-brand-green" />
                            Powered by PawBot Intelligence
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};
