"use client";

import React, { useState } from 'react';
import { ChatMessage as ChatMessageType } from '../lib/types';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { generateZaneResponse } from '../lib/claude';
import { musicNerdApi } from '../lib/api';

export default function Chat() {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSend = async (content: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log('Processing user input:', content);
      // Add user message
      const userMessage: ChatMessageType = { role: 'user', content };
      setMessages(prev => [...prev, userMessage]);

      // Try to extract artist information from various sources
      let artistContext = '';
      let verifiedInfo = null;

      // First, try to extract artist name from the query
      const artistNameMatch = content.match(/(?:about|who is|tell me about|info on)\s+([^?.,!]+)/i);
      if (artistNameMatch) {
        const artistName = artistNameMatch[1].trim();
        console.log('Searching for artist:', artistName);
        verifiedInfo = await musicNerdApi.searchArtist(artistName);
        console.log('Artist search result:', verifiedInfo);
      }

      // If no artist found by name, check for MusicNerd URL
      if (!verifiedInfo && content.includes('musicnerd.xyz/artist/')) {
        const musicNerdMatch = content.match(/musicnerd\.xyz\/artist\/([a-f0-9-]+)/i);
        if (musicNerdMatch) {
          console.log('Found MusicNerd UUID in content');
          const uuid = musicNerdMatch[1];
          console.log('Attempting to fetch artist with UUID:', uuid);
          verifiedInfo = await musicNerdApi.findArtistByUUID(uuid);
          console.log('UUID lookup result:', verifiedInfo);
        }
      }

      // Check for Spotify ID as fallback
      if (!verifiedInfo && content.includes('spotify:artist:')) {
        console.log('Found Spotify ID in content');
        const spotifyId = content.match(/spotify:artist:([a-zA-Z0-9]+)/)?.[1];
        if (spotifyId) {
          console.log('Attempting to fetch artist with Spotify ID:', spotifyId);
          verifiedInfo = await musicNerdApi.findArtistBySpotifyID(spotifyId);
          console.log('Spotify ID lookup result:', verifiedInfo);
        }
      }

      // If we found verified info, add it to the context
      if (verifiedInfo) {
        console.log('Found verified info:', verifiedInfo);
        artistContext = JSON.stringify({
          source: 'MusicNerd API',
          verifiedData: true,
          artist: {
            name: verifiedInfo.name || 'Unknown',
            biography: verifiedInfo.bio || 'No biography available',
            genres: verifiedInfo.genres || [],
            discography: verifiedInfo.releases?.map(release => ({
              title: release.title,
              year: release.year,
              type: release.type
            })) || []
          },
          confidence: 'high',
          source_url: `https://www.musicnerd.xyz/artist/${verifiedInfo.id}`
        });
      } else {
        console.log('No verified info found');
        artistContext = ''; // Clear context if no verified info found
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
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
      // Add error message
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "I apologize, but I'm having trouble responding right now. Please check the console for more details."
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-container flex flex-col h-[80vh] border rounded-lg shadow-sm">
      {error && (
        <div className="p-4 bg-red-50 text-red-600 border-b">
          Error: {error}
        </div>
      )}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <ChatMessage key={index} message={message} />
        ))}
      </div>
      <ChatInput onSend={handleSend} isLoading={isLoading} />
    </div>
  );
} 