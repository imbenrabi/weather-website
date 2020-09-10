const axios = require('axios');
const weatherstackEndpoint = 'http://api.weatherstack.com/current';

const forecast = async (coordinates) => {
    const url = `${weatherstackEndpoint}?access_key=${process.env.WEATHERSTACK_API_KEY}&query=${coordinates[1]},${coordinates[0]}`;
    const resp = await axios.default.get(url, { validateStatus: _ => true });
    const body = resp.data;
    if ((resp.status < 200 || resp.status > 299) || body.error) {
        throw new Error(`unable to find location... ( reaponse status code: ${response.statusCode} )`);
    }
    return {
        weatherDescription: body.current.weather_descriptions[0],
        temp: body.current.temperature,
        humidity: body.current.humidity,
        feelsLike: body.current.feelslike,
        rainChance: body.current.precip,
        uvIndex: body.current.uv_index,
        weatherIcon: body.current.weather_icons[0]
    };
}

module.exports = forecast;