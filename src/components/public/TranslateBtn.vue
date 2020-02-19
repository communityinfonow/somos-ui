<template>
  <v-btn-toggle mandatory v-model="selectedLanguage">
    <v-btn v-for="language in languages" :key="language.lang" v-html="language.label"></v-btn>
  </v-btn-toggle>
</template>

<script>
import { languageStore } from "@/store.js";
export default {
  name: "TranslateBtn",
  data() {
    return {
      storeState: languageStore.state,
      selectedLanguage: null
    };
  },
  computed: {
    languages() {
      return languageStore.languages;
    }
  },
  watch: {
    selectedLanguage(newLanguageModel) {
      languageStore.setLanguageCode(this.languages[newLanguageModel].code);
    }
  }
};
</script>

<style>
</style>