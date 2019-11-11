<template>
  <v-row justify="start">
    <v-col cols="12">
      <v-col>
        <div class="display-2">{{censusTract.tract}}</div>
      </v-col>
      <v-divider></v-divider>
      <Photo v-for="photo in censusTract.photos" :key="photo.id" :photoObj="photo"></Photo>
    </v-col>
  </v-row>
</template>

<script>
import Photo from "./Photo";
export default {
  name: "PhotoSelector",
  data() {
    return { censusTract: this.tract };
  },
  components: {
    Photo
  },
  props: ["tract"]
};
</script>

<style>
</style>