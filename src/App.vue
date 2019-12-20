<template>
  <v-app id="app">
    <publicContainer />
    <!-- <AdminContainer /> -->
  </v-app>
</template>

<script>
import PhotoUpload from "./components/photo-upload/PhotoUpload";
import { store } from "./store";
import publicContainer from "./components/public/PublicContainer";
import AdminContainer from "./components/admin/AdminContainer";

export default {
  name: "app",
  components: {
    PhotoUpload,
    AdminContainer,
    publicContainer
  }
};
</script>

<style lang="scss">
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

.main-text {
  color: $main-dark-blue;
}

.main-btn {
  background-color: $main-dark-blue;
}
.secondary-text {
  color: $main-light-blue;
}
</style>
