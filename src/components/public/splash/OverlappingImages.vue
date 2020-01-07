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
}

.top-image {
  z-index: 1;
  position: relative;
  bottom: 30%;
  width: 90%;
}

.bottom-image {
  width: 70%;
  z-index: 0;
  position: relative;
  left: 30%;
}
</style>