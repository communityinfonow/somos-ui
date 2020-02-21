/** Generic text input to be used everywhere */
<template>
  <v-autocomplete
    :label="label"
    :items="searchItems"
    v-on:keyup="keyupHandler"
    v-on:keydown="keydownHandler"
    :search-input.sync="text"
    :messages="messages"
    hide-no-data
    item-text="name"
    return-object
    v-model="selected"
    no-filter
    :loading="loading"
    filled
    dense
    ref="addressInput"
    :no-data-text="messages[0]"
    :error-messages="errorMessage"
  ></v-autocomplete>
</template>

<script>
import { keyTracking } from "../../../mixins/key-tracking";
import translate from "@/mixins/translate";
export default {
  name: "AddressInput",
  data() {
    return {
      text: "",
      selected: null,
      noDataText: {
        en: "This location could not be found, please search again",
        es: ""
      }
    };
  },
  props: ["loading", "searchItems", "label", "messages", "errorMessage"],
  components: {},
  mixins: [keyTracking, translate],
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