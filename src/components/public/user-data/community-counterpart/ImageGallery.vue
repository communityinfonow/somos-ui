<template>
  <div>
    <v-carousel
      height="200"
      class="carousel"
      hide-delimiter-background
      :hide-delimiters="photos.length <= 3"
      :show-arrows="photos.length > 3"
    >
      <v-carousel-item v-for="(grid, index) in carouselItems" :key="index">
        <v-container>
          <v-row>
            <v-col cols="6" lg="4" v-for="(photo, index) in grid" :key="index">
              <MultiSourceImage
                class="multi-image small-gallery-image"
                :photos="[photo._links['cropped-photo-file'].href, photo._links['photo-file'].href]"
                height="122"
                @click="enlargeGallery(photo)"
              ></MultiSourceImage>
            </v-col>
          </v-row>
        </v-container>
      </v-carousel-item>
    </v-carousel>
    <v-dialog v-model="largeGallery" width="50%">
      <v-carousel class="carousel" v-model="selectedPhotoIndex" height="auto">
        <v-carousel-item v-for="(photo, index) in photos" :key="index">
          <!-- <v-card> -->
          <MultiSourceImage
            class="multi-image"
            :photos="[photo._links['cropped-photo-file'].href, photo._links['photo-file'].href]"
          ></MultiSourceImage>
          <!-- </v-card> -->
        </v-carousel-item>
      </v-carousel>
    </v-dialog>
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
    return { largeGallery: false, selectedPhoto: null, selectedPhotoIndex: 0 };
  },
  methods: {
    enlargeGallery(selectedPhoto) {
      this.selectedPhotoIndex = this.photos.indexOf(selectedPhoto);
      this.largeGallery = true;
    }
  },
  computed: {
    photoGridLength() {
      return this.$vuetify.breakpoint.lgAndUp ? 3 : 2;
    },
    carouselItems() {
      let items = [];
      if (this.photos) {
        this.photos.forEach((photo, index) => {
          if (!items.length) {
            items.push([photo]);
          } else {
            let newItem = false;
            items.forEach(item => {
              if (item.length < this.photoGridLength) {
                item.push(photo);
              } else {
                newItem = true;
              }
            });
            if (newItem) {
              items.push([photo]);
            }
          }
        });
      }

      return items;
    }
  }
};
</script>

<style lang="scss">
.multi-image {
  border-radius: 10px;
}

.small-gallery-image {
  &:hover {
    cursor: pointer;
    transform: scale(1.03);
  }
}

.carousel {
  border-radius: 10px;
}
</style>