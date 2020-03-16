<template>
  <v-menu offset-y>
    <template v-slot:activator="{on}">
      <v-btn block v-on="on" id="change-indicator">{{translateText(changeIndicatorText)}}</v-btn>
    </template>
    <v-list>
      <v-list-item
        v-for="indicator in indicators"
        :key="indicator.id"
        @click="$emit('select', indicator)"
      >
        <v-list-item-title class="indicator-item">{{indicator.name}}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import translate from "@/mixins/translate";
export default {
  name: "ExploreDataIndicatorSelector",
  mixins: [translate],
  props: { indicators: Array },
  data() {
    return {
      changeIndicatorText: { en: "Change Indicator", es: "" }
    };
  }
};
</script>

<style>
</style>