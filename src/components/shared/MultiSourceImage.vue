<template>
  <v-img :src="photoSource" @load="loadSuccessHandler" @error="loadFailHandler"></v-img>
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
  props: { photos: Array }
};
</script>

<style>
</style>