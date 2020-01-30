import * as axios from "axios";

export default {
    login(url, credentials, successCallback, errorCallback) {
        axios.post(url, credentials).then(response => {
            successCallback(response);
        }).catch(error => {
            errorCallback(error);
        });
    },
    logout(url) {

    }
}