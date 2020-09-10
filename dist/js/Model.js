import axios from "axios"

export class Model {

    constructor() {
        this.cityData = []
    }

    async getDataFromDB() {
        try {
            const resp = await axios.get('/cities')
            this.cityData = resp.data;
        } catch (error) {
            return error
        }
    }

    async getCityData(cityName) {
        //which sends a GET request to the /city route on your server
    }

    async saveCity(city) {
        try {
            const resp = await axios.post('/city', city);

            this.tasks.push(resp.data);//make sure there are no duplications
            return resp.status;
        } catch (error) {
            return error;
        }

    }

    async removeCity() {
        //which sends a DELETE request to the /city delete route on your server and update the cityData array

    }
}
