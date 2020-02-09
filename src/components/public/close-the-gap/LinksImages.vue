<template>
  <v-row id="links-images">
    <v-col cols="12" md="6">
      <v-tabs v-model="tabs" color="transparent" slider-color="primary">
        <v-tab v-for="(item, index) in translatedTabItems" :key="index">{{item.title}}</v-tab>
      </v-tabs>
      <v-tabs-items v-model="tabs">
        <v-tab-item v-for="(item, index) in translatedTabItems" :key="index"></v-tab-item>
      </v-tabs-items>
    </v-col>
    <v-col cols="12" md="6" class="hidden-sm-and-down">
      <OverlappingImages
        :topSource="require('./shutterstock_160644944.png')"
        :topLazySource="require('./shutterstock_160644944@2x.png')"
        :bottomSource="require('./shutterstock_367286867.png')"
        :bottomLazySource="require('./shutterstock_367286867@2x.png')"
      />
    </v-col>
  </v-row>
</template>

<script>
import OverlappingImages from "@/components/public/shared/OverlappingImages";
import { translate } from "@/mixins/translate.js";
const links = {
  policies: {
    href:
      "https://www.countyhealthrankings.org/take-action-to-improve-health/what-works-for-health/policies",
    label: "countyhealthrankings.org"
  }
};
export default {
  name: "LinksImages",
  mixins: [translate],
  components: {
    OverlappingImages
  },
  data() {
    return {
      tabItems: [
        {
          en: {
            title: "learn",
            links: [
              {
                label: "Discover policies and programs that work",
                link: links.policies
              }
            ]
          },
          es: null
        },
        { en: { title: "speak" }, es: null },
        { en: { title: "act" }, es: null }
      ],
      tabs: null
    };
  },
  computed: {
    translatedTabItems() {
      return this.translateText(this.tabItems);
    }
  }
};
</script>

<style>
#links-images {
  height: 500px;
}
</style>