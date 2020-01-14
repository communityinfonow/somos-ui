<template>
  <div class="location-group">
    <div class="location-text">
      <h2>{{title}}</h2>
      <div class="address-1"></div>
      <div class="address-2"></div>
    </div>
    <div class="location-image">
      <img :src="image" />
    </div>
  </div>
</template>

<script>
export default {
  name: "LocationGroup",
  props: { title: String, image: String }
};
</script>

<style lang="scss">
.location-group {
  position: relative;
  width: 100%;
  height: 100%;
}
.location-text {
  position: absolute;

  width: 60%;

  div {
    letter-spacing: 1.6px;
    text-transform: uppercase;
  }
}
.location-image {
  width: 40%;
}

img {
  width: 100%;
}
</style>