/** Generic text input to be used everywhere */
<template>
  <v-autocomplete
    :label="label"
    :items="searchItems"
    v-on:keyup="keyupHandler"
    v-on:keydown="keydownHandler"
    :search-input.sync="text"
    hide-no-data
    :messages="message"
    item-text="name"
    return-object
    v-model="selected"
    no-filter
    :loading="loading"
    filled
    dense
    ref="addressInput"
  ></v-autocomplete>
</template>

<script>
import { keyTracking } from "../../../mixins/key-tracking";

export default {
  name: "AddressInput",
  data() {
    return { text: "", selected: null, message: "" };
  },
  props: ["loading", "searchItems", "label"],
  components: {},
  mixins: [keyTracking],
  watch: {
    isDoneTyping: function(isDone) {
      this.$emit("done-typing", this.text);
    },
    selected: function(selectedLocation) {
      this.$emit("selected", selectedLocation);
    },
    searchItems(newItems) {
      if (newItems.length === 0) {
        this.message = "No results. Please try again";
      } else {
        this.message = "";
      }
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