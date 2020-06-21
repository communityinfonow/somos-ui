<template>
  <div>
    <v-card hover>
      <v-skeleton-loader class="mx-auto" height="100%" type="image" v-if="!loaded"></v-skeleton-loader>
      <v-img
        :src="photoSource"
        @load="imageLoaded"
        @error="loadFailHandler"
        @click.stop="openModal"
      >
        <v-row justify="center" align="center" class="crop-btn">
          <v-col cols="4" transition="fade-transition">
            <v-btn @click.stop="openModal" color="blue" block>Crop</v-btn>
          </v-col>
        </v-row>
      </v-img>

      <div v-show="showInfo">
        <v-list-item>
          <v-list-item-content>
            <v-text-field
              class="mt-3"
              :hide-details="hideFilenameValidation"
              v-model="fileName"
              v-on:blur="focusHandler"
              clearable
              outlined
              dense
              label="Name"
            ></v-text-field>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-content>
            <v-textarea
              outlined
              label="Description"
              v-model="photo.description"
              @blur="descriptionBlurHandler"
              auto-grow
              :rows="photoDescriptionLength"
              id="description"
              :rules="descriptionRule"
            ></v-textarea>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="photo.ownerFirstName || photo.ownerLastName || photo.ownerEmailAddress">
          <v-list-item-content>
            <v-list-tile-sub-title>Contact:</v-list-tile-sub-title>
            {{photo.ownerFirstName}} {{photo.ownerLastName}}
            {{photo.ownerEmailAddress}}
          </v-list-item-content>
        </v-list-item>
        <v-card-actions>
          <v-container>
            <v-row v-if="!photo.approved">
              <v-col cols="12" class="pt-0">
                <v-btn primary block :disabled="!photo.description" @click="acceptPhoto">Approve</v-btn>
              </v-col>
            </v-row>
            <v-row v-if="photo.approved">
              <v-col cols="12" class="pt-0">
                <v-btn block color="orange" @click="rejectPhoto">Reject</v-btn>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" class="pt-0">
                <v-btn block color="red" @click.stop="deleteConfirmationDialog = true">Delete</v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card-actions>
        <v-card-text class="pt-0">
          <v-container class="overline pt-0">last edited on {{photo.lastEdited}} by {{lastEditedBy}}</v-container>
        </v-card-text>
      </div>

      <div class="thumbnail-open">
        <v-icon @click="showInfo = !showInfo" large>{{showInfoIcon}}</v-icon>
      </div>
    </v-card>
    <v-dialog v-model="deleteConfirmationDialog" width="400">
      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >Are you sure you want to delete {{photo.fileName}}?</v-card-title>
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="secondary" text @click="closeModal">No</v-btn>
          <v-btn color="primary" text @click="deletePhoto">Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="photoEnlargeDialog" width="50%" content-class="crop-modal">
      <v-progress-linear :active="isLoading" :value="progressValue" height="25" striped rounded>
        <strong>{{translateText(progressText)}}</strong>
      </v-progress-linear>
      <vue-cropper
        ref="crop"
        alt="photo.description"
        :src="photo._links['photo-file'].href"
        :img-style="{ width: '100%', height: '100%'}"
        :zoomable="false"
        :viewMode="2"
      ></vue-cropper>
      <!-- <v-progress-circular v-if="isLoading" indeterminate color="primary"></v-progress-circular> -->

      <v-content>
        <v-row>
          <v-col cols="3">
            <v-btn @click.stop="rotate" id="rotate" block color="orange">Rotate</v-btn>
          </v-col>

          <v-col cols="3" offset="3">
            <v-btn color="secondary" @click.stop="closePhotoEnlarge" block>Cancel</v-btn>
          </v-col>
          <v-col cols="3">
            <v-btn color="primary" @click.stop="cropImage" block>Accept</v-btn>
          </v-col>
        </v-row>
      </v-content>

      <!-- </v-img> -->
    </v-dialog>
  </div>
</template>

<script>
import PhotoData from "../../../api/photo-data";
import VueCropper from "vue-cropperjs";
import translate from "@/mixins/translate";

export default {
  name: "PhotoThumbnail",
  data() {
    return {
      photo: this.photoObj,
      deleteConfirmationDialog: false,
      showPhotoDescription: false,
      photoEnlargeDialog: false,
      fileName: this.photoObj.fileName.split(".")[0],
      cropImg: null,
      loaded: false,
      imageLoadFailed: false,
      descriptionRule: [v => !!v || "Description is required"],
      rotateTracker: 0,
      showInfo: false,
      isLoading: false,
      progressText: {
        en: "Uploading...",
        es: "Cargando"
      },
      progressValue: 0
    };
  },
  props: ["photoObj", "deleteHandler"],
  mixins: [translate],
  components: { VueCropper },

  computed: {
    lastEditedBy: function() {
      return this.photo.lastEditedBy ? this.photo.lastEditedBy : "uploader";
    },
    fileType: function() {
      var type = this.photoObj.fileName.split(".")[1];
      return type === "jpeg" || type === "jpg" ? "jpeg" : "png";
    },
    photoSource: function() {
      return this.imageLoadFailed
        ? this.photo._links["photo-file"].href
        : this.photo._links["cropped-photo-file"].href;
    },
    selfPath: function() {
      return this.photo._links.self.href;
    },
    fileExtension: function() {
      return this.photo.fileName.split(".")[1];
    },
    photoDescriptionLength: function() {
      return this.photo.description ? 5 : 1;
    },
    hideFilenameValidation: function() {
      return true;
    },
    showInfoIcon() {
      return this.showInfo ? "mdi-chevron-up" : "mdi-chevron-down";
    }
  },
  methods: {
    progressMethod(event) {
      this.progressValue = Math.round((event.loaded / event.total) * 100);
    },
    rotate() {
      this.$refs.crop.rotate(90);
      this.scaleImage();
    },
    scaleImage() {
      if (this.rotateTracker == 270) {
        this.rotateTracker = 0;
      } else {
        this.rotateTracker += 90;
      }
    },
    imageLoaded() {
      this.loaded = true;
    },
    openModal() {
      this.photoEnlargeDialog = true;
    },
    cropImage() {
      this.isLoading = true;

      this.$refs.crop.getCroppedCanvas().toBlob(
        blob => {
          this.cropImg = URL.createObjectURL(blob);
          PhotoData.replacePhoto(
            this.selfPath,
            new File([blob], this.photo.fileName, {
              type: "image/" + this.fileType.toLowerCase()
            }),
            response => {
              this.closePhotoEnlarge();
              this.photo = response;
              this.isLoading = false;
              this.$emit("crop");
            },
            this.progressMethod
          );
        },
        "image/" + this.fileType.toLowerCase(),
        1.0
      );
    },
    deletePhoto() {
      this.closeModal();
      let self = this;
      PhotoData.delete(this.selfPath, () => {
        self.$emit("delete", self.photo);
      });
    },
    closeModal: function() {
      this.deleteConfirmationDialog = false;
    },
    closePhotoEnlarge: function() {
      this.photoEnlargeDialog = false;
    },
    acceptPhoto: function() {
      this.photo._links.delete;
      this.photo.approved = true;
      PhotoData.savePhoto(this.selfPath, this.photo, this.saveHandler);
    },
    focusHandler: function() {
      this.photo._links.delete;
      this.photo.fileName = this.fileName + "." + this.fileExtension;
      PhotoData.savePhoto(this.selfPath, this.photo, this.saveHandler);
    },
    rejectPhoto: function() {
      this.photo._links.delete;
      this.photo.approved = false;
      PhotoData.savePhoto(this.selfPath, this.photo, this.saveHandler);
    },
    loadFailHandler: function() {
      this.imageLoadFailed = true;
    },
    descriptionBlurHandler: function() {
      this.photo._links.delete;
      PhotoData.savePhoto(this.selfPath, this.photo, this.saveHandler);
    }
  }
};
</script>

<style lang="scss">
.v-progress-linear {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  width: 50%;
}

.v-dialog {
  position: relative;
  max-height: 60%;
}

.v-dialog.crop-modal {
  overflow-x: hidden;

  img {
    min-width: 300px;
    min-height: 700px;
  }
}

.crop-btn {
  height: 100%;
  &:hover button {
    opacity: 1;
  }
  button {
    opacity: 0;

    transition: opacity 0.4s;
  }
}

.thumbnail-open {
  text-align: center;
}
</style>