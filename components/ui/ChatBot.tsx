import React, { useState, useEffect, useRef } from 'react';
import { Send, PawPrint, X, RefreshCcw, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatMessage from './ChatMessage';
import QuickActions from './QuickActions';
import { sendMessageToGemini, resetChat } from '../../services/geminiService';
import { Message, ChatState } from '../../types/chat';
import { QUICK_ACTIONS } from '../../constants';

function ChatBot() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 'welcome',
            role: 'model',
            content: "Hi there! 🐾 I'm the AI assistant for **My Pawcation**. I can help you with boarding rates, booking info, and answering questions about our cage-free home-style care. How can I help you today?",
            timestamp: new Date()
        }
    ]);
    const [inputText, setInputText] = useState('');
    const [chatState, setChatState] = useState<ChatState>(ChatState.IDLE);
    const [isOpen, setIsOpen] = useState(false);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [messages, isOpen]);

    const handleSendMessage = async (text: string = inputText) => {
        if (!text.trim() || chatState === ChatState.LOADING || chatState === ChatState.STREAMING) return;
        if (chatState === ChatState.ERROR) setChatState(ChatState.IDLE);

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: text,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputText('');
        setChatState(ChatState.LOADING);

        const botMessageId = (Date.now() + 1).toString();
        const initialBotMessage: Message = {
            id: botMessageId,
            role: 'model',
            content: '',
            timestamp: new Date()
        };
        setMessages(prev => [...prev, initialBotMessage]);

        try {
            await sendMessageToGemini(text, (streamedText) => {
                setChatState(ChatState.STREAMING);
                setMessages(prev => prev.map(msg =>
                    msg.id === botMessageId ? { ...msg, content: streamedText } : msg
                ));
            });
            setChatState(ChatState.IDLE);
        } catch (error: any) {
            console.error(error);
            const isKeyError = error?.message?.includes('API key') || error?.message?.includes('400');
            const friendlyMsg = isKeyError
                ? "⚠️ The AI assistant is temporarily unavailable. Please contact us directly on WhatsApp and we'll be happy to help! 🐾"
                : "⚠️ Sorry, I'm having trouble connecting right now. Please try again in a moment, or reach us directly on WhatsApp.";
            setMessages(prev => prev.map(msg =>
                msg.id === botMessageId ? { ...msg, content: friendlyMsg } : msg
            ));
            setChatState(ChatState.ERROR);
        }
    };

    const handleReset = () => {
        setMessages([messages[0]]);
        resetChat();
        setTimeout(() => inputRef.current?.focus(), 100);
    };

    return (
        <div className="fixed bottom-4 right-4 z-[9999] flex flex-col items-end gap-4 pointer-events-auto font-sans">

            {/* Floating Toggle Button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.9 }}
                animate={{
                    y: [0, -8, 0],
                    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                }}
                className={`
          w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-colors
          ${isOpen ? 'bg-white text-[#8B5E3C]' : 'bg-[#8B5E3C] text-white'}
          border-2 border-[#8B5E3C]/20
        `}
            >
                {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
            </motion.button>

            {/* Chat Window Container */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 50, rotate: -2 }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            y: 0,
                            rotate: 0,
                            transition: { type: "spring", damping: 20, stiffness: 300 }
                        }}
                        exit={{ opacity: 0, scale: 0.8, y: 50, rotate: 2 }}
                        className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-stone-200 flex flex-col origin-bottom-right"
                        style={{ width: 'min(380px, calc(100vw - 32px))', height: 'min(600px, calc(100vh - 100px))' }}
                    >
                        {/* Header */}
                        <div className="bg-[#8B5E3C] p-4 flex items-center justify-between text-white shadow-sm shrink-0">
                            <div className="flex items-center gap-3">
                                <motion.div
                                    animate={{ rotate: [0, 10, -10, 0] }}
                                    transition={{ duration: 5, repeat: Infinity }}
                                    className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm"
                                >
                                    <PawPrint size={18} />
                                </motion.div>
                                <h2 className="font-bold text-sm">My Pawcation</h2>
                            </div>
                            <div className="flex gap-1">
                                <button onClick={handleReset} className="p-2 hover:bg-white/10 rounded-full"><RefreshCcw size={16} /></button>
                                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-full"><X size={20} /></button>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto bg-stone-50 p-4 scrollbar-hide">
                            <div className="space-y-4">
                                <AnimatePresence initial={false}>
                                    {messages.map((msg) => (
                                        <motion.div
                                            key={msg.id}
                                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <ChatMessage message={msg} />
                                        </motion.div>
                                    ))}
                                </AnimatePresence>

                                {chatState === ChatState.LOADING && (
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                                        <div className="flex items-center gap-1.5 bg-white px-3 py-2.5 rounded-2xl rounded-tl-none border border-stone-100 shadow-sm">
                                            {[0, 0.2, 0.4].map(delay => (
                                                <motion.span
                                                    key={delay}
                                                    animate={{ y: [0, -4, 0] }}
                                                    transition={{ duration: 0.6, repeat: Infinity, delay }}
                                                    className="w-1.5 h-1.5 bg-[#8B5E3C] rounded-full"
                                                />
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>
                        </div>

                        {/* Input Area */}
                        <div className="bg-white border-t border-stone-100 p-3">
                            <QuickActions actions={QUICK_ACTIONS} onActionClick={handleSendMessage} disabled={chatState !== ChatState.IDLE} />
                            <div className="relative mt-2">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={inputText}
                                    onChange={(e) => setInputText(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                                    placeholder="Type your message..."
                                    className="w-full bg-stone-50 border border-stone-200 text-sm rounded-full pl-4 pr-10 py-2.5 outline-none focus:ring-2 focus:ring-[#8B5E3C]"
                                />
                                <button onClick={() => handleSendMessage()} className="absolute right-1.5 top-1.5 p-1.5 bg-[#8B5E3C] text-white rounded-full"><Send size={16} /></button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export { ChatBot };
