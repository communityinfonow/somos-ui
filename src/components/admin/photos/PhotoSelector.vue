<template>
  <v-row justify="start">
    <v-col cols="12">
      <v-col>
        <div class="display-1">{{censusTract}}</div>
      </v-col>
      <v-divider></v-divider>
      <v-row>
        <v-col v-for="photo in photos" :key="photo.id" lg="2" md="3" sm="6" xs="12">
          <PhotoThumbnail
            :photoObj="photo"
            @delete="deleteHandler"
            @crop="cropHandler"
            :key="imageKey"
          ></PhotoThumbnail>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import PhotoThumbnail from "./PhotoThumbnail";
export default {
  name: "PhotoSelector",
  data() {
    return { censusTract: this.tract, columns: 6, imageKey: 0 };
  },
  components: {
    PhotoThumbnail
  },
  props: ["tract", "photos"],
  methods: {
    deleteHandler: function(object) {
      this.photos = this.photos.filter(photo => photo !== object);
      if (!this.photos.length) {
        this.$emit("delete", this.censusTract);
      }
    },
    cropHandler: function() {
      this.imageKey++;

      this.$emit("crop", true);
    }
  }
};
</script>

<style>
</style>