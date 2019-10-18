import * as axios from "axios";
const KEY = "2811b8dddd8f474d27fdf272c52456196299a56";
const URL = 'https://api.geocod.io/v1.3/geocode';

export default {
    geocode(address, callback) {
        axios.get(URL, {
            params: {
                'api_key': KEY,
                q: address
            }
        }).then(response => {
            callback(response)
        });
    }
}