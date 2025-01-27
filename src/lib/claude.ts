import Anthropic from '@anthropic-ai/sdk';
import { ZANE_SYSTEM_PROMPT } from '../utils/prompts';

const anthropic = new Anthropic({
  apiKey: process.env.NEXT_PUBLIC_CLAUDE_API_KEY || ''
});

export async function generateZaneResponse(
  messages: { role: string; content: string }[],
  artistContext?: string
) {
  try {
    if (!process.env.NEXT_PUBLIC_CLAUDE_API_KEY) {
      throw new Error('Claude API key is not configured');
    }

    console.log('Generating response with context:', { messages, artistContext }); // Debug log

    const response = await anthropic.messages.create({
      model: 'claude-3-sonnet-20240229',
      max_tokens: 1000,
      temperature: 0.7,
      system: ZANE_SYSTEM_PROMPT,
      messages: [
        ...messages.map(msg => ({
          role: msg.role === 'user' ? 'user' : 'assistant',
          content: msg.content
        })),
        artistContext ? {
          role: 'assistant' as const,
          content: `Additional context about the artist: ${artistContext}`
        } : null
      ].filter(Boolean) as any[]
    });

    console.log('Claude response:', response); // Debug log
    return response.content[0].text;

  } catch (error) {
    console.error('Error in generateZaneResponse:', error);
    if (error instanceof Error) {
      return `I apologize, but I'm having trouble responding right now. Error: ${error.message}`;
    }
    return "I apologize, but I'm having trouble responding right now. Please try again.";
  }
} 