export default async function handler(req, res) {
    // Extract the 'pair' query parameter from the request
    const { pair = 'btc/usd' } = req.query; // Default to 'btc/usd' if not specified

    const apiUrl = `https://api.dev.pragma.build/node/v1/aggregation/candlestick/${pair}?interval=1min`;
    console.log(`Fetching data from ${apiUrl}`);

    try {
        const apiResponse = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'x-api-key': process.env.API_KEY, // Securely manage your API key
            },
        });

        if (apiResponse.ok) {
            const data = await apiResponse.json();
            res.status(200).json(data);
        } else {
            // Handle errors from the external API
            res.status(apiResponse.status).json({ error: "Failed to fetch data from external API" });
        }
    } catch (error) {
        console.error('Error fetching external API:', error);
        res.status(500).json({ error: "Internal server error" });
    }
}
