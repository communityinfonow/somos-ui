import * as axios from "axios";

export const appLinks = {
    data() {
        return {
            appLinks: null
        }
    },
    created() {
        axios
            .get(process.env.VUE_APP_API_DOMAIN, {
                headers: {
                    Accept: "application/hal+json"
                }
            })
            .then(response => {
                this.appLinks = response.data;
            });
    }
};