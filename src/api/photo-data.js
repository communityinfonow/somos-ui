import * as axios from "axios";

function createForm(files) {
    var formData = new FormData();
    files.forEach((file, index) => {
        formData.append("files[" + index + "]", file);
    });
    return formData;
}

export default {
    getMetadata(files, callback) {
        axios.post(URL,
            createForm(files), {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        ).then(response => {
            callback(response)
        });
    },
    savePhotos(files, callback) {
        var formData = new FormData();
        formData.append("files", files);
        axios.post(URL,
            createForm(files), {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        ).then(response => {
            callback(response);
        })
    }
}