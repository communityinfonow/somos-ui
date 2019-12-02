<template>
  <v-app id="app">
    <v-container>
      <v-row justify="center">
        <v-btn-toggle multiple>
          <v-btn>
            <router-link to="/map">Map</router-link>
          </v-btn>
          <v-btn>
            <router-link to="/photo-upload">Photo uploader</router-link>
          </v-btn>

          <v-btn>
            <router-link to="/admin">Admin</router-link>
          </v-btn>
          <v-btn>
            <router-link to="/admin/users">Users</router-link>
          </v-btn>
        </v-btn-toggle>
      </v-row>
      <v-row>
        <transition name="fade">
          <router-view></router-view>
        </transition>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import PhotoUpload from "./components/photo-upload/PhotoUpload";
import { store } from "./store";

export default {
  name: "app",
  components: {
    PhotoUpload
  }
};
</script>

<style scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  /* margin-top: 60px; */
}

.container {
  height: 100%;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
