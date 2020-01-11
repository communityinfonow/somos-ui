<template>
  <div class="profile-grouping">
    <div class="profile-image">
      <img :src="image" />
    </div>
    <div class="profile-info">
      <div class="profile-info-container">
        <div class="info-text">
          <h2>{{name}}</h2>
          <p>{{story}}</p>
        </div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NeighborProfile",
  props: ["name", "story", "image", "lazyImage", "left", "right"]
};
</script>

<style lang="scss" scoped>
.profile-grouping {
  position: relative;
}

.info-text {
  position: absolute;
  top: 15%;
  width: 100%;
}

.profile-info {
  width: 50%;
  position: absolute;
  height: 100%;
}
.profile-image {
  width: 50%;
  position: relative;
}

.profile-info-container {
  position: absolute;
  height: 100%;
  width: 100%;
}

img {
  width: 100%;
}
</style>