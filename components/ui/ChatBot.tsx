import React, { useState } from 'react';
import { MessageCircle, X, ChevronDown } from 'lucide-react';

function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);

    /**
     * My Pawcation AI Chat App URL
     * GitHub Source: https://github.com/kahyee6218/Web-Chat
     */
    const BOT_URL = "https://ais-pre-bksg2jndx3utew45ysu2va-26445144781.asia-east1.run.app";

    return (
        <div className="fixed bottom-4 right-4 z-[9999] flex flex-col items-end gap-4 pointer-events-auto font-sans">

            {/* Chat Window Container */}
            <div
                id="chat-window"
                role="dialog"
                aria-label="My Pawcation AI Chat Assistant"
                className={`
                    transition-all duration-300 ease-in-out transform origin-bottom-right
                    bg-white rounded-2xl shadow-2xl overflow-hidden border border-stone-200
                    flex flex-col
                    ${isOpen ? 'scale-100 opacity-100 translate-y-0 visible' : 'scale-95 opacity-0 translate-y-10 invisible pointer-events-none'}
                `}
                style={{
                    width: 'min(400px, calc(100vw - 32px))',
                    height: 'min(700px, calc(100vh - 100px))',
                }}
            >
                {/* Header for Close Control */}
                <div className="absolute top-2 right-2 z-10">
                    <button
                        onClick={() => setIsOpen(false)}
                        className="bg-black/10 hover:bg-black/20 p-1.5 rounded-full transition-colors text-stone-600 focus:outline-none"
                        title="Close Chat"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* The new Chat Bot Iframe */}
                {isOpen && (
                    <iframe
                        src={BOT_URL}
                        title="My Pawcation AI Assistant"
                        className="w-full h-full border-none"
                        allow="clipboard-write; microphone"
                    />
                )}
            </div>

            {/* Launcher Button - Brown Theme */}
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
                {isOpen ? <ChevronDown size={28} /> : <MessageCircle size={28} className="fill-current" />}
            </button>
        </div>
    );
}

export { ChatBot };
