<template>
  <v-app id="app">
    <transition name="fade">
      <router-view></router-view>
    </transition>

    <!-- <AdminContainer /> -->
  </v-app>
</template>

<script>
import publicContainer from "./components/public/PublicContainer";
// import AdminContainer from "./components/admin/AdminContainer";

export default {
  name: "app",
  components: {
    // AdminContainer,
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

html {
  font-size: 14px !important;
}

h1 {
  letter-spacing: 8px;
  color: $main-dark-blue;
  text-transform: uppercase;
  font-family: "Bebas Neue";
  font-weight: 700;
  font-size: 2.857rem;
  text-align: center;
}

@media (max-width: 600px) {
  h1 {
    font-size: 2.143rem;
  }

  h2 {
    text-align: center;
  }
}

h2 {
  font-size: 1.143rem;
  font-family: "Montserrat" !important;
  color: #162d54;
  text-transform: uppercase;
  font-weight: 900;
  letter-spacing: 1.6px;
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

[class^="col"] {
  z-index: 2;
}
</style>
