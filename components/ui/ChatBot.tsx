import React, { useState, useEffect, useRef } from 'react';
import { Send, PawPrint, X, RefreshCcw, MessageCircle, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatMessage from './ChatMessage';
import QuickActions from './QuickActions';
import { sendMessageToGemini, resetChat } from '../../services/geminiService';
import { getInstantReply, getFallbackReply } from '../../services/smartReply';
import {
  getStepQuestion,
  getStepOptions,
  processStep,
  INITIAL_FLOW,
  FlowState,
} from '../../services/bookingFlow';
import { Message, ChatState } from '../../types/chat';
import { QUICK_ACTIONS } from '../../constants';

const WHATSAPP_BTN = '[💬 WhatsApp Us](https://wa.me/60173840723?text=Hi%20My%20Pawcation!%20I%20have%20a%20question)';

/** Quick-action that triggers the booking flow */
const BOOK_NOW_ACTION = { label: '🐾 Book Now', query: '__START_BOOKING__' };

/** Custom quick actions: Book Now + existing ones */
const ALL_ACTIONS = [
  BOOK_NOW_ACTION,
  ...QUICK_ACTIONS,
];

function ChatBot() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 'welcome',
            role: 'model',
            content: `Hi there! 🐾 I'm the AI assistant for **My Pawcation**. I can help you with boarding rates, booking info, and answering questions about our cage-free home-style care.\n\nTap **🐾 Book Now** and I'll walk you through a quick booking form — when you're done, I'll send all the details to us on WhatsApp!`,
            timestamp: new Date()
        }
    ]);
    const [inputText, setInputText] = useState('');
    const [chatState, setChatState] = useState<ChatState>(ChatState.IDLE);
    const [isOpen, setIsOpen] = useState(false);

    // ── Booking Flow State ──
    const [flowState, setFlowState] = useState<FlowState | null>(null);
    const [isInFlow, setIsInFlow] = useState(false);

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

    /** Add a bot message to the chat */
    const addBotMessage = (content: string) => {
        const botMsg: Message = {
            id: Date.now().toString(),
            role: 'model',
            content,
            timestamp: new Date()
        };
        setMessages(prev => [...prev, botMsg]);
    };

    /** Start the guided booking flow */
    const startBookingFlow = () => {
        setIsInFlow(true);
        const initial = { ...INITIAL_FLOW, started: true };
        setFlowState(initial);
        addBotMessage(getStepQuestion(initial));
    };

    /** Handle input within the booking flow */
    const handleFlowInput = (text: string) => {
        if (!flowState) return;

        const result = processStep(text, flowState);
        setFlowState(result.nextState);

        if (result.reply) {
            addBotMessage(result.reply);
        }

        if (result.complete) {
            // Booking flow is done
            setIsInFlow(false);
            setFlowState(null);
        } else {
            // Ask next question
            const nextQuestion = getStepQuestion(result.nextState);
            setTimeout(() => {
                addBotMessage(nextQuestion);
            }, 250);
        }
    };

    /**
     * Main message handler.
     * Priority: Booking Flow > Smart Local Match > Gemini > Fallback
     */
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

        // ── PRIORITY 1: Booking flow trigger ──
        if (text === '__START_BOOKING__') {
            startBookingFlow();
            return;
        }

        // ── PRIORITY 2: Active booking flow ──
        if (isInFlow && flowState) {
            handleFlowInput(text);
            return;
        }

        // ── PRIORITY 3: Detect "I want to book" intent and start flow ──
        const lowerText = text.toLowerCase();
        const bookingIntents = [
            'book now', 'i want to book', 'make a booking', 'reserve',
            'booking', 'book a slot', 'i\'d like to book', 'can i book',
            'nak book', 'nak tempah', 'boleh book', 'mau booking',
        ];
        if (bookingIntents.some(intent => lowerText.includes(intent)) && !lowerText.includes('how') && !lowerText.includes('way')) {
            startBookingFlow();
            return;
        }

        // ── PRIORITY 4: Instant smart reply ──
        const instant = getInstantReply(text);

        if (instant) {
            const botMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: 'model',
                content: instant.reply,
                timestamp: new Date()
            };
            setMessages(prev => [...prev, botMsg]);
            setChatState(ChatState.IDLE);
            return;
        }

        // ── PRIORITY 5: Gemini for complex questions ──
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
            console.error('Gemini error:', error);
            const isKeyError = error?.message?.includes('API key') || error?.message?.includes('400');
            let friendlyMsg: string;
            if (isKeyError) {
                friendlyMsg = getFallbackReply(text);
            } else {
                friendlyMsg = `⚠️ Oops, I'm having a moment! But don't worry — our team is just a tap away. 🐾\n\n${WHATSAPP_BTN}`;
            }
            setMessages(prev => prev.map(msg =>
                msg.id === botMessageId ? { ...msg, content: friendlyMsg } : msg
            ));
            setChatState(ChatState.ERROR);
        }
    };

    const handleReset = () => {
        setMessages([messages[0]]);
        setIsInFlow(false);
        setFlowState(null);
        resetChat();
        setTimeout(() => inputRef.current?.focus(), 100);
    };

    /** Get quick actions — show flow options when in a booking flow */
    const currentActions = isInFlow && flowState
        ? getStepOptions(flowState).map(opt => ({ label: opt, query: opt }))
        : ALL_ACTIONS;

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
                                <div>
                                    <h2 className="font-bold text-sm">My Pawcation</h2>
                                    <p className="text-[10px] text-white/70 flex items-center gap-1">
                                        <Zap size={10} />
                                        {isInFlow ? '📋 Booking form' : 'Instant smart replies'}
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-1">
                                <button onClick={handleReset} className="p-2 hover:bg-white/10 rounded-full" title="Reset chat"><RefreshCcw size={16} /></button>
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
                            <QuickActions actions={currentActions} onActionClick={handleSendMessage} disabled={chatState !== ChatState.IDLE} />
                            <div className="relative mt-2">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={inputText}
                                    onChange={(e) => setInputText(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                                    placeholder={isInFlow ? 'Type your answer...' : 'Ask me anything or tap 🐾 Book Now'}
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
