// Not implemented yet

const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = 3000;

let cachedVideoIds = null;
let cacheExpiryTime = null;
const CACHE_DURATION = 3600000; // 1 hour in milliseconds

async function fetchVideoIdsFromYoutube() {
    try {
        const response = await fetch('https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&playlistId=YOUR_PLAYLIST_ID&maxResults=50&key=YOUR_API_KEY');
        
        if (!response.ok) {
            throw new Error('Failed to fetch from YouTube API');
        }
        
        const data = await response.json();
        return data.items.map(item => item.contentDetails.videoId);
    } catch (error) {
        console.error('Error fetching video IDs:', error);
        throw error;
    }
}

app.get('/getVideoIds', async (req, res) => {
    // Check if cache has expired
    const currentTime = Date.now();
    if (!cachedVideoIds || !cacheExpiryTime || currentTime > cacheExpiryTime) {
        try {
            cachedVideoIds = await fetchVideoIdsFromYoutube();
            cacheExpiryTime = currentTime + CACHE_DURATION;
        } catch (error) {
            return res.status(500).json({ error: 'Failed to fetch video IDs' });
        }
    }
    
    res.json({ videoIds: cachedVideoIds });
});

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
