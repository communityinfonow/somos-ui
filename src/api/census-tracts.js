import * as axios from "axios";

export default {
    get(url, callback) {
        axios.get(url).then(response => {
            callback(response.data._embedded.censusTractDtoes)
        });
    }
}