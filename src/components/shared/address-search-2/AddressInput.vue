/** Generic text input to be used everywhere */
<template>
  <v-autocomplete
    label="Search for location"
    :items="searchItems"
    v-on:keyup="keyupHandler"
    v-on:keydown="keydownHandler"
    :search-input.sync="text"
    hide-no-data
    item-text="name"
    return-object
    v-model="selected"
    no-filter
    :loading="loading"
    filled
    dense
  ></v-autocomplete>
</template>

<script>
import { keyTracking } from "../../../mixins/key-tracking";

export default {
  name: "AddressInput",
  data() {
    return { text: "", selected: null };
  },
  props: ["loading", "searchItems"],
  components: {},
  mixins: [keyTracking],
  watch: {
    isDoneTyping: function(isDone) {
      this.$emit("done-typing", this.text);
    },
    selected: function(selectedLocation) {
      this.$emit("selected", selectedLocation);
    }
  }
};
</script>

<style scoped>
input {
  height: 20px;
  border: 1px solid grey;
  width: 270px;
}
</style>