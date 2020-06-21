import axios from "axios";

const URL = process.env.VUE_APP_API_DOMAIN + "/advanced-data-links"; //TODO move to appLinks


export default {
    getLinks(callback) {
        axios.get(URL).then(callback);
    }
}