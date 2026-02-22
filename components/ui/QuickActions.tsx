import React from 'react';
import { QuickAction } from '../../types/chat';

interface QuickActionsProps {
    actions: QuickAction[];
    onActionClick: (query: string) => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({ actions, onActionClick }) => {
    return (
        <div className="flex flex-wrap gap-2 py-2">
            {actions.map((action, index) => (
                <button
                    key={index}
                    onClick={() => onActionClick(action.query)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-stone-200 rounded-full text-xs font-medium text-stone-600 hover:bg-[#8B5E3C] hover:text-white hover:border-[#8B5E3C] transition-all shadow-sm active:scale-95"
                >
                    {action.icon}
                    {action.label}
                </button>
            ))}
        </div>
    );
};

export default QuickActions;
