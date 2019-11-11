<template>
  <v-card>
    <v-title>{{photoObj.fileName}}</v-title>
  </v-card>
</template>

<script>
export default {
  name: "PhotoThumbnail",
  data() {
    return {};
  },
  props: ["photoObj"],
  components: {}
};
</script>

<style>
</style>