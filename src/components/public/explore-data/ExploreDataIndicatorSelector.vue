<template>
  <v-menu offset-y>
    <template v-slot:activator="{on}">
      <v-btn block v-on="on" id="change-indicator">{{buttonText}}</v-btn>
    </template>
    <v-list>
      <v-list-item
        v-for="indicator in indicators"
        :key="indicator.id"
        @click="selectionHandler(indicator)"
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
      selected: false,
      changeIndicatorText: { en: "Change Indicator", es: "" },
      selectIndicatorText: { en: "Select Indicator", es: "" }
    };
  },
  methods: {
    selectionHandler(indicator) {
      this.$emit("select", indicator);
      this.selected = true;
    }
  },
  computed: {
    buttonText() {
      return this.selected
        ? this.translateText(this.changeIndicatorText)
        : this.translateText(this.selectIndicatorText);
    }
  }
};
</script>

<style lang="scss">
#change-indicator {
  background: $main-dark-blue !important;
  color: #ffffff !important;
  white-space: normal;
  font-weight: bold;
  height: 50px;
  font-size: 16px;
}
</style>