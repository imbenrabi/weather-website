const axios = require('axios');
const mapobxLimit = 1;
const mapboxType = 'place';
const mapboxEndpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places`

const geocode = async (location) => {
    const url = `${mapboxEndpoint}/${encodeURIComponent(location)}.json?types=${mapboxType}&access_token=${process.env.MAPBOX_API_KEY}&limit=${mapobxLimit}`;
    const resp = await axios.default.get(url, { validateStatus: _ => true });
    const body = resp.data;
    if ((resp.status < 200 || resp.status > 299) || body.message || body.features.length === 0) {
        throw new Error(`unable to find location... ( reaponse status code: ${response.statusCode} )`);
    }
    return {
        placeName: body.features[0].place_name,
        coordinates: body.features[0].center
    };
}

module.exports = geocode;