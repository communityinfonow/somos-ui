import * as axios from "axios";
const URL = process.env.VUE_APP_API_DOMAIN + "/location-search";

export default {
    search(address, callback) {
        axios.get(URL, {
            params: {
                location: address
            }
        }).then(response => {
            callback(response)
        });
    }
}