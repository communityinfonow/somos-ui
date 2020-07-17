<template>
  <v-app id="app">
    <transition name="fade">
      <router-view></router-view>
    </transition>
  </v-app>
</template>

<script>
import axios from "axios";
export default {
  name: "app",
  mounted() {
    axios.interceptors.request.use(
      config => {
        config.headers["X-XSRF-TOKEN"] = this.$cookies.get("XSRF-TOKEN");
        config.headers = {
          ...config.headers
        };

        config.withCredentials = true;

        return config;
      },
      error => Promise.reject(error)
    );
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background: #ffffff !important;
  /* margin-top: 60px; */
}

#privacy-policy,
#terms-of-service {
  .container {
    border: 2px solid #162d54;
    border-radius: 7px;
    padding: 40px;
  }

  p {
    font-family: sans-serif;
  }

  h1 {
    margin-bottom: 30px;
  }

  h2 {
    border-bottom: 1px solid;
    font-size: 20px;
  }

  h3 {
    text-align: left !important;
  }

  h4 {
    text-align: left !important;
  }
}

html {
  font-size: 14px !important;
}

body {
  overflow: hidden;
}

h1 {
  letter-spacing: 8px;
  color: $main-dark-blue;
  text-transform: uppercase;
  font-family: "Bebas Neue";
  font-weight: 500;
  font-size: 2.857rem;
  text-align: center;
}

@media (max-width: 600px) {
  h1 {
    font-size: 2.143rem;
    letter-spacing: 6px;
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
