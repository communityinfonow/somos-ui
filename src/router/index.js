import Vue from "vue";
import VueRouter from "vue-router";
import PhotoUpload from "../components/photo-upload/PhotoUpload.vue";
import MapWrap from "../MapWrap.vue";
import App from "../App.vue"

Vue.use(VueRouter);


export default new VueRouter({
    routes: [{
        path: "/",
        redirect: "map",
    }, {
        path: "/photo-upload",
        component: PhotoUpload
    }, {
        path: "/map",
        name: "map",
        component: MapWrap
    }]
});