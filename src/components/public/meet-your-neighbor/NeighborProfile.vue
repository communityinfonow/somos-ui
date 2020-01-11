<template>
  <div class="profile-grouping">
    <div class="profile-image">
      <img :src="image" />
    </div>
    <div class="profile-info">
      <div class="profile-info-container">
        <h2>{{name}}</h2>
        <p>{{story}}</p>
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

.profile-info {
  width: 50%;
  position: absolute;
}
.profile-image {
  width: 50%;
  position: absolute;
}

.profile-info-container {
  position: relative;
  top: 61px;
}

img {
  width: 100%;
}
</style>