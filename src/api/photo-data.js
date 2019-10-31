import * as axios from "axios";
const URL = process.env.VUE_APP_API_DOMAIN + "/photos/"; // TODO eventually accept url as a param which would come from REST api

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
    savePhotos(files, callback) {
        axios.post(URL,
            createForm(files), {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        ).then(response => {
            callback(response.data);
        })
    }
}