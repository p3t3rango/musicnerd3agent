export async function getAccessToken() {
    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: 'Basic ' + Buffer.from(process.env.SPOTIFY_CLIENT_ID +':' +process.env.SPOTIFY_CLIENT_SECRET).toString('base64'),
        },
        body: 'grant_type=client_credentials',
    })
    const data = await response.json()
    console.log('Access Token:', data.access_token);
    return data.access_token
}

export async function searchSpotify(query: string, token: string) {
    const response = await fetch(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(
            query
        )}&type=artist&market=US`,
        {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    )
    const data = await response.json()
    return data
}