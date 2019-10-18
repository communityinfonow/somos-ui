// TODO: vuetify this thing
<template>
  <ul>
    <li
      v-for="(suggestion, index) in searchSuggestions"
      :key="index"
      v-on:click="selectAddress(suggestion)"
    >
      <div>{{suggestion.name}}</div>
    </li>
  </ul>
</template>

<script>
import { store } from "../../store";
export default {
  name: "SearchSuggest",
  props: ["searchSuggestions"],
  methods: {
    selectAddress(selectedAddress) {
      store.setSelectedLocation(selectedAddress);
    }
  }
};
</script>

<style scoped>
ul {
  list-style: none;
}

li {
  cursor: pointer;
  background: #fbfbfb;
  width: 270px;
  margin: auto;
  height: 40px;
  text-align: center;
  font-size: 14pt;
}
</style>