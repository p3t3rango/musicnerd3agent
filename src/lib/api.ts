import axios from 'axios';
import { MusicNerdResponse } from './types';

const BASE_URL = 'https://api.musicnerd.xyz/api';

export const musicNerdApi = {
  async findArtistBySpotifyID(spotifyId: string) {
    try {
      const response = await axios.post<MusicNerdResponse>(`${BASE_URL}/findArtistBySpotifyID`, {
        spotifyID: spotifyId
      });
      return response.data.result;
    } catch (error) {
      console.error('Error finding artist:', error);
      throw error;
    }
  },

  async findTwitterHandle(query: { name?: string; ethAddress?: string }) {
    try {
      const response = await axios.post<MusicNerdResponse>(`${BASE_URL}/findTwitterHandle`, query);
      return response.data.result;
    } catch (error) {
      console.error('Error finding Twitter handle:', error);
      throw error;
    }
  }
}; 