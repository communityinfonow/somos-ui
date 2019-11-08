import Vue from 'vue'
import App from './App.vue'
import MapWrap from "./MapWrap.vue";
import VueRouter from 'vue-router'


import {
  Icon
} from 'leaflet';
import {
  LControl
} from 'vue2-leaflet';
import 'leaflet/dist/leaflet.css';
import vuetify from './plugins/vuetify';


delete Icon.Default.prototype._getIconeUrl;

Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

Vue.config.productionTip = false
Vue.use(VueRouter);

const routes = [{
  path: "/photo-upload",
  component: App
}, {
  path: "/map",
  component: require('./MapWrap.vue').default
}];

const router = new VueRouter({
  routes: routes
});

new Vue({
  vuetify,
  render: h => h(App),
  router
}).$mount('#app')