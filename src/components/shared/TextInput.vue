<template>
  <input type="text" :value="text" @input="$emit('input', $event.target.value)" />
</template>

<script>
export default {
  name: "TextInput",
  props: {
    text: String
  },
  data() {
    return {};
  }
};
</script>

<style>
</style>