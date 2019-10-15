/** Address or Place searching */
<template>
  <div>
    <input
      type="radio"
      name="type-selector"
      id="address-selector"
      value="address"
      v-model="selected"
    />
    <label for="address-selector">Address</label>
    <input type="radio" name="type-selector" id="place-selector" value="place" v-model="selected" />
    <label for="place-selector">Place</label>
  </div>
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
