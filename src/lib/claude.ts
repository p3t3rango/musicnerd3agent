import Anthropic from '@anthropic-ai/sdk';
import { ZANE_SYSTEM_PROMPT } from '../utils/prompts';

const anthropic = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY!
});

export async function generateZaneResponse(
  messages: { role: string; content: string }[],
  artistContext?: string
) {
  try {
    const response = await anthropic.messages.create({
      model: 'claude-3-sonnet-20240229',
      max_tokens: 1000,
      temperature: 0.7,
      system: ZANE_SYSTEM_PROMPT,
      messages: [
        ...messages,
        artistContext ? {
          role: 'assistant',
          content: `Additional context about the artist: ${artistContext}`
        } : null
      ].filter(Boolean) as any[]
    });

    return response.content[0].text;
  } catch (error) {
    console.error('Error generating response:', error);
    throw error;
  }
} 