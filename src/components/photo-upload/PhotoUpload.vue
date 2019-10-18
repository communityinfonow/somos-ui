/**Big ol' component encompassing all that is photo upload */
// TODO: save file with other things but possibly generate unique file name from DB first before saving the file back into a secret assets folder on the server

<template>
  <div>
    <section id="step-1">
      <PhotoInput />
    </section>
    <section id="step-2">
      <AddressSearch></AddressSearch>
      <GeoMap :coordinates="storeState.selectedLocation.coordinates" />
    </section>
    <section id="step-3">
      <ContactForm></ContactForm>
    </section>
    <SubmitButton @click="submitUpload" />
  </div>
</template>

<script>
import AddressSearch from "../shared/address-search/AddressSearch";
import ContactForm from "./ContactForm";
import GeoMap from "../map/Map";
import PhotoInput from "./PhotoInput";
import { store } from "../../store";
import SubmitButton from "../shared/SubmitButton";
import PhotoData from "../../api/photo-data";

export default {
  name: "PhotoUpload",
  components: {
    AddressSearch,
    ContactForm,
    GeoMap,
    PhotoInput,
    SubmitButton
  },
  data() {
    return {
      storeState: store.state
    };
  },
  methods: {
    submitUpload() {
      photoData.savePhotos({
        contactInfo: {
          firstName: storeState.contactFirstName,
          lastName: storeState.contactLastName,
          email: storeState.contactEmail
        },
        photos: storeState.photos
      });
    }
  }
};
</script>

<style>
</style>