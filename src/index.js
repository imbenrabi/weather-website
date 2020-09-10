import { Renderer } from "../dist/js/Renderer";
import { Model } from "../dist/js/Model"
import "bootstrap"
import "../dist/css/style.scss"
// import "../dist/css/style.css"

(function () {
    const renderer = new Renderer;
    const model = new Model;

    const loadPage = () => { }
    const handleSearch = () => { }

    model.getDataFromDB()

    console.log(renderer, model);
})()