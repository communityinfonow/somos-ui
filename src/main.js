import Vue from 'vue'
import App from './App.vue'
import router from "./router";


import {
  Icon
} from 'leaflet';
import {
  LControl
} from 'vue2-leaflet';
import 'leaflet/dist/leaflet.css';
import "cropperjs/dist/cropper.css";
import vuetify from './plugins/vuetify';
import * as axios from "axios";



axios.defaults.withCredentials = true;

delete Icon.Default.prototype._getIconeUrl;

Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

Vue.config.productionTip = false



new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')