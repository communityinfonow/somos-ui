import * as axios from "axios";
const domain = process.env.VUE_APP_DOMAIN;

export default {
    geocode(callback) {
        axios.get(domain + "/locations").then(response => {
            callback(response)
        });
    }
}