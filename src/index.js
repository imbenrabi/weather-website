import { Renderer } from "../dist/js/Renderer";
import { Model } from "../dist/js/Model"
import "bootstrap"
import "../dist/css/style.scss"

(async function () {
    const renderer = new Renderer;
    const model = new Model;

    const $getWeatherhBtn = $('#get-weather-btn');
    const $cityInput = $('#city-name-input');

    const loadPage = async () => {
        await model.getDataFromDB();
        renderer.renderData(model.cityData);

    }

    const handleSearch = async () => {
        const cityName = $cityInput.val();
        await model.getCityData(cityName);

        $cityInput.val('');
        renderer.renderData(model.cityData);
    }

    const handleAddCity = async function () {
        try {
            const cityName = $(this).closest('.list-group-item').data().id;
            const city = model.cityData.find(c => c.searchQuery === cityName)

            await model.saveCity(city);
            renderer.renderData(model.cityData);
        } catch (error) {
            console.log(error);
        }

    }

    const handleRemoveCity = async function () {
        try {
            const id = $(this).closest('.list-group-item').data().id;
            const cityName = model.cityData.find(c => c._id === id).searchQuery;

            await model.removeCity(cityName);
            renderer.renderData(model.cityData);
        } catch (error) {
            console.log(error);
        }

    }

    loadPage();

    $getWeatherhBtn.on('click', handleSearch);
    $('.list-group').on('click', '.add-btn', handleAddCity);
    $('.list-group').on('click', '.remove-btn', handleRemoveCity);


    // await model.saveCity({
    //     "name": "Ashdod, Southern District, Israel",
    //     "temperature": 30,
    //     "feelsLike": 34,
    //     "condition": "Partly cloudy",
    //     "conditionPic": "https://assets.weatherstack.com/images/wsymbols01_png_64/wsymbol_0002_sunny_intervals.png",
    //     "searchQuery": "ashdod"
    // })
    // const cityData = await model.getCityData('tel aviv');
    // console.log(cityData);
    // console.log('1st:' + renderer, model);
    // await model.removeCity('tel aviv')
    // console.log('2nd:' + renderer, model);
    // console.log(model.cityData);



})()