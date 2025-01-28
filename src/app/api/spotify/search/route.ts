import { NextResponse } from 'next/server';
import { getAccessToken, searchSpotify } from '../../../../lib/spotify';


export async function POST(req: Request) {
  try {
    const { query } = await req.json();

    const accessToken = await getAccessToken();
    const searchResults = await searchSpotify(query, accessToken);
    const artist = searchResults.artists.items[0];

    return NextResponse.json({ artist });

  } catch (error) {
    
    console.error('Error in chat API:', error);
    
    return NextResponse.json(
      { error: 'Failed to generate response' },
      { status: 500 }
    );
  }
} 