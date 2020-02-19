<template>
  <div class="profile-grouping">
    <div class="profile-image">
      <img :src="image" />
    </div>
    <div class="profile-info">
      <div class="profile-info-container">
        <div class="info-text">
          <h2>{{name}}</h2>
          <p>{{translatedStory}}</p>
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { translate } from "@/mixins/translate.js";
export default {
  name: "NeighborProfile",
  props: ["name", "story", "image"],
  mixins: [translate],
  computed: {
    translatedStory() {
      return this.translateText(this.story);
    }
  }
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
  padding-left: 25px;
  padding-right: 25px;
}

.profile-info {
  width: 60%;
  position: absolute;
  height: 100%;
}

.profile-image {
  width: 40%;
  position: relative;
}

.profile-info-container {
  position: absolute;
  height: 100%;
  width: 100%;
}

// @media (min-width: 600px) and (max-width: 959px) {
//   .profile-image {
//     width: 100%;
//   }

//   .profile-info {
//     width: 100%;
//     height: auto;
//     position: relative;
//   }
// }

@media (max-width: 600px) {
  .profile-image {
    width: 100%;
  }

  .profile-info {
    width: 100%;
    height: auto;
    position: relative;
  }

  .info-text {
    position: relative;
  }

  .profile-info-container {
    position: relative;
    height: auto;
  }
}

img {
  width: 100%;
}
</style>