import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Message } from '../../types/chat';
import { Bot, User } from 'lucide-react';
import React from 'react';

const ChatMessage: React.FC<{ message: Message }> = ({ message }) => {
    const isBot = message.role === 'model';

    return (
        <div className={`flex w-full ${isBot ? 'justify-start' : 'justify-end'}`}>
            <div className={`flex max-w-[90%] ${isBot ? 'flex-row' : 'flex-row-reverse'} gap-2`}>
                <motion.div
                    animate={isBot ? { y: [0, -2, 0] } : {}}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-1 ${isBot ? 'bg-[#8B5E3C] text-white' : 'bg-stone-200 text-stone-600'}`}
                >
                    {isBot ? <Bot size={14} /> : <User size={14} />}
                </motion.div>

                <motion.div
                    animate={isBot ? { y: [0, -3, 0] } : {}}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                    className={`px-3 py-2 rounded-2xl shadow-sm text-sm ${isBot ? 'bg-white text-stone-800 rounded-tl-none border border-stone-100' : 'bg-[#8B5E3C] text-white rounded-tr-none'}`}
                >
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.content}</ReactMarkdown>
                    <span className="text-[9px] block mt-1 opacity-70">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                </motion.div>
            </div>
        </div>
    );
};

export default ChatMessage;
