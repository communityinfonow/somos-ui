<template>
  <div>
    <v-card outlined>
      <v-row>
        <v-col cols="4" v-for="(photo, index) in photos" :key="index">
          <MultiSourceImage
            :photos="[photo._links['cropped-photo-file'].href, photo._links['photo-file'].href]"
          ></MultiSourceImage>
        </v-col>
        <v-col v-if="photos.length === 0">
          <p>{{translateText(noPhotosMessage)}}</p>
        </v-col>
      </v-row>
      <v-card-actions></v-card-actions>
    </v-card>
  </div>
</template>

<script>
import SomosButton from "@/components/shared/SomosButton";
import MultiSourceImage from "@/components/shared/MultiSourceImage";
import translate from "@/mixins/translate";
// TODO: ADA desciprtion for photos
export default {
  name: "ImageGallery",
  props: { photos: Array },
  mixins: [translate],
  components: {
    SomosButton,
    MultiSourceImage
  },
  data() {
    return {
      noPhotosMessage: {
        en: "There are no approved photos for this neighborhood.",
        es: ""
      }
    };
  }
};
</script>

<style>
</style>