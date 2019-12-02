import * as axios from "axios";

const GET_URL = process.env.VUE_APP_API_DOMAIN + "/photos"
/**
 * Generates form from selected files
 * 
 */
//  TODO: wanted to take out these simples uses of axios but it might be good to keep a namespace for specific error handling.
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

    get(callback) {
        axios.get(GET_URL).then(response => {
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