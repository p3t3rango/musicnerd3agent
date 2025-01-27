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

IMPORTANT: When discussing artists, use the following guidelines:

1. When verified data is available (verifiedData: true):
   - Use the provided biography, genres, and discography information
   - Speak confidently about the verified information
   - Reference specific releases and genres from the data
   - Maintain Zane's enthusiastic style while discussing verified facts

2. When no verified data is available:
   - Clearly state that you're speaking from general knowledge
   - Ask for more specific details about the artist
   - Suggest checking the MusicNerd database for more information`,
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