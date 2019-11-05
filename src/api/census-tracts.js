import * as axios from "axios";
const URL = process.env.VUE_APP_API_DOMAIN + "/census-tracts/";

export default {
    get(callback) {
        axios.get(URL).then(response => {
            callback(response.data)
        });
    }
}