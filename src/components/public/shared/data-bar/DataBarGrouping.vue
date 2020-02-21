<template>
  <v-tooltip top color="black">
    <template v-slot:activator="{ on }">
      <div class="data-bar-grouping" v-on="on">
        <h4>{{title}}</h4>
        <v-row>
          <v-col
            cols="12"
            sm="6"
            :class="{left: $vuetify.breakpoint.smAndUp, right: $vuetify.breakpoint.xsOnly}"
          >
            <DataBar
              v-if="neighborhoodData && !placeholder"
              :color="userDataColor"
              :numerator="neighborhoodData.value"
              :denomenator="neighborhoodData.maxValue"
              :marginOfError="neighborhoodData.marginOfError"
              :label="label"
              :valueType="valueType"
              :right="$vuetify.breakpoint.xsOnly"
              :key="neighborhoodData.value"
            />

            <DataBar
              v-if="placeholder"
              color="#e4e4e4"
              :numerator="null"
              :denomenator="null"
              :marginOfError="null"
              :label="null"
              :valueType="null"
              :right="true"
              :key="1"
            />
          </v-col>
          <v-col cols="12" sm="6" class="right">
            <DataBar
              v-if="matchData && !placeholder"
              :color="counterpartDataColor"
              :numerator="matchData.value"
              :denomenator="matchData.maxValue"
              :marginOfError="matchData.marginOfError"
              :label="label"
              :valueType="valueType"
              :right="true"
              :key="matchData.value"
            />

            <DataBar
              v-if="placeholder"
              color="#e4e4e4"
              :numerator="0"
              :denomenator="100"
              :marginOfError="null"
              :label="null"
              :valueType="null"
              :right="true"
              :key="1"
            />
          </v-col>
        </v-row>
      </div>
    </template>
    <span>{{tooltip}}</span>
  </v-tooltip>
</template>
    
<script>
import DataBar from "./DataBar";
import globals from "../../../../globals";
import { userDataStore } from "@/components/public/user-data/userDataStore";
import { store } from "../../../../store";
import * as axios from "axios";
export default {
  name: "DataBarGrouping",
  components: {
    DataBar
  },
  data() {
    return {
      counterpartDataColor: globals.yellow,
      userDataColor: globals.darkPink,
      dataStoreState: userDataStore.state,
      storeState: store.state
    };
  },
  props: {
    matchData: Object,
    neighborhoodData: Object,
    title: String,
    tooltip: String,
    label: String,
    valueType: String,
    placeholder: Boolean
  }
};
</script>

<style lang="scss">
h4 {
  text-align: center;
  font: 16px/22px Montserrat;
  font-weight: bold;
  letter-spacing: 0.24px;
}

.data-bar-grouping {
  padding-left: 48px;
  padding-right: 48px;
  margin-bottom: 26px;
}

@media (max-width: 600px) {
  .data-bar-grouping {
    padding-left: 0px;
    padding-right: 0px;
  }
}

.right {
  .value-container {
    text-align: left;
    float: left;
  }
  .value-label {
    left: 0;
  }
  .margin-of-error {
    float: left;
  }

  .is-long {
    text-align: left;
  }
}

.left {
  .value-container {
    text-align: right;
    float: right;
  }

  .value-label {
    right: 0;
  }

  .margin-of-error {
    float: right;
  }

  .is-long {
    text-align: right;
  }
}
</style>