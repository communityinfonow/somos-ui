<template>
  <div>
    <v-card hover>
      <v-skeleton-loader class="mx-auto" height="100%" type="image" v-if="!loaded"></v-skeleton-loader>
      <!-- TODO: lazy load images with a lesser quality version of the photo. Might be a way to do this server-side? -->
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
            rules="[v => !!v || 'Description is required']"
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
      <vue-cropper
        ref="crop"
        alt="photo.description"
        :src="photo._links['photo-file'].href"
        :aspect-ratio="16 / 9"
        :img-style="{ width: '100%', height: '100%'}"
        :zoomable="false"
        :viewMode="2"
      ></vue-cropper>
      <v-content>
        <v-row justify="end">
          <v-col cols="2">
            <v-btn primary block @click.stop="cropImage">Accept</v-btn>
          </v-col>
          <v-col cols="2">
            <v-btn secondary block @click.stop="closePhotoEnlarge">Cancel</v-btn>
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
      imageLoadFailed: false
    };
  },
  props: ["photoObj", "deleteHandler"],
  components: { VueCropper },
  computed: {
    fileType: function() {
      var type = this.photoObj.fileName.split(".")[1];
      return type === "jpeg" || type === "jpg" ? "jpeg" : "png"; //TODO need to accept all kinds of images. use MIME type
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
    }
  },
  methods: {
    imageLoaded() {
      this.loaded = true;
    },
    openModal() {
      this.photoEnlargeDialog = true;
    },
    cropImage() {
      this.$refs.crop.getCroppedCanvas().toBlob(
        blob => {
          this.cropImg = URL.createObjectURL(blob);
          PhotoData.replacePhoto(
            this.selfPath,
            new File([blob], this.photo.fileName, {
              type: "image/" + this.fileType.toLowerCase()
            }),
            response => {
              this.photo = response;
            }
          );
        },
        "image/" + this.fileType.toLowerCase(),
        1.0
      );
      this.closePhotoEnlarge();
    },
    deletePhoto: function() {
      this.closeModal();
      let self = this;
      PhotoData.delete(this.selfPath, response => {
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
      this.photo._links.delete; // TODO: needs a temporary delete or custom object creation from the photo object
      this.photo.approved = true;
      PhotoData.savePhoto(this.selfPath, this.photo, this.saveHandler);
    },
    focusHandler: function() {
      // TODO: validation
      this.photo._links.delete;
      this.photo.fileName = this.fileName + "." + this.fileExtension;
      PhotoData.savePhoto(this.selfPath, this.photo, this.saveHandler);
    },
    rejectPhoto: function() {
      this.photo._links.delete;
      this.photo.approved = false;
      PhotoData.savePhoto(this.selfPath, this.photo, this.saveHandler);
    },
    saveHandler: function(response) {},
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
</style>