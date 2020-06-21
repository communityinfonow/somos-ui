<template>
  <div>
    <v-row v-if="tract">
      <v-col cols="12" sm="6">
        <ImageGallery
          :photos="tractPhotos"
          id="neighborhood-gallery"
          v-if="tractPhotos && tractPhotos.length"
        />
        <div
          id="neighborhood-no-photos"
          v-if="tractPhotos && !tractPhotos.length"
          :class="{'fill-height': matchedTractPhotos && matchedTractPhotos.length}"
        >
          <p>{{translateText(noNeighborhoodPhotosMessage)}}</p>
        </div>
      </v-col>
      <v-col cols="12" sm="6">
        <ImageGallery
          :photos="matchedTractPhotos"
          id="match-gallery"
          v-if="matchedTractPhotos && matchedTractPhotos.length"
        />
        <div
          id="match-no-photos"
          v-if="matchedTractPhotos && !matchedTractPhotos.length"
          :class="{'fill-height': tractPhotos && tractPhotos.length}"
        >
          <p>{{translateText(noMatchPhotosMessage)}}</p>
        </div>
      </v-col>
    </v-row>
    <a href="/photoshare" target="_blank" rel="noopener noreferrer" v-if="tract">
      <button id="photo-upload-btn" class="my-3">{{translateText(uploadPhotosText)}}</button>
    </a>
  </div>
</template>

<script>
import translate from "@/mixins/translate";
import ImageGallery from "./ImageGallery";
export default {
  name: "ImageGalleryContainer",
  props: { tract: Object, tractPhotos: Array, matchedTractPhotos: Array },
  mixins: [translate],
  components: {
    ImageGallery
  },
  data() {
    return {
      uploadPhotosText: {
        en: "Upload photos of your neighborhood here",
        es: "Sube fotos de tu vecindario aquí"
      },
      noMatchPhotosMessage: {
        en: "No approved photos yet",
        es: "No existen fotos aprobadas aun"
      },
      noNeighborhoodPhotosMessage: {
        en: "No approved photos yet",
        es: "No existen fotos aprobadas aun"
      }
    };
  }
};
</script>

<style lang="scss">
#neighborhood-gallery,
#neighborhood-no-photos {
  background: $dark-pink;
  border-radius: 6px;
}

#match-gallery,
#match-no-photos {
  background: $main-yellow;
  border-radius: 6px;
}

#match-no-photos,
#neighborhood-no-photos {
  &.fill-height {
    height: 100%;
    padding: 0px !important;

    p {
      line-height: 200px !important;
    }
  }

  p {
    padding: 0px;
    font-size: 16px;
    font-weight: 500;
  }

  font-size: 18px;
  padding: 10px;
  text-align: center;
  line-height: 100%;
  color: white;
  font-family: Montserrat;
  font-weight: 600;
}
</style>