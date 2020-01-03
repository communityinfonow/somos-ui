import Vue from "vue";
import VueRouter from "vue-router";
import PhotoUpload from "../components/public/shared/photo-upload/PhotoUpload.vue";
import MapWrap from "../MapWrap.vue";
import Admin from "../components/admin/Admin.vue";
import SuperUser from "../components/admin/SuperUser.vue"
import PublicContainer from "../components/public/PublicContainer.vue";
import App from "../App.vue"

Vue.use(VueRouter);


export default new VueRouter({
    routes: [{
        path: "/",
        name: "root",
        component: PublicContainer
    }]
});