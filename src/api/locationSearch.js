import * as axios from "axios";
const URL = process.env.VUE_APP_API_DOMAIN + "/location/";

export default {
    search(address, locationType, callback) {
        axios.get(URL + locationType, {
            params: {
                location: address
            }
        }).then(response => {
            callback(response)
        });
    }
}