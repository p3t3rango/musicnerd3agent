import React from 'react';
import { ChatMessage as ChatMessageType } from '../lib/types';

interface Props {
  message: ChatMessageType;
}

export default function ChatMessage({ message }: Props) {
  return (
    <div className={`p-4 rounded-lg ${message.role === 'assistant' ? 'bg-gray-100' : 'bg-white'}`}>
      <div className="font-bold mb-2 text-gray-700">
        {message.role === 'assistant' ? 'Zane' : 'You'}
      </div>
      <div className="text-gray-800 leading-relaxed">{message.content}</div>
    </div>
  );
} 