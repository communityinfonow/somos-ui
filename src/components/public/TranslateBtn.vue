<template>
  <v-btn-toggle mandatory v-model="selectedLanguage" dense id="translate-btn">
    <v-btn v-for="language in languages" :key="language.lang" v-html="language.label"></v-btn>
  </v-btn-toggle>
</template>

<script>
import { languageStore } from "@/store.js";
import globals from "@/globals";
export default {
  name: "TranslateBtn",
  data() {
    return {
      darkBlue: globals.mainDarkBlue,
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
  },
  mounted() {
    this.languages.forEach((language, index) => {
      if (language.code === this.storeState.languageCode) {
        this.selectedLanguage = index;
      }
    });
  }
};
</script>

<style lang="scss">
#translate-btn {
  font: 500 14px Montserrat;
  color: white;
}

.v-btn--active {
  background: $main-dark-blue !important;
  color: white !important;
}
</style>