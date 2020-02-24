<template>
  <v-img
    :src="photoSource"
    @load="loadSuccessHandler"
    @error="loadFailHandler"
    :height="height"
    @click="$emit('click')"
    contain
  >
    <template v-slot:placeholder>
      <v-row class="fill-height ma-0 img-placeholder" align="center" justify="center">
        <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
      </v-row>
    </template>
  </v-img>
</template>

<script>
export default {
  name: "MultiSourceImage",
  data() {
    return { imageLoaded: false, imageLoadFailed: false };
  },
  methods: {
    loadFailHandler() {
      this.imageLoadFailed = true;
    },
    loadSuccessHandler() {
      this.imageLoaded = true;
    }
  },
  computed: {
    photoSource: function() {
      return this.imageLoadFailed ? this.photos[1] : this.photos[0];
    }
  },
  props: { photos: Array, height: Number }
};
</script>

<style lang="scss">
.img-placeholder {
  background: #e4e4e475;
}
</style>