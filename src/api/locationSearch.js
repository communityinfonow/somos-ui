import * as axios from "axios";
const URL = process.env.VUE_APP_API_DOMAIN + "/location/"; // TODO eventually accept url as a param which would come from REST api

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