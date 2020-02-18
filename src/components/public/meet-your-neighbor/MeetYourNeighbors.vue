<template>
  <div id="meet-your-neighbors">
    <v-container class="my-0 py-0">
      <div class="angle-container"></div>

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
            name: "Patti",
            story: {
              en:
                "As a white woman from a middle class upbringing, Patti was worried that her new West Side neighbors would agree her with suspicion. She could not have been more wrong. Working shoulder-to-shoulder and freely being herself, Patti has felt the acceptance and protection of a close neighborly bond forged over 50 years of shared struggle and laughter. To those who wonder if such community can be real in a place so often stigmatized, she says simply, “Come close.”",
              es: ""
            },
            image: require("./patti.png")
          },
          right: {
            name: "Ana",
            story: {
              en:
                "The house next door to her parents sat vacant for two years before Ana bought it, keen to invest in the West Side neighborhood where she grew up. She knew that just across the road the sidewalks were better and the historic designation boosted home values—but a sense of home and fairness kept her rooted west of the dividing line. The people and parks still warm her heart, but Ana wants to change some things as well, like the way the city invests in infrastructure and neighborhood connectivity. She wants to make sure that every neighborhood in San Antonio is on the right side of the road.",
              es: ""
            },

            image: require("./Ana.png")
          }
        },
        {
          left: {
            name: "Chawanna",
            story: {
              en:
                "Chawanna originally chose to live in Converse to be close to where she worked as a teacher in Judson ISD. When her husband’s job took their small family around the world and back again, she realized it was the community she wanted to keep. Even though her new job takes her all over the city, coming home to Converse feels right. While her kids play outside in their neighborhood, they see other black children and families, and Chawanna catches up with some new neighbors…her former students.",
              es: ""
            },

            image: require("./patti.png")
          },
          right: {
            name: "Patton",
            story: {
              en:
                "Moving to San Antonio from Boston, Patton had two days to find a house near good schools for his three kids. Though he and his wife had always lived in dense, mixed-income neighborhoods, the oak-dense yards and greenbelt in Stone Oak won them over. They saw kids playing in the streets and sidewalks. A week after they moved in, those new friends rang their doorbell, and haven’t stopped ringing it since.",
              es: ""
            },
            image: require("./patton.png")
          }
        },
        {
          left: {
            name: "Edward",
            story: {
              en:
                "Edward didn’t have to look far to find everything he was looking for in a home. His South Side neighborhood had new bakeries, easy access to major roads, and one more important thing: his grandmother. Some of his neighbors have known him his whole life, but there are also plenty of open parcels and new homes to welcome young families looking to invest. Developers bring new businesses regularly as Palo Alto College and Texas A&M-San Antonio continue to grow. Here, he has both a history and a future.",
              es: ""
            },

            image: require("./Edward.png")
          },
          right: {
            name: "Elva",
            story: {
              en:
                "Elva has always been a city girl. With her husband stationed in South Korea and a baby on the way 40 years ago, she chose a near Southeast side home close to her sister with easy access to downtown shops. The fig and avocado trees she planted are still thriving and bearing fruit, and so is the small neighborhood salon she has run since she became a single mother of two small kids. “Home” has been a hard won victory for Elva, but her house and neighborhood have been a source of stability and comfort she can rely on for the years ahead.",
              es: ""
            },
            image: require("./elva.png")
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