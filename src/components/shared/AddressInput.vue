/** Generic text input to be used everywhere */
<template>
  <TextInput v-on:keyup="keyupHandler" v-on:keydown="keydownHandler" v-model="text" />
</template>

<script>
import { keyTracking } from "../../mixins/key-tracking";
import { store } from "../../store";
import TextInput from "./TextInput";
export default {
  name: "AddressInput",
  data() {
    return { text: "" };
  },
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