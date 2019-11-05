import * as axios from "axios";
/**
 * Generates form from selected files
 */
function createForm(files) {
    var formData = new FormData();
    var reader = new FileReader();
    files.forEach((file, index) => {
        formData.append("photos", file);
    });
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
            callback(response.data);
        })
    },
    savePhoto(url, data, callback) {
        axios.put(url, data).then(response => {
            callback(response.data);
        });
    }
}