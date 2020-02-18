import * as axios from "axios";
const URL = process.env.VUE_APP_API_DOMAIN + "/location-search"; //TODO move to appLinks

export default {
    searchByAddress(address, callback) {
        axios.get(URL, {
            params: {
                location: address
            }
        }).then(response => {
            callback(response)
        });
    },
    searchByLatLng(lat, lng, callback) {
        axios.get(URL + "/latlng/lat=" + lat + ";lng=" + lng).then(response => {
            callback(response);
        });
    }
}