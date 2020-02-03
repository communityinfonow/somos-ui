<template>
  <div id="meet-your-neighbors">
    <v-container class="my-0 py-0">
      <div class="angle-container">
        <Angle
          id="meet-your-neighbors-topper"
          :empty="true"
          :colorLeft="yellow"
          :colorRight="yellow"
          class="hidden-sm-and-up"
        ></Angle>
      </div>

      <h1>meet your neighbors</h1>

      <v-row class="content">
        <v-col cols="12" sm="6" class="left mx-0 px-0" @click="cycleNeighbors">
          <NeighborProfilesContainer
            :neighbors="leftNeighbors"
            :neighborsIndex="neighborsIndex"
            up
          />
        </v-col>
        <v-col cols="12" sm="6" class="right mx-0 px-0" @click="cycleNeighbors">
          <NeighborProfilesContainer :neighbors="rightNeighbors" :neighborsIndex="neighborsIndex" />
        </v-col>
      </v-row>
      <v-img id="mos" :src="require('../Mos.svg')"></v-img>
    </v-container>
  </div>
</template>

<script>
import Angle from "../shared/Angle";
import globals from "../../../globals";
import NeighborProfilesContainer from "./NeighborProfilesContainer";
import Vue from "vue";
export default {
  name: "MeetYourNeighbors",
  components: {
    Angle,
    NeighborProfilesContainer
  },
  data() {
    return {
      neighbors: [
        {
          left: {
            name: "Name12",
            story:
              "this is my very compelling story. definitely more compelling than the other person's.",
            lazyImage: require("./jen.png"),
            image: require("./jen_@2x.png")
          },
          right: {
            name: "Name1",
            story: "this is my very compelling story",
            lazyImage: require("./jack.png"),
            image: require("./jack_@2x.png")
          }
        },
        {
          left: {
            name: "Name1",
            story: "this is my very compelling story",
            lazyImage: require("./jack.png"),
            image: require("./jack_@2x.png")
          },
          right: {
            name: "Name12",
            story:
              "this is my very compelling story. definitely more compelling than the other person's.",
            lazyImage: require("./jen.png"),
            image: require("./jen_@2x.png")
          }
        }
      ],
      yellow: globals.yellow,
      secondaryBlue: globals.mainLightBlue,
      eventBus: new Vue(),
      neighborsIndex: 0
    };
  },
  methods: {
    cycleNeighbors() {
      if (this.neighborsIndex < this.neighbors.length - 1) {
        this.neighborsIndex++;
      } else {
        this.neighborsIndex = 0;
      }
    }
  },

  computed: {
    leftNeighbors() {
      return this.neighbors.map(neighbor => neighbor.left);
    },
    rightNeighbors() {
      return this.neighbors.map(neighbor => neighbor.right);
    }
  }
};
</script>

<style lang="scss" >
#meet-your-neighbors .container {
  position: relative;
}
#mos {
  position: absolute;
  bottom: -20px;
  left: 50%;
  z-index: 1;
}

p {
  letter-spacing: 0.21px;
  font-family: "Montserrat";
  font-weight: 600;
  margin-bottom: 30px;
}

h2 {
  margin-bottom: 15px;
}

@media (max-width: 961px) {
  #meet-your-neighbors {
    background: $main-yellow;
  }
}

#meet-your-neighbors h1 {
  position: relative;
  margin-bottom: 50px;
  text-align: center;
  width: 100%;
  top: 30px;
  z-index: 1;
}

#meet-your-neighbors-topper {
  bottom: 0;
  position: absolute;
  width: 100%;
  z-index: 0;
}

.angle-container {
  position: relative;
  height: auto;
  bottom: 0;
}

.content {
  min-height: 700px;
  [class^="col"] {
    z-index: 0;
  }

  .left {
    background: $main-yellow;
    text-align: right;
    margin-right: 0;
    padding-right: 0;
    position: relative;
  }

  .right {
    background: $main-light-blue;
    text-align: left;
    margin-left: 0;
    padding-left: 0;
    position: relative;
  }
}

.left {
  .profile-image {
    right: -50%;
    padding-left: 32px;
  }
  .profile-info {
    left: 0;
    top: 0;
  }

  .circle-tab-grouping {
    bottom: 0;
  }
}

.right {
  .profile-info {
    right: 0;
    top: 0;
  }
  .profile-image {
    padding-right: 32px;
  }

  .profile-container {
    top: 70px;
  }

  .circle-tab-grouping {
    bottom: 0;
  }
}

@media (max-width: 600px) {
  .left,
  .right {
    .profile-image {
      top: 0;
      right: 0;
      padding-left: 64px;
      padding-right: 64px;
    }
    .profile-info {
      top: unset;
      padding-left: 64px;
      padding-right: 64px;
      text-align: left;
    }

    .profile-container {
      top: 0;
    }

    .profile-grouping {
      padding-bottom: 54px;
      padding-top: 55px;
    }
  }
}
</style>