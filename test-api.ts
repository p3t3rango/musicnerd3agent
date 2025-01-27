const axios = require('axios');
import { AxiosError } from 'axios';

async function testMusicNerdAPI() {
  const BASE_URL = 'https://musicnerd.xyz/api/v1';  // Add API version
  const artistId = '2d9392e6-f247-4bdc-bd37-e9d438db5a61'; // Mark de Clive-Lowe's ID

  console.log(`Testing fetch for artist ID: ${artistId}`);

  try {
    // Get artist details directly with UUID
    const detailsResponse = await axios.get(`${BASE_URL}/artists/${artistId}`);
    console.log('\nArtist Details:', JSON.stringify(detailsResponse.data, null, 2));

  } catch (error) {
    if (error instanceof AxiosError) {
      console.error('Error:', {
        message: error.message,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data
      });
    } else {
      console.error('Unknown error:', error);
    }
  }
}

testMusicNerdAPI(); 