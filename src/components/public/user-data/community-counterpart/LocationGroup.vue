<template>
  <div class="location-group">
    <div class="location-text">
      <h2 v-html="title"></h2>
      <div class="address-1" v-if="address && address.line1">{{address.line1}}</div>
      <div class="address-2" v-if="address && address.line2">{{address.line2}}</div>
    </div>
    <div class="location-image">
      <img :src="image" />
    </div>
  </div>
</template>

<script>
export default {
  name: "LocationGroup",
  props: { title: String, image: String, address: Object }
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
    font: 800 14px/28px Montserrat;
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