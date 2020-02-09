<template>
  <header id="header">
    <!-- <v-navigation-drawer v-model="sidebar" app right class="hidden-sm-and-up">
      <v-list>
        <v-list-item v-for="(link, index) in links" :key="index">
          <v-list-item-content>
            <v-list-item-title v-text="link.text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>-->
    <v-container class="mb-0 pb-0">
      <v-row>
        <v-col cols="12">
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
      <!-- <button class="hidden-sm-and-up" id="somos-hamburger-menu" @click="sidebar = !sidebar">
        <v-icon class="mdi-menu"></v-icon>
      </button>
      <v-row class="hidden-xs-only hidden-sm-only">
        <v-col cols="12">
          <v-row justify="space-around" id="nav-links">
            <a
              class="somos-link"
              v-for="(link, index) in links"
              :key="index"
              :href="link.link"
            >{{link.text}}</a>
          </v-row>
        </v-col>
      </v-row>-->
    </v-container>
  </header>
</template>

<script>
import globals from "../../globals";
export default {
  name: "Header",
  data() {
    return {
      links: [
        { text: "featured stories", link: "#featured-stories" },
        { text: "compare", link: "#compare" },
        { text: "life expectancy", link: "#life-expectancy" },
        { text: "interactive map", link: "#interactive-map" },
        { text: "make a difference", link: "#make-a-difference" }
      ],
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
  //   , props: ['links'] TODO
};
</script>

<style lang="scss" scoped>
.somos-link {
  text-align: left;
  font: 500 1.286rem Bebas Neue;
  letter-spacing: 3.6px;
  color: $main-dark-blue;
  text-transform: uppercase;
  text-decoration: none;

  &:hover {
    color: $main-light-blue;
  }

  transition: color 200ms ease-in-out;
}

.color-block {
  height: 9px;

  @media (max-width: 600px) {
    height: 20px;
  }

  #somos-hamburger-menu {
    float: right;
  }
}
</style>