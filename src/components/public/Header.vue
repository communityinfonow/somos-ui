<template>
  <header id="header">
    <v-container class="my-0 py-0">
      <v-row>
        <v-col cols="12" class="pt-0">
          <v-row justify="space-between">
            <div
              class="color-block"
              v-for="(color, index) in blockColors"
              :key="index"
              :style="{backgroundColor: color, width: colorBlockWidth}"
            ></div>
          </v-row>
        </v-col>
      </v-row>
      <TranslateBtn />
    </v-container>
  </header>
</template>

<script>
import globals from "../../globals";
import TranslateBtn from "@/components/public/TranslateBtn";
export default {
  name: "Header",
  components: {
    TranslateBtn
  },
  data() {
    return {
      blockColors: [
        globals.darkPink,
        globals.yellow,
        globals.greyGreen,
        globals.mainLightBlue
      ],
      sidebar: false
    };
  },
  computed: {
    colorBlockWidth() {
      return 100 / this.blockColors.length + "%";
    }
  }
};
</script>

<style lang="scss" scoped>
.color-block {
  height: 9px;

  @media (max-width: 600px) {
    height: 20px;
  }
}
</style>