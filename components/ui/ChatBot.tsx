import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, Loader2, X, MessageSquare, RefreshCw, ChevronDown } from 'lucide-react';
import ChatMessage from './ChatMessage';
import QuickActions from './QuickActions';
import { sendMessage } from '../../services/geminiService';
import { QUICK_ACTIONS } from '../../constants';
import { Message } from '../../types/chat';

function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            role: 'model',
            content: "Hi there! 🐾 I'm your My Pawcation Assistant. How can I help you and your furry friend today?",
            timestamp: new Date(),
        },
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
        }
    }, [messages, isOpen]);

    const handleSend = async (content: string) => {
        if (!content.trim() || isLoading) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content,
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const chatHistory = messages.map(m => ({
                role: m.role,
                parts: [{ text: m.content }]
            }));

            const response = await sendMessage(content, chatHistory);

            const botMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'model',
                content: response,
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
            console.error('Error sending message:', error);
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'model',
                content: 'Sorry, I encountered an error. Please try again or contact us via WhatsApp!',
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const resetChat = () => {
        setMessages([
            {
                id: Date.now().toString(),
                role: 'model',
                content: "I've reset our conversation. How else can I help you today? 🐾",
                timestamp: new Date(),
            },
        ]);
    };

    return (
        <div className="fixed bottom-4 right-4 z-[9999] flex flex-col items-end gap-4 pointer-events-auto font-sans">
            {/* Chat Window Container */}
            <div
                id="chat-window"
                role="dialog"
                aria-label="My Pawcation AI Chat Assistant"
                className={`
                    transition-all duration-300 ease-in-out transform origin-bottom-right
                    bg-[#FAF7F2] rounded-2xl shadow-2xl overflow-hidden border border-stone-200
                    flex flex-col
                    ${isOpen ? 'scale-100 opacity-100 translate-y-0 visible' : 'scale-95 opacity-0 translate-y-10 invisible pointer-events-none'}
                `}
                style={{
                    width: 'min(400px, calc(100vw - 32px))',
                    height: 'min(650px, calc(100vh - 100px))',
                }}
            >
                {/* Header */}
                <div className="bg-[#8B5E3C] p-3 flex items-center justify-between text-white shrink-0 shadow-md">
                    <div className="flex items-center gap-2">
                        <div className="bg-white/20 p-1.5 rounded-lg border border-white/10">
                            <Bot size={20} />
                        </div>
                        <div>
                            <h1 className="font-bold text-sm tracking-tight text-stone-100">My Pawcation</h1>
                            <div className="flex items-center gap-1">
                                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.5)]"></span>
                                <span className="text-[10px] text-stone-300 font-medium">AI Assistant Active</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-1">
                        <button
                            onClick={resetChat}
                            className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-white"
                            title="Reset Chat"
                        >
                            <RefreshCw size={16} />
                        </button>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-white focus:outline-none"
                            title="Close Chat"
                        >
                            <X size={18} />
                        </button>
                    </div>
                </div>

                {/* Message Container */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth bg-stone-50/50">
                    {messages.map((message) => (
                        <ChatMessage key={message.id} message={message} />
                    ))}

                    {isLoading && (
                        <div className="flex justify-start">
                            <div className="bg-white px-4 py-2 rounded-2xl shadow-sm border border-stone-100 flex items-center gap-2">
                                <Loader2 size={14} className="animate-spin text-[#8B5E3C]" />
                                <span className="text-xs text-stone-400 font-medium italic">Thinking about pets...</span>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Quick Actions (only show if few messages) */}
                {messages.length <= 1 && !isLoading && (
                    <div className="px-4 pb-2">
                        <QuickActions actions={QUICK_ACTIONS} onActionClick={handleSend} />
                    </div>
                )}

                {/* Footer/Input */}
                <div className="p-4 bg-white border-t border-stone-100 shrink-0">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSend(input);
                        }}
                        className="flex items-center gap-2"
                    >
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask about boarding or book a stay..."
                            className="flex-1 px-4 py-2.5 bg-stone-100 text-stone-800 border-none rounded-xl text-sm focus:ring-2 focus:ring-[#8B5E3C]/20 transition-all placeholder:text-stone-400"
                        />
                        <button
                            type="submit"
                            disabled={!input.trim() || isLoading}
                            className="p-2.5 bg-[#8B5E3C] text-white rounded-xl hover:bg-[#724a2e] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md active:scale-95"
                        >
                            <Send size={18} />
                        </button>
                    </form>
                    <div className="mt-2 text-[10px] text-center text-stone-400 italic">
                        Responses are generated by AI. For urgent help, please use WhatsApp.
                    </div>
                </div>
            </div>

            {/* Launcher Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? "Close chat" : "Open chat assistant"}
                aria-expanded={isOpen}
                className={`
                    flex items-center justify-center
                    w-14 h-14 rounded-full shadow-lg 
                    bg-[#8B5E3C] hover:bg-[#6F4E37] active:bg-[#5D4037]
                    text-white transition-all duration-300 transform hover:scale-105 active:scale-95
                    focus:outline-none focus:ring-4 focus:ring-[#8B5E3C]/30
                    ${isOpen ? 'rotate-90' : 'rotate-0'}
                `}
            >
                {isOpen ? <ChevronDown size={28} /> : <MessageSquare size={28} className="fill-current" />}
            </button>
        </div>
    );
}

export { ChatBot };
