<template>
  <div class="data-bar-grouping">
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
    <div class="group-popup">
      <span>
        {{tooltip}}
        <div class="moe-link">{{translateText(moeLink)}}</div>
        <button @click="dialog= true">{{translateText(findOut)}}</button>
      </span>
    </div>
    <v-dialog v-model="dialog" max-width="900px" transition="dialog-transition">
      <div>
        <img :src="require('@/assets/moe-img.png')" />
        <p>{{translateText(moeDescription)}}</p>
      </div>
    </v-dialog>
  </div>
</template>
   
 
    
<script>
import DataBar from "./DataBar";
import globals from "../../../../globals";
import { userDataStore } from "@/components/public/user-data/userDataStore";
import { store } from "../../../../store";
import translate from "@/mixins/translate";
import * as axios from "axios";
export default {
  name: "DataBarGrouping",
  components: {
    DataBar
  },
  mixins: [translate],
  data() {
    return {
      counterpartDataColor: globals.yellow,
      userDataColor: globals.darkPink,
      dataStoreState: userDataStore.state,
      storeState: store.state,
      dialog: false,
      moeLink: {
        en: "What's that gray bar? Click below to find out more",
        es: ""
      },
      moeDescription: {
        en:
          "There’s always some degree of uncertainty about numbers that come from samples rather than actual counts. In the bar charts on this site uncertainty is represented with an error bar, a gray line that overlaps the end of the bar. In general, the wider the error bar for an estimate, the more we need to take that estimate with a grain of salt.",
        es: ""
      },
      findOut: {
        en: "Find Out",
        es: ""
      }
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
.group-popup {
  width: 100%;
  position: absolute;
  text-align: center;
  left: 0;
  top: -20px;
  opacity: 0;
  transition: opacity 200ms ease-in-out;
  z-index: 500;
  span {
    background: black;
    display: inline-block;
    padding: 10px;
    color: white;
    border-radius: 10px;
  }
}

.data-bar-grouping:hover .group-popup,
.group-popup:hover {
  opacity: 1;
}

.group-popup button {
  padding: 6px;
  margin-top: 16px;
  background: white;
  border-radius: 5px;
  color: black;
  text-transform: uppercase;
  font-weight: bold;
  width: 100%;
}
.moe-link {
  font-style: italic;
  margin-top: 7px;
}

.v-dialog {
  background: white;
  padding: 40px;
}
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
  position: relative;
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