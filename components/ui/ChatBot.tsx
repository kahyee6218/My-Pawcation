import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { X, Send, User, Bot, Loader2, MessageSquare } from 'lucide-react';
import { CONTACT_INFO } from '../../constants';
import { supabase } from '../../lib/supabase';

type Message = {
    id: string;
    type: 'bot' | 'user';
    content: string;
    options?: string[];
};

export const ChatBot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            type: 'bot',
            content: "Hi there! 🐾 I'm PawBot, your helpful assistant for My-Pawcation. How can I help you today?",
            options: ['Booking SOP', 'Pricing Inquiry', 'Rules & FAQs', 'Talk to Founder']
        }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
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

        // Simple Bot Logic based on keywords and options
        setTimeout(async () => {
            let botResponse = "";
            let options: string[] = [];

            const lower = content.toLowerCase();

            if (lower.includes('booking') || lower.includes('sop')) {
                botResponse = "To make a booking: \n1. Contact us to confirm dates. \n2. Pay 50% deposit or 100% full payment to secure your slot. \n3. Share your pet's vaccination proof. \n\nCheck-in is after 2pm, Check-out is before 12pm.";
                options = ['Check Prices', 'Talk to Founder'];
            } else if (lower.includes('pricing') || lower.includes('price') || lower.includes('how much')) {
                botResponse = "Our prices start from RM20 for daycare and RM40 for boarding (Dogs). Cats/Rabbits start at RM15 for daycare. Would you like to see the full pricing table?";
                options = ['Go to Pricing Section', 'Booking SOP'];
            } else if (lower.includes('rule') || lower.includes('faq') || lower.includes('vaccination') || lower.includes('male dog')) {
                botResponse = "Standard Rules: \n- Vaccinations required. \n- Male dogs must wear diapers. \n- Bring own food/meds. \n\nIs there a specific FAQ you want to know about?";
                options = ['See all FAQs', 'Talk to Founder'];
            } else if (lower.includes('founder') || lower.includes('human') || lower.includes('person') || lower.includes('talk to')) {
                botResponse = "I'll connect you to our founder on WhatsApp right away! They can help with specific requests.";
                options = ['Open WhatsApp'];
            } else {
                botResponse = "I'm not sure I understand that. Try selecting an option below or asking about 'Booking', 'Pricing', or 'Rules'.";
                options = ['Booking SOP', 'Pricing Inquiry', 'Talk to Founder'];
            }

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
        } else if (option === 'Go to Pricing Section') {
            window.location.hash = '#pricing';
            setIsOpen(false);
        } else if (option === 'See all FAQs') {
            window.location.hash = '#faq';
            setIsOpen(false);
        } else {
            handleSend(option);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-[100] font-sans">
            {/* Chat Bubble */}
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

            {/* Chat Window */}
            {isOpen && (
                <div className="bg-white w-[350px] sm:w-[400px] h-[550px] rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-stone-100 animate-in slide-in-from-bottom-5 duration-300">
                    {/* Header */}
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

                    {/* Messages Body */}
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
                                    <span className="text-xs text-stone-500 font-medium">Typing...</span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Footer */}
                    <div className="p-4 bg-white border-t border-stone-100">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSend(input)}
                                placeholder="Type your question..."
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
