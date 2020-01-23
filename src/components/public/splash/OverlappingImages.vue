<template>
  <div class="image-container">
    <v-img class="splash-image bottom-image" :lazy-src="bottomLazySource" :src="bottomSource" />
    <v-img class="splash-image top-image" :lazy-src="topLazySource" :src="topSource"></v-img>
  </div>
</template>

<script>
export default {
  name: "OverlappingImages",
  props: ["topSource", "topLazySource", "bottomSource", "bottomLazySource"]
};
</script>

<style lang="scss" scoped>
.image-container {
  height: 100%;
  position: relative;
}

.top-image {
  z-index: 2;
  position: absolute;
  top: 90px;
  width: 88%;
}

.bottom-image {
  width: 70%;
  z-index: 1;
  position: absolute;
  left: 30%;
}
</style>