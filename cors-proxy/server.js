const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = 3000; // You can change the port if needed

// Enable CORS for all routes
app.use(cors());

// Proxy endpoint
app.get('/proxy', async (req, res) => {
    const url = req.query.url; // Get the URL from the query parameters
    if (!url) {
        return res.status(400).send('URL is required');
    }

    try {
        const response = await axios.get(url, {
            headers: {
                'Access-Control-Allow-Origin': '*', // Allow all origins
            },
        });
        res.set('Access-Control-Allow-Origin', '*'); // Set CORS headers
        res.send(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching the URL');
    }
});

app.listen(PORT, () => {
    console.log(`CORS Proxy running at http://localhost:${PORT}`);
});