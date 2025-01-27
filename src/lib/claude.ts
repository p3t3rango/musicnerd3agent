export async function generateZaneResponse(
  messages: { role: string; content: string }[],
  artistContext?: string
) {
  try {
    console.log('Generating response with context:', { messages, artistContext });

    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages,
        artistContext
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to get response from API');
    }

    const data = await response.json();
    if (data.error) {
      throw new Error(data.error);
    }

    console.log('Claude response:', data);
    return data.content;

  } catch (error) {
    console.error('Error in generateZaneResponse:', error);
    if (error instanceof Error) {
      return `I apologize, but I'm having trouble responding right now. Error: ${error.message}`;
    }
    return "I apologize, but I'm having trouble responding right now. Please try again.";
  }
} 