import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { X, Send, User, Bot, Loader2, MessageSquare, Headphones, MoreHorizontal, Sparkles } from 'lucide-react';
import { CONTACT_INFO, PRICING_DATA, FAQS } from '../../constants';
import { supabase } from '../../lib/supabase';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getChatResponse } from '../../services/gemini';

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
            content: "Hello! 🐾 I'm your PawBot assistant. I'm powered by Google Gemini and trained on My Pawcation's specific rules and pricing. How can I help you today?",
            options: ['Plan a Booking', 'Price Inquiry', 'Rules & FAQ', 'Talk to Human Agent']
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

    const handleSend = async (e?: React.FormEvent, manualContent?: string) => {
        if (e && e.preventDefault) e.preventDefault();

        const content = manualContent || input.trim();
        if (!content || isLoading) return;

        const newUserMsg: Message = { id: Date.now().toString(), type: 'user', content };
        setMessages(prev => [...prev, newUserMsg]);
        if (!manualContent) setInput('');
        setIsLoading(true);

        // Prepare History for Gemini
        const history = messages.map(msg => ({
            role: (msg.type === 'bot' ? 'model' : 'user') as 'model' | 'user',
            parts: [{ text: msg.content }]
        }));

        try {
            const botResponse = await getChatResponse(content, history);
            const botMsg: Message = {
                id: (Date.now() + 1).toString(),
                type: 'bot',
                content: botResponse,
                options: ['Plan a Booking', 'Rules & FAQ', 'Talk to Human Agent']
            };
            setMessages(prev => [...prev, botMsg]);

            // Optional: Log to Supabase
            try {
                await supabase.from('chat_logs').insert([{
                    user_msg: content,
                    bot_response: botResponse,
                    timestamp: new Date().toISOString()
                }]);
            } catch (e) { }
        } catch (error) {
            console.error("Chat Error:", error);
            const errorMsg: Message = {
                id: Date.now().toString(),
                type: 'bot',
                content: "I'm having a connection issue. 🐾 Please try again or talk to our agent via WhatsApp!",
                options: ['Talk to Human Agent']
            };
            setMessages(prev => [...prev, errorMsg]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleOptionClick = (option: string) => {
        if (option === 'Open WhatsApp' || option === 'Talk to Human Agent') {
            window.open(`https://wa.me/${CONTACT_INFO.whatsapp.replace(/\D/g, '')}`, '_blank');
            return;
        }
        if (option === 'Reset Bot') {
            setMessages([{ id: '1', type: 'bot', content: "Analyzer Reset. How can I help you today?", options: ['Plan a Booking', 'Rules & FAQ', 'Talk to Human Agent'] }]);
            return;
        }
        handleSend(undefined, option);
    };

    return (
        <div className="fixed bottom-6 right-6 z-[100] font-sans text-stone-800">
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
                    {/* Header */}
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
                                <h3 className="font-display font-black text-lg tracking-tight">PawBot <span className="text-brand-green">AI</span></h3>
                                <div className="flex items-center gap-2 text-[10px] font-bold text-brand-sand uppercase tracking-wider">
                                    <Sparkles size={10} className="text-brand-green" />
                                    Powered by Gemini 1.5
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
                                        <div className={`p-4 rounded-[1.5rem] text-[13px] leading-relaxed shadow-sm prose prose-sm prose-stone ${msg.type === 'user' ? 'bg-white text-brand-dark rounded-tr-none border border-brand-sand/30 shadow-brand-brown/5' : 'bg-white text-brand-dark rounded-tl-none border border-brand-green/20 shadow-brand-green/5'}`}>
                                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                                {msg.content}
                                            </ReactMarkdown>
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
                                    <span className="text-[10px] text-stone-400 font-black uppercase tracking-widest text-brand-green">AI Thinking</span>
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
                                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Message our agents..."
                                className="flex-1 bg-transparent border-none rounded-xl px-4 py-3 text-[13px] focus:ring-0 outline-none placeholder:text-stone-400"
                            />
                            <button
                                onClick={() => handleSend()}
                                disabled={!input.trim() || isLoading}
                                className="bg-brand-brown text-white p-3 rounded-xl hover:bg-brand-dark transition-all disabled:opacity-50 active:scale-90 shadow-lg shadow-brand-brown/20"
                            >
                                <Send size={20} />
                            </button>
                        </div>
                        <p className="text-[9px] text-center text-stone-400 mt-4 font-medium uppercase tracking-widest flex items-center justify-center gap-2">
                            <Sparkles size={10} className="text-brand-green" />
                            Truly Intelligent AI Analysis
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};
