/**Big ol' component encompassing all that is photo upload */

// TODO: form with steps that can be implemented as full-screen or a modal
<template>
  <div>
    <section id="step-1">
      <!-- TODO: Photo Upload button -->
    </section>
    <section id="step-2">
      <AddressSearch></AddressSearch>
      <GeoMap />
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
export default {
  name: "PhotoUpload",
  components: {
    AddressSearch,
    ContactForm,
    GeoMap
  }
};
</script>

<style>
</style>