const express = require('express');

const City = require('../db/models/City');
const geocode = require('../utils/geocode.service');
const forecast = require('../utils/forecast.service');

const router = new express.Router;

router.get('/city/:cityName', async (req, res) => {

    try {
        const cityName = req.params.cityName.toLowerCase();
        const { coordinates, placeName } = await geocode(cityName);
        const { temp, feelsLike, weatherDescription, weatherIcon } = await forecast(coordinates);

        const city = {
            name: placeName,
            temperature: temp,
            feelsLike: feelsLike,
            condition: weatherDescription,
            conditionPic: weatherIcon,
            searchQuery: cityName
        }

        return res.send(city)
    } catch (error) {
        return res.status(500).send({
            error: error.message
        });
    }
})

router.get('/cities', async (req, res) => {
    try {
        const cities = await City.find({});

        res.send(cities);
    } catch (error) {
        return res.status(500).send({
            error: error.message
        })
    }
})

router.post('/city', async (req, res) => {
    try {
        const city = new City(req.body);

        await city.save();
        return res.status(201).send(city)

    } catch (error) {
        return res.status(500).send({
            error: error.message
        })
    }
})

router.delete('/city/:cityName', async (req, res) => {
    try {
        const cityName = req.params.cityName.toLowerCase();
        const filter = { searchQuery: cityName };

        const deletedCityDoc = await City.findOneAndDelete(filter);

        if (!deletedCityDoc) {
            throw new Error('City not found!');
        }

        return res.send(deletedCityDoc);

    } catch (error) {
        return res.status(500).send({
            error: error.message
        })
    }
})

module.exports = router;