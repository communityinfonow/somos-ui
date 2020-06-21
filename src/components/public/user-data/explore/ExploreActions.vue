<template>
  <v-row id="explore-actions">
    <v-col cols="12">
      <v-row justify="space-around">
        <v-col cols="12" md="4">
          <v-btn
            block
            @click="newNeighborhood"
            id="change-neighborhood-btn"
          >{{translateText(newNeighborhoodText)}}</v-btn>
        </v-col>
        <v-col cols="12" md="4">
          <v-btn
            block
            v-html="translateText(exploreDataText)"
            @click="$router.push('/explore-data')"
          ></v-btn>
        </v-col>
        <v-col cols="12" md="4">
          <v-menu offset-y>
            <template v-slot:activator="{on}">
              <v-btn block v-on="on" id="change-match-btn">{{translateText(changeYourMatchText)}}</v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="tract in matchedTracts"
                :key="tract.rank"
                @click="setMatch(tract)"
              >
                <v-list-item-title class="tract-item">{{tract.title}}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import { userDataStore } from "../userDataStore.js";
import translate from "@/mixins/translate";
export default {
  name: "ExploreActions",
  mixins: [translate],
  data() {
    return {
      storeState: userDataStore.state,
      newNeighborhoodText: {
        en: "Change your neighborhood",
        es: "Cambia Tu Vecindario"
      },
      exploreDataText: {
        en: "explore data",
        es: "Explora la Información"
      },
      changeYourMatchText: { en: "Change your match", es: "Modifica tu par" }
    };
  },
  methods: {
    newNeighborhood() {
      this.$vuetify.goTo("#find-your-match");
      this.$emit("click:new");
    },
    setMatch(match) {
      userDataStore.setMatchRank(match.rank);
      setTimeout(() => {
        this.$vuetify.goTo("#location-groups");
      }, 600);
    },
    createTractTitles(tract) {
      switch (tract.rank) {
        case 1:
          tract.title = this.translateText({
            en: "Closest Match",
            es: "Par más similar"
          });
          break;
        case 2:
          tract.title = this.translateText({
            en: "2nd Closest Match",
            es: "2do par similar"
          });
          break;
        case 3:
          tract.title = this.translateText({
            en: "3rd Closest Match",
            es: "3er par similar"
          });
          break;
        default:
          tract.title = this.translateText({
            en: tract.rank + "th Closest Match",
            es: tract.rank + "to par similar"
          });
      }
    }
  },
  computed: {
    matchedTracts() {
      let tracts =
        this.storeState.tract && this.storeState.tract.matchedTracts
          ? this.storeState.tract.matchedTracts.sort((a, b) => a.rank - b.rank)
          : [];
      tracts.forEach(this.createTractTitles);
      return tracts;
    },
    tractTitles() {}
  }
};
</script>

<style lang="scss" scoped>
.tract-item {
  font-family: Montserrat !important;
  text-transform: uppercase;
  font-weight: 700 !important;
}

#explore-actions {
  .v-btn {
    color: $main-dark-blue;
    font: 800 10pt Montserrat;
    height: 50px;
  }

  .v-card {
    border-radius: 15px;
  }

  #change-neighborhood-btn {
    background: $main-dark-blue !important;
    color: #ffffff !important;
    white-space: normal;
  }

  #change-match-btn {
    background: $main-yellow !important;
  }
}
</style>