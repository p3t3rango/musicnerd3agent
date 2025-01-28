import axios from 'axios';

let spotifyToken: string | null = null;
let tokenExpiry: number = 0;

async function getSpotifyToken() {
  if (spotifyToken && Date.now() < tokenExpiry) {
    return spotifyToken;
  }

  try {
    const response = await axios.post('https://accounts.spotify.com/api/token', 
      new URLSearchParams({
        'grant_type': 'client_credentials'
      }), {
      headers: {
        'Authorization': `Basic ${Buffer.from(
          `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
        ).toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    spotifyToken = response.data.access_token;
    tokenExpiry = Date.now() + (response.data.expires_in * 1000);
    return spotifyToken;
  } catch (error) {
    console.error('Error getting Spotify token:', error);
    throw error;
  }
}

export async function searchSpotifyArtist(query: string) {
  try {
    const token = await getSpotifyToken();
    const response = await axios.get('https://api.spotify.com/v1/search', {
      params: {
        q: query,
        type: 'artist',
        limit: 1
      },
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.data.artists.items.length > 0) {
      return response.data.artists.items[0].id;
    }
    return null;
  } catch (error) {
    console.error('Error searching Spotify:', error);
    return null;
  }
} 