import React, { useState, useEffect } from 'react';
import { Calendar, CreditCard, ShieldCheck } from 'lucide-react';

interface QuickAction {
    label: string;
    query: string;
}

interface QuickActionsProps {
    onActionClick: (query: string) => void;
    disabled?: boolean;
}

const quickActions: QuickAction[] = [
    { label: 'Booking', query: 'How do I book?' },
    { label: 'Pricing', query: 'What are your rates?' },
    { label: 'Rules', query: 'What are the rules regarding vaccines and male dogs?' },
    { label: 'Routine', query: 'What is the daily routine for dogs?' },
];

const QuickActions: React.FC<QuickActionsProps> = ({ onActionClick, disabled = false }) => {
    return (
        <div className="flex gap-2 overflow-x-auto pb-2 px-3 snap-x scrollbar-hide">
            {quickActions.map((action, index) => (
                <button
                    key={index}
                    onClick={() => onActionClick(action.query)}
                    disabled={disabled}
                    className="shrink-0 snap-start bg-stone-100 text-stone-600 text-[11px] font-medium px-3 py-1.5 rounded-full border border-stone-200/50 hover:bg-[#8B5E3C] hover:text-white hover:border-[#8B5E3C] transition-colors focus:ring-2 focus:ring-[#8B5E3C]/20 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
                    aria-label={`Ask about ${action.label}`}
                >
                    {action.label}
                </button>
            ))}
        </div>
    );
};

export default QuickActions;
