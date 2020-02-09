<template>
  <v-row id="explore-actions">
    <v-col cols="12">
      <v-card>
        <v-container>
          <v-row justify="space-around">
            <v-col cols="12" md="4">
              <v-btn block depressed @click="nextCounterpart">Change Counterpart</v-btn>
            </v-col>
            <v-col cols="12" md="4">
              <v-btn
                block
                depressed
                @click="$vuetify.goTo('#community-counterpart')"
              >Change you neighborhood</v-btn>
            </v-col>
            <v-col cols="12" md="4">
              <v-btn block depressed>explore data</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import globals from "@/globals.js";
import { userDataStore } from "../userDataStore.js";
export default {
  name: "ExploreActions",
  methods: {
    nextCounterpart() {
      userDataStore.nextCounterpart();
      this.$vuetify.goTo("#location-groups");
    }
  }
};
</script>

<style lang="scss" scoped>
#explore-actions {
  .v-btn {
    color: $main-dark-blue;
    font: 800 10pt Montserrat;
    height: 50px;
  }

  .v-card {
    border-radius: 15px;
  }
}
</style>