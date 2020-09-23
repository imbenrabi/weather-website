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

    const handleRemoveCity = async function (e) {
        e.preventDefault()
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
    setInterval(async () => {
        try {
            await model.refreshTemps();
            renderer.renderData(model.cityData);

        } catch (error) {
            console.log(error);
        }
    }, 900000);

    $getWeatherhBtn.on('click', handleSearch);
    $('.list-group').on('click', '.add-btn', handleAddCity);
    $('.list-group').on('click', '.remove-btn', handleRemoveCity);

})()