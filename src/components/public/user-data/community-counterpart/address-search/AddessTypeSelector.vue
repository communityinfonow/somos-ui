/** Address or Place searching */
<template>
  <v-radio-group v-model="selected" row dense>
    <!-- <template v-slot:label :hidden="true">location type selector</template> -->
    <v-radio label="Address" value="address" :color="mainDarkBlue"></v-radio>
    <v-radio label="Place" value="place" :color="mainDarkBlue"></v-radio>
  </v-radio-group>
</template>

<script>
import globals from "../../../../../globals";
export default {
  name: "AddressTypeSelector",
  components: {},
  data() {
    return {
      selected: "address", // address selected by default
      mainDarkBlue: globals.mainDarkBlue
    };
  },
  watch: {
    selected: function(type) {
      this.$emit("selected", type);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
