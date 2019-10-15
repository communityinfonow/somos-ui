/** Generic text input to be used everywhere */
<template>
  <input type="text" v-model="text" v-on:keyup="keyupHandler" v-on:keydown="keydownHandler" />
</template>

<script>
import { keyTracking } from "../../mixins/key-tracking";
import { store } from "../../store";
export default {
  name: "TextInput",
  data() {
    return { text: "" };
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