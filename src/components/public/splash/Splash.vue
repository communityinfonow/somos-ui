<template>
  <v-container>
    <v-row>
      <v-col cols="6">
        <Title />
        <p>
          At the heart of San Antonio’s vibrant community is a diverse
          population of people with one thing in common: A love for San
          Antonio. However, not every neighborhood in San Antonio
          experiences equal benefits. Where you live could mean the
          difference in 20 years on your life expectancy. Somos
          Neighbors is connecting our San Antonian neighbors together
          to celebrate our similarities while creating a united stance
          against social inequalities such as the age disparity gap
          between communities.
        </p>
        <SomosButton @click="clickHandler">EXPLORE COMMUNITIES</SomosButton>
      </v-col>
      <v-col cols="6">
        <OverlappingImages
          :topLazySource=" require('./shutterstock_244190287.png')"
          :topSource="require('./shutterstock_244190287@2x.png')"
          :bottomLazySource="require('./shutterstock_379530769.png')"
          :bottomSource="require('./shutterstock_379530769@2x.png')"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Title from "./Title";
import SomosButton from "../shared/SomosButton";
import OverlappingImages from "./OverlappingImages";
export default {
  name: "Splash",
  components: {
    Title,
    OverlappingImages,
    SomosButton
  },
  data() {
    return {};
  },
  methods: {
    clickHandler() {}
  }
};
</script>

<style lang="scss" scoped>
p {
  text-align: left;
  font: 600 16px/22px Montserrat;
  letter-spacing: 0.24px;
  color: $main-dark-blue;
  opacity: 1;
}
</style>