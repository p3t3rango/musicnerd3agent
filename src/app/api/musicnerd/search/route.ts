import { NextResponse } from 'next/server';
import { musicNerdApi } from '../../../../lib/api';


export async function POST(req: Request) {
  try {
    const { spotify_id } = await req.json();

    const artist = await musicNerdApi.findArtistBySpotifyID(spotify_id);
    console.log('Artist:', artist);

    return NextResponse.json({ artist });

  } catch (error) {
    
    console.error('Error in chat API:', error);
    
    return NextResponse.json(
      { error: 'Failed to generate response' },
      { status: 500 }
    );
  }
} 