import Vue from "vue";
import VueRouter from "vue-router";
import PhotoUpload from "../components/public/shared/photo-upload/PhotoUpload.vue";
import Admin from "../components/admin/Admin.vue";
import Login from "@/components/admin/Login.vue";
import SuperUser from "../components/admin/SuperUser.vue"
import PublicContainer from "../components/public/PublicContainer.vue";
import {
    authenticationStore
} from "@/store.js"

import axios from "axios";

Vue.use(VueRouter);

function checkAuthenticated(to, from, next) {

    // TODO definitely get this from HATEOAS
    axios.get(process.env.VUE_APP_API_DOMAIN + "/authenticated").then(response => {
        if (response.data) {
            authenticationStore.setUserRoles(response.data); //TODO probably move this into an api component/funciton
            next();
        }
    }).catch(error => {
        next("/admin/login");
    });

}


export default new VueRouter({
    mode: 'history',
    routes: [{
            path: "/admin",
            component: Admin,
            beforeEnter: checkAuthenticated
        },
        {
            path: "/",
            component: PublicContainer
        },
        {
            path: "/photoshare",
            component: PhotoUpload
        },
        {
            path: "/admin/login",
            component: Login,
            beforeEnter: (to, from, next) => {
                // TODO Same. HATEOAS
                axios.get(process.env.VUE_APP_API_DOMAIN + "/authenticated").then(response => {
                    if (response.data) {
                        next("/admin");
                    }
                    next();
                }).catch(error => {
                    next();
                });

            }
        },
        {
            path: "/admin/users",
            component: SuperUser,
            beforeEnter: checkAuthenticated
        }
    ]
});