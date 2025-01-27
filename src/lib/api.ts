import axios from 'axios';
import { MusicNerdResponse, Artist } from './types';

const BASE_URL = 'https://api.musicnerd.xyz/api';

export const musicNerdApi = {
  async findArtistBySpotifyID(spotifyId: string): Promise<Artist | null> {
    try {
      const response = await axios.post<MusicNerdResponse>(`${BASE_URL}/findArtistBySpotifyID`, {
        spotifyID: spotifyId
      });
      return response.data.result;
    } catch (error) {
      console.error('Error finding artist:', error);
      return null;
    }
  },

  async findArtistByName(name: string): Promise<string | null> {
    try {
      const response = await axios.post<MusicNerdResponse>(`${BASE_URL}/findTwitterHandle`, {
        name: name
      });
      return response.data.result;
    } catch (error) {
      console.error('Error finding Twitter handle:', error);
      return null;
    }
  },

  async findArtistByEthAddress(ethAddress: string): Promise<string | null> {
    try {
      const response = await axios.post<MusicNerdResponse>(`${BASE_URL}/findTwitterHandle`, {
        ethAddress: ethAddress
      });
      return response.data.result;
    } catch (error) {
      console.error('Error finding Twitter handle:', error);
      return null;
    }
  }
}; 