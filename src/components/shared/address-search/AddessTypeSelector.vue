/** Address or Place searching */
<template>
  <v-radio-group v-model="selected" row dense>
    <v-radio label="Address" value="address" :color="mainDarkBlue"></v-radio>
    <v-radio label="Place" value="place" :color="mainDarkBlue"></v-radio>
  </v-radio-group>
</template>

<script>
import { store } from "../../../store";
import globals from "../../../globals";
export default {
  name: "AddressTypeSelector",
  components: {},
  data() {
    return {
      selected: "address", // address selected by default
      state: store.state,
      mainDarkBlue: globals.mainDarkBlue
    };
  },
  watch: {
    selected: function(type) {
      store.setAddressSearchType(type);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
