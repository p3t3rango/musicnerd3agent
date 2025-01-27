import React from 'react';
import { ChatMessage as ChatMessageType } from '../lib/types';

interface Props {
  message: ChatMessageType;
}

export default function ChatMessage({ message }: Props) {
  return (
    <div className={`p-4 ${message.role === 'assistant' ? 'bg-gray-100' : ''}`}>
      <div className="font-bold mb-2">
        {message.role === 'assistant' ? 'Zane' : 'You'}
      </div>
      <div className="text-gray-800">{message.content}</div>
    </div>
  );
} 