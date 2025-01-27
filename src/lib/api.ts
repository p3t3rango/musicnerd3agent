import axios from 'axios';
import { MusicNerdResponse, Artist } from './types';

const BASE_URL = 'https://ng-staging.musicnerd.xyz';

export const musicNerdApi = {
  async findArtistBySpotifyID(spotifyId: string): Promise<Artist | null> {
    try {
      console.log('Fetching artist by Spotify ID:', spotifyId);
      const response = await axios.post<MusicNerdResponse>(`${BASE_URL}/findArtistBySpotifyID`, {
        spotifyID: spotifyId
      });
      console.log('API Response:', response.data);
      return response.data.result;
    } catch (error) {
      console.error('Error finding artist by Spotify ID:', error.response?.data || error.message);
      return null;
    }
  },

  async findArtistByName(name: string): Promise<string | null> {
    try {
      console.log('Fetching artist by name:', name);
      const response = await axios.post<MusicNerdResponse>(`${BASE_URL}/findTwitterHandle`, {
        name: name
      });
      console.log('API Response:', response.data);
      return response.data.result;
    } catch (error) {
      console.error('Error finding artist by name:', error.response?.data || error.message);
      return null;
    }
  },

  async findArtistByEthAddress(ethAddress: string): Promise<string | null> {
    try {
      console.log('Fetching artist by ETH address:', ethAddress);
      const response = await axios.post<MusicNerdResponse>(`${BASE_URL}/findTwitterHandle`, {
        ethAddress: ethAddress
      });
      console.log('API Response:', response.data);
      return response.data.result;
    } catch (error) {
      console.error('Error finding artist by ETH address:', error.response?.data || error.message);
      return null;
    }
  }
}; 