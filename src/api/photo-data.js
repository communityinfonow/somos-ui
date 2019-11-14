import * as axios from "axios";

const GET_URL = process.env.VUE_APP_API_DOMAIN + "/photos/"
/**
 * Generates form from selected files
 * 
 */
//  TODO: abstract out any of the generic get/create methods that accept url and leave only specific api calls here (such as the one needing to create form). COuld use mixins for that .
function createForm(files) {
    var formData = new FormData();
    files.forEach((file) => {
        formData.append("photos", file);
    });
    return formData;
}

function createFormSingle(file) {
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
    savePhotoInformation(files, callback) {
        axios.post(process.env.VUE_APP_API_DOMAIN + "/photos/",
            createForm(files), {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        ).then(response => {
            callback(response.data._embedded.photoDtoes);
        })
    },
    replacePhoto(url, file, callback) {
        axios.post(url, createFormSingle(file), {
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
    // TODO: move to using generic from mixin. Keep const url here though for reference when using generic
    get(callback) {
        axios.get(GET_URL).then(response => {
            callback(response.data._embedded.photoDtoes);
        });
    },
    delete(url, callback) {
        axios.delete(url).then(response => {
            callback();
        });
    }
}
//  TODO: error handling