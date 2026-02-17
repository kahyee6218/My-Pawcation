import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Message } from './chatTypes';
import { User, Copy, ThumbsUp, ThumbsDown } from 'lucide-react';
import { PawPrint } from 'lucide-react';

interface ChatMessageProps {
    message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
    const isUser = message.role === 'user';
    const timeString = message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
        <div className={`flex w-full mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex max-w-[85%] ${isUser ? 'flex-row-reverse' : 'flex-row'} gap-2 group`}>

                {/* Avatar */}
                <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center shadow-sm 
          ${isUser ? 'bg-stone-200 text-stone-600' : 'bg-[#8B5E3C] text-white'}`}>
                    {isUser ? <User size={16} /> : <PawPrint size={16} />}
                </div>

                {/* Message Bubble */}
                <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
                    <div
                        className={`
              px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm break-words relative
              ${isUser
                                ? 'bg-[#8B5E3C] text-white rounded-tr-none'
                                : 'bg-white text-stone-800 border border-stone-200 rounded-tl-none'}
            `}
                    >
                        {isUser ? (
                            <p>{message.content}</p>
                        ) : (
                            <div className="prose prose-sm prose-stone max-w-none">
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                    {message.content}
                                </ReactMarkdown>
                            </div>
                        )}
                    </div>

                    {/* Timestamp & Actions */}
                    <div className="flex items-center gap-2 mt-1 px-1">
                        <span className="text-[10px] text-stone-400 font-medium">
                            {timeString}
                        </span>
                        {!isUser && (
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                                {/* Future: Add copy/feedback actions */}
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ChatMessage;
