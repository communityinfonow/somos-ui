/**Big ol' component encompassing all that is photo upload */
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
  </div>
</template>

<script>
import AddressSearch from "../shared/address-search/AddressSearch";
import ContactForm from "./ContactForm";
import GeoMap from "../map/Map";
import PhotoInput from "./PhotoInput";
import { store } from "../../store";

export default {
  name: "PhotoUpload",
  components: {
    AddressSearch,
    ContactForm,
    GeoMap,
    PhotoInput
  },
  data() {
    return {
      storeState: store.state
    };
  }
};
</script>

<style>
</style>

// TODO: on submit: save file, form info, and containing census tract id 