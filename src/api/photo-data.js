import * as axios from "axios";

/**
 * Generates form from selected files
 * 
 */

function createForm(file) {
    var formData = new FormData();
    formData.append("photo", file);
    return formData;
}

export default {
    getMetadata(url, callback) {
        axios.get(url).then(response => {
            callback(response.data)
        }).catch(error => {});
    },
    savePhotoInformation(url, file, progressCallback) {
        return axios.post(url,
            createForm(file), {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: (progressEvent) => {
                    progressCallback(progressEvent);
                }
            }
        );
    },
    replacePhoto(url, file, callback) {
        axios.post(url, createForm(file), {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            callback(response.data);
        });
    },
    savePhoto(url, data, callback) {
        axios.put(url, data).then(response => {
            callback(response.data);
        });
    },

    getAdmin(url, callback, errorCallback) {
        axios.get(url, {
            withCredentials: true
        }).then(response => {
            callback(response.data._embedded.photoAdminDtoes);
        }).catch(error => {
            errorCallback(error.response)
        });
    },
    get(url, callback, errorCallback) {
        axios.get(url).then(response => {
            callback(response.data._embedded.photoDtoes);
        }).catch(error => {
            errorCallback(error.response)
        });
    },
    delete(url, callback) {
        axios.delete(url).then(response => {
            callback();
        });
    }
}