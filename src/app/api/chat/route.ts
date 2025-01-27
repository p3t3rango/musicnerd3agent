import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { ZANE_SYSTEM_PROMPT } from '../../../utils/prompts';

const anthropic = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY
});

export async function POST(req: Request) {
  try {
    const { messages, artistContext } = await req.json();

    const response = await anthropic.messages.create({
      model: 'claude-3-sonnet-20240229',
      max_tokens: 1000,
      temperature: 0.7,
      system: `${ZANE_SYSTEM_PROMPT}

IMPORTANT: When discussing artists, prioritize information from the MusicNerd API (marked as "verifiedData: true") over other sources. If verified data is available, base your response primarily on that information. Only provide additional context when it directly relates to the verified information. If no verified data is available, clearly indicate that you're speaking from general knowledge.

When no verified data is found:
1. Acknowledge that you don't have verified information
2. Ask for more specific details that could help identify the artist (like Spotify ID or full name)
3. If the user provides a partial name or unclear reference, ask for clarification
4. Suggest using Spotify IDs for more accurate information`,
      messages: [
        ...messages.map((msg: any) => ({
          role: msg.role === 'user' ? 'user' : 'assistant',
          content: msg.content
        })),
        artistContext ? {
          role: 'assistant',
          content: `Verified artist information from MusicNerd: ${artistContext}`
        } : null
      ].filter(Boolean)
    });

    return NextResponse.json({ content: response.content[0].text });
  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json(
      { error: 'Failed to generate response' },
      { status: 500 }
    );
  }
} 