/** Generic text input to be used everywhere */
<template>
  <v-autocomplete
    label="Search for location"
    :items="storeState.searchResults"
    v-on:keyup="keyupHandler"
    v-on:keydown="keydownHandler"
    :search-input.sync="text"
    hide-no-data
    item-text="name"
    return-object
    v-model="selected"
    no-filter
    :loading="loading"
  ></v-autocomplete>
</template>

<script>
import { keyTracking } from "../../mixins/key-tracking";
import { store } from "../../store";
import TextInput from "./TextInput";
export default {
  name: "AddressInput",
  data() {
    return { text: "", selected: null, storeState: store.state };
  },
  props: ["loading"],
  components: {
    TextInput
  },
  mixins: [keyTracking],
  watch: {
    isDoneTyping: function(isDone) {
      store.updateTypingTracker(isDone);
    },
    text: function(newText) {
      store.updateSearchString(newText);
    },
    selected: function(selectedLocation) {
      store.setSelectedLocation(selectedLocation);
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