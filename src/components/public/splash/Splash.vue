<template>
  <v-container id="splash">
    <v-row class="mb-5">
      <v-col cols="12">
        <v-img class="somos-logo" :src="require('../somos-logo.svg')"></v-img>
        <!-- TODO component for log? -->
      </v-col>
    </v-row>
    <v-row class="angle-container">
      <v-col cols="12" sm="6">
        <Title />
        <Paragraph />
      </v-col>
      <v-col cols="12" sm="6" class="hidden-xs-only">
        <OverlappingImages
          :topLazySource=" require('./shutterstock_244190287.png')"
          :topSource="require('./shutterstock_244190287@2x.png')"
          :bottomLazySource="require('./shutterstock_379530769.png')"
          :bottomSource="require('./shutterstock_379530769@2x.png')"
        />
      </v-col>
      <Angle
        id="meet-your-neighbors-topper"
        :empty="true"
        :colorLeft="yellow"
        :colorRight="secondaryBlue"
        class="hidden-xs-only"
      ></Angle>
    </v-row>
  </v-container>
</template>

<script>
import Title from "./Title";
import SomosButton from "@/components/shared/SomosButton";
import OverlappingImages from "@/components/public/shared/OverlappingImages";
import Angle from "../shared/Angle";
import globals from "../../../globals";
import Paragraph from "./Paragraph";
export default {
  name: "Splash",
  components: {
    Title,
    OverlappingImages,
    SomosButton,
    Angle,
    Paragraph
  },
  data() {
    return { yellow: globals.yellow, secondaryBlue: globals.mainLightBlue };
  },
  methods: {
    clickHandler() {}
  }
};
</script>

<style lang="scss" scoped>
p {
  text-align: left;
  font: 700 1.143rem/1.6rem Montserrat;
  letter-spacing: 0.24px;
  color: $main-dark-blue;
}

.somos-logo {
  margin: auto;
  width: 30%;
}

#meet-your-neighbors-topper {
  top: 280px;
  bottom: -40px;
  position: absolute;
  width: 100%;
  z-index: 0;
}

@media (max-width: 600px) {
  #explore-communities {
    margin: auto;
    width: 100%;
  }

  .somos-logo {
    width: 60%;
  }
  p {
    font-size: 1rem;
  }
}

@media (max-width: 960px) {
  p {
    font-size: 1.071rem;
  }
}

@media (min-width: 961px) and (max-width: 1264px) {
  .somos-logo {
    width: 40%;
  }
}
</style>