import axios, { AxiosError } from 'axios';
import { MusicNerdResponse, Artist } from './types';

const BASE_URL = 'https://ng-staging.musicnerd.xyz';

export const musicNerdApi = {
  async searchArtist(name: string): Promise<Artist | null> {
    try {
      console.log('Searching for artist:', name);
      // First try to search for the artist
      const response = await axios.post<MusicNerdResponse>(`${BASE_URL}/api/search`, {
        query: name
      });
      console.log('Search Response:', response.data);

      if (response.data.result && response.data.result.length > 0) {
        // If we found a match, get their full details
        const artistId = response.data.result[0].id;
        return this.findArtistByUUID(artistId);
      }
      return null;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error('Error searching artist:', error.response?.data || error.message);
      } else {
        console.error('Error searching artist:', error);
      }
      return null;
    }
  },

  async findArtistBySpotifyID(spotifyId: string): Promise<Artist | null> {
    try {
      console.log('Fetching artist by Spotify ID:', spotifyId);
      const response = await axios.post<MusicNerdResponse>(`${BASE_URL}/findArtistBySpotifyID`, {
        spotifyID: spotifyId
      });
      console.log('API Response:', response.data);
      return response.data.result;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error('Error finding artist by Spotify ID:', error.response?.data || error.message);
      } else {
        console.error('Error finding artist by Spotify ID:', error);
      }
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
      if (error instanceof AxiosError) {
        console.error('Error finding artist by name:', error.response?.data || error.message);
      } else {
        console.error('Error finding artist by name:', error);
      }
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
      if (error instanceof AxiosError) {
        console.error('Error finding artist by ETH address:', error.response?.data || error.message);
      } else {
        console.error('Error finding artist by ETH address:', error);
      }
      return null;
    }
  },

  async findArtistByUUID(uuid: string): Promise<Artist | null> {
    try {
      console.log('Fetching artist by UUID:', uuid);
      const response = await axios.get<MusicNerdResponse>(`${BASE_URL}/artist/${uuid}`);
      console.log('API Response:', response.data);
      return response.data.result;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error('Error finding artist by UUID:', error.response?.data || error.message);
      } else {
        console.error('Error finding artist by UUID:', error);
      }
      return null;
    }
  }
}; 