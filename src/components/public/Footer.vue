<template>
  <footer>
    <v-img class="somos-logo" :src="require('./somos-logo.svg')"></v-img>
    <v-img id="cinow-logo" :src="require('./CI Now.png')"></v-img>
    <v-row>
      <v-col cols="12" md="6">
        <v-row justify="start" id="nav-links">
          <span v-for="(link, index) in links.left" :key="index" :href="link.link" class="px-5">
            <a class="somos-link">{{link.text}}</a>
          </span>
        </v-row>
      </v-col>
      <v-col cols="12" md="6">
        <v-row justify="end" id="nav-links">
          <span v-for="(link, index) in links.right" :key="index" :href="link.link" class="px-5">
            <a class="somos-link">{{link.text}}</a>
          </span>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-row justify="space-between">
          <div class="color-block" :style="{backgroundColor: blockColors[0]}"></div>
          <div class="color-block" :style="{backgroundColor: blockColors[1]}"></div>
        </v-row>
        <v-row justify="start">
          <a href="#" class="px-2">About the data</a>

          <a href="#" class="px-2">Privacy Policy</a>
        </v-row>
      </v-col>
    </v-row>
  </footer>
</template>

<script>
import globals from "@/globals.js";
export default {
  name: "Footer",
  data() {
    return {
      links: {
        left: [
          { text: "compare", link: "#compare" },
          { text: "featured stories", link: "#featured-stories" }
        ],

        right: [
          { text: "life expectancy", link: "#life-expectancy" },
          { text: "interactive map", link: "#interactive-map" }
        ]
      },
      blockColors: [globals.mainDarkBlue, globals.mainLightBlue]
    };
  }
};
</script>

<style lang="scss" scoped>
footer {
  .somos-logo {
    width: 273px;
    margin: auto;
    margin-bottom: 30px;
  }
  position: absolute;
  width: 100%;
  top: 20px;
  padding-bottom: 44px;
}

#cinow-logo {
  width: 250px;

  margin: auto;
}

.color-block {
  height: 9px;
  width: 50%;
}

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
</style>