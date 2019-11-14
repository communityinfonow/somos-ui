<template>
  <!-- TODO: on crop, save the original version and flag cropped? or flag crop-backup? -->
  <div>
    <v-card hover>
      <v-img :src="photoSource" @click.stop="photoEnlargeDialog = true">
        <v-row justify="center" align="center" class="crop-btn">
          <v-col cols="4" transition="fade-transition">
            <v-btn @click.stop="photoEnlargeDialog = true" color="blue" block>Crop</v-btn>
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
            hide-details
            outlined
            label="Description"
            :model="photo.description"
            @blur="descriptionBlurHandler"
            auto-grow
            :rows="photoDescriptionLength"
          ></v-textarea>
        </v-list-item-content>
      </v-list-item>

      <v-card-actions>
        <v-container>
          <v-row v-if="!photo.approved">
            <v-col cols="12" class="pt-0">
              <v-btn color="green" block @click="acceptPhoto">Approve</v-btn>
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
        >Are you sure you want to delete {{photoObj.fileName}}?</v-card-title>
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="secondary" text @click="closeModal">No</v-btn>
          <v-btn color="primary" text @click="deletePhoto">Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="photoEnlargeDialog" width="50%" crop-modal>
      <vue-cropper
        ref="crop"
        :src="photoSource"
        alt="photo.description"
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
import "cropperjs/dist/cropper.css";
export default {
  name: "PhotoThumbnail",
  data() {
    return {
      photo: this.photoObj,
      deleteConfirmationDialog: false,
      showPhotoDescription: false,
      photoEnlargeDialog: false,
      fileName: this.photoObj.fileName.split(".")[0],
      fileType: this.photoObj.fileName.split(".")[1],
      cropImg: null
    };
  },
  props: ["photoObj", "deleteHandler"],
  components: { VueCropper },
  computed: {
    croppedFile() {
      return;
    },
    photoSource: function() {
      return this.photo._links["photo-file"].href;
    },
    selfPath: function() {
      return this.photo._links.self.href;
    },
    fileExtension: function() {
      return this.photo.fileName.split(".")[1];
    },
    photoDescriptionLength: function() {
      return this.photo.description && this.photo.description.length() ? 5 : 1;
    },
    hideFilenameValidation: function() {
      return true;
    }
  },
  methods: {
    cropImage() {
      this.$refs.crop.getCroppedCanvas().toBlob(
        blob => {
          this.cropImg = URL.createObjectURL(blob);
          PhotoData.replacePhoto(
            this.selfPath,
            new File([blob], this.photoObj.fileName, {
              type: "image/" + this.fileType.toLowerCase()
            }),
            response => {
              this.photo = response;
            }
          );
        },
        "image/" + this.fileType.toLowerCase(),
        0.95
      );
      this.closePhotoEnlarge();
    },
    deletePhoto: function() {
      this.closeModal();
      let self = this;
      PhotoData.delete(this.selfPath, response => {
        self.$emit("delete", self.photoObj);
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
    descriptionBlurHandler: function() {
      this.photo._links.delete;
      PhotoData.savePhoto(this.selfPath, this.photo, this.saveHandler);
    }
  }
};
</script>

<style lang="scss" scoped>
.crop-modal {
  overflow-x: hidden;
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