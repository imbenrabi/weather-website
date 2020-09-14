import { Renderer } from "../dist/js/Renderer";
import { Model } from "../dist/js/Model"
import "bootstrap"
import "../dist/css/style.scss"

(async function () {
    const renderer = new Renderer;
    const model = new Model;

    const loadPage = async () => {
        await model.getDataFromDB();
        renderer.renderData(model.cityData);

    }

    const handleSearch = () => { }

    loadPage();

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