/** Address or Place searching */
<template>
  <v-radio-group v-model="selected" row dense="true" prepend-icon="mdi-map">
    <v-radio label="Address" value="address"></v-radio>
    <v-radio label="Place" value="place"></v-radio>
  </v-radio-group>
</template>

<script>
import { store } from "../../../store";
export default {
  name: "AddressTypeSelector",
  components: {},
  data() {
    return {
      selected: "address", // address selected by default
      state: store.state
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
