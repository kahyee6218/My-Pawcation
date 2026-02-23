import React from 'react';

export interface Message {
    id: string;
    role: 'user' | 'model';
    content: string;
    timestamp: Date;
}

export interface QuickAction {
    label: string;
    query: string;
    icon?: React.ReactNode;
}

export enum ChatState {
    IDLE,
    LOADING,
    STREAMING,
    ERROR
}
