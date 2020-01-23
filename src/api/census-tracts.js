import * as axios from "axios";

export default {
    getMulti(url, callback) {
        axios.get(url).then(response => {
            callback(response.data._embedded.censusTractDtoes)
        });
    },
    getSingle(url, callback) {
        axios.get(url).then(response => {
            callback(response.data);
        });
    }
}