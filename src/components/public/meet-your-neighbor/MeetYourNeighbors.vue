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
        <!-- <v-img class="hidden-xs-only" id="som" :src="require('./som.svg')"></v-img> -->
      </div>

      <h1>meet your neighbors</h1>

      <v-row class="content">
        <v-col cols="12" sm="6" class="left">
          <div v-on:click="cycleNeighbors1" class="profile-container">
            <transition name="forward-cycle">
              <NeighborProfile
                right
                :name="currentNeighbor1.name"
                :story="currentNeighbor1.story"
                :lazyImage="currentNeighbor1.lazyImage"
                :image="currentNeighbor1.image"
                :key="neighbor1Index"
              >
                <CircleTabs
                  :index="neighbor1Index"
                  :count="neighbors1.length"
                  class="circle-tab-grouping"
                />
              </NeighborProfile>
            </transition>
          </div>
        </v-col>
        <v-col cols="12" sm="6" class="right">
          <div v-on:click="cycleNeighbors2" class="profile-container">
            <transition name="forward-cycle">
              <NeighborProfile
                left
                :name="currentNeighbor2.name"
                :story="currentNeighbor2.story"
                :lazyImage="currentNeighbor2.lazyImage"
                :image="currentNeighbor2.image"
                :key="neighbor2Index"
              >
                <CircleTabs
                  :index="neighbor2Index"
                  :count="neighbors2.length"
                  class="circle-tab-grouping"
                />
              </NeighborProfile>
            </transition>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Angle from "../shared/Angle";
import globals from "../../../globals";
import NeighborProfile from "./NeighborProfile";
import CircleTabs from "../shared/CircleTabs";
import Vue from "vue";
export default {
  name: "MeetYourNeighbors",
  components: {
    Angle,
    NeighborProfile,
    CircleTabs
  },
  data() {
    return {
      neighbors1: [
        {
          name: "Name12",
          story:
            "this is my very compelling story. definitely more compelling than the other person's.",
          lazyImage: require("./jen.png"),
          image: require("./jen_@2x.png")
        },
        {
          name: "Name1",
          story: "this is my very compelling story",
          lazyImage: require("./jack.png"),
          image: require("./jack_@2x.png")
        }
      ],
      neighbors2: [
        {
          name: "Name1",
          story: "this is my very compelling story",
          lazyImage: require("./jack.png"),
          image: require("./jack_@2x.png")
        }
      ],
      neighbor1Index: 0,
      neighbor2Index: 0,
      yellow: globals.yellow,
      secondaryBlue: globals.mainLightBlue,
      eventBus: new Vue()
    };
  },
  methods: {
    cycleNeighbors(index, neighborsList) {
      if (index < neighborsList.length) {
        index = index + 1;
      } else {
        index = 0;
      }
    },
    cycleNeighbors1() {
      this.eventBus.$emit("click");
      if (this.neighbor1Index < this.neighbors1.length - 1) {
        this.neighbor1Index++;
      } else {
        this.neighbor1Index = 0;
      }
    },
    cycleNeighbors2() {
      this.eventBus.$emit("click");
      if (this.neighbor2Index < this.neighbors2.length - 1) {
        this.neighbor2Index++;
      } else {
        this.neighbor2Index = 0;
      }
    }
  },
  computed: {
    currentNeighbor1() {
      return this.neighbors1[this.neighbor1Index];
    },
    currentNeighbor2() {
      return this.neighbors2[this.neighbor2Index];
    }
  }
};
</script>

<style lang="scss" >
.forward-cycle-enter,
.backward-cycle-leave-active {
  transform: translateY(100vh);
}

.forward-cycle-leave-active,
.backward-cycle-enter-active {
  transform: translateY(-100vh);
}

.forward-cycle-enter-active,
.forward-cycle-leave-active {
  transition: all 0.5s;
}

.backward-cycle-enter-active,
.backward-cycle-leave-active {
  transition: all 50ms;
}

.profile-container {
  position: relative;
  height: 100%;
  top: 30px;
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
  // top: 280px;
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
  }

  .right {
    background: $main-light-blue;
    text-align: left;
    margin-left: 0;
    padding-left: 0;
  }
}

.circle-tab-grouping {
  position: absolute;
  width: 100%;
}

.left {
  .profile-image {
    right: -0.2px;
    padding-left: 15px;
  }
  .profile-info {
    left: 0;
  }

  .circle-tab-grouping {
    top: 400px;
  }
}

.right {
  .profile-info {
    right: 0;
  }
  .profile-image {
    padding-right: 15px;
    left: -0.2px;
  }

  .profile-container {
    top: 70px;
  }

  .circle-tab-grouping {
    top: 400px;
  }
}
</style>