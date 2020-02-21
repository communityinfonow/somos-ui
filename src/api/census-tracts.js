import * as axios from "axios";

export default {
    getMulti(url, callback) {
        axios.get(url).then(response => {
            callback(response.data._embedded.censusTractDtoes)
        });
    },
    getSingle(url, callback, errorCallback) {
        axios.get(url).then(response => {
            callback(response.data);
        }).catch(error => errorCallback(error));
    },
    getMatched(url, callback) {
        axios.get(url).then(response => {
            callback(response.data._embedded.matchedCensusTractDtoes)
        });
    }
}