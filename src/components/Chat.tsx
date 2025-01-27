import React, { useState } from 'react';
import { ChatMessage as ChatMessageType } from '../lib/types';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { generateZaneResponse } from '../lib/claude';
import { musicNerdApi } from '../lib/api';

export default function Chat() {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (content: string) => {
    setIsLoading(true);
    
    try {
      // Add user message
      const userMessage: ChatMessageType = { role: 'user', content };
      setMessages(prev => [...prev, userMessage]);

      // Try to extract artist information if possible
      let artistContext = '';
      if (content.includes('spotify:artist:')) {
        const spotifyId = content.match(/spotify:artist:([a-zA-Z0-9]+)/)?.[1];
        if (spotifyId) {
          const artist = await musicNerdApi.findArtistBySpotifyID(spotifyId);
          artistContext = JSON.stringify(artist);
        }
      }

      // Generate Zane's response
      const response = await generateZaneResponse(
        messages.concat(userMessage),
        artistContext
      );

      // Add assistant message
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (error) {
      console.error('Error handling message:', error);
      // Add error message
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "I apologize, but I'm having trouble responding right now. Please try again."
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <ChatMessage key={index} message={message} />
        ))}
      </div>
      <ChatInput onSend={handleSend} isLoading={isLoading} />
    </div>
  );
} 