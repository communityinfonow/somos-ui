<template>
  <div id="app">
    <PhotoUpload />
  </div>
</template>

<script>
import PhotoUpload from "./components/photo-upload/PhotoUpload";

export default {
  name: "app",
  components: {
    PhotoUpload
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
