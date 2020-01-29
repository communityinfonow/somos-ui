import Vue from "vue";
import VueRouter from "vue-router";
import PhotoUpload from "../components/public/shared/photo-upload/PhotoUpload.vue";
import Admin from "../components/admin/Admin.vue";
import Login from "@/components/admin/Login.vue";
import SuperUser from "../components/admin/SuperUser.vue"
import PublicContainer from "../components/public/PublicContainer.vue";
import App from "../App.vue"
import {
    authenticationStore
} from "@/store.js"

Vue.use(VueRouter);


export default new VueRouter({
    mode: 'history',
    routes: [{
        path: "/admin",
        component: Admin,
        beforeEnter: (to, from, next) => {
            if (!authenticationStore.state.authenticated) {
                next("/admin/login");
            } else {
                next();
            }
        }
    }, {
        path: "/",
        redirect: "/photoshare"
    }, {
        path: "/photoshare",
        component: PhotoUpload
    }, {
        path: "/admin/login",
        component: Login
    }]
});