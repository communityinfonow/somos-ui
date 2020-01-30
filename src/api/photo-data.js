import * as axios from "axios";

/**
 * Generates form from selected files
 * 
 */
//  TODO: wanted to take out these simples uses of axios but it might be good to keep a namespace for specific error handling.

function createForm(file) {
    var formData = new FormData();
    formData.append("photo", file);
    return formData;
}

export default {
    getMetadata(url, callback) {
        axios.get(url).then(response => {
            callback(response.data)
        });
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

    get(url, callback) {
        axios.get(url, {
            withCredentials: true
        }).then(response => {
            callback(response.data._embedded.photoAdminDtoes);
        });
    },
    delete(url, callback) {
        axios.delete(url).then(response => {
            callback();
        });
    }
}
//  TODO: error handling