import axios from "axios"

export class Model {

    constructor() {
        this.cityData = []
    }

    async refreshTemps() {
        try {
            this.cityData.forEach((c) => this.getCityData(c.searchQuery, true))

        } catch (error) {
            return error;
        }
    }

    async getDataFromDB() {
        try {
            const resp = await axios.get('/cities');

            this.cityData = resp.data;

            return resp.status;
        } catch (error) {
            return error
        }
    }

    async getCityData(cityName, auto = false) {
        try {
            const resp = await axios.get(`city/${cityName}`);

            if (auto === false) {
                this.cityData.unshift(resp.data);
                return resp.data;
            } else {
                await this.saveCity(resp.data);
            }

        } catch (error) {
            return error;
        }

    }

    async saveCity(city) {
        try {
            const resp = await axios.post('/city', city);
            const cityIndex = this.cityData.findIndex(c => c.name === resp.data.name);

            if (cityIndex === -1) {
                this.cityData.unshift(resp.data);

            } else {
                this.cityData.splice(cityIndex, 1)
                this.cityData.unshift(resp.data);
            }

            return resp.status;
        } catch (error) {
            return error;
        }

    }

    async removeCity(cityName) {
        try {
            const resp = await axios.delete(`city/${cityName.replace(' ', '-')}`);
            const cityIndex = this.cityData.findIndex(c => c.name === resp.data.name);

            this.cityData.splice(cityIndex, 1)

            return resp.status;
        } catch (error) {
            return error;
        }

    }
}
