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
          :color="userDataColor"
          :numerator="data.userTractData.value"
          :denomenator="data.maxValue"
          :label="data.dataLabel"
        />
      </v-col>
      <v-col cols="12" sm="6" class="right">
        <DataBar
          right
          :color="counterpartDataColor"
          :numerator="data.counterpartTractData.value"
          :denomenator="data.maxValue"
          :label="data.dataLabel"
        />
      </v-col>
    </v-row>
  </div>
</template>
    
<script>
import DataBar from "./DataBar";
import globals from "../../../../globals";
import { userDataStore } from "../userDataStore";
import { store } from "../../../../store";
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
    data: Object
  },
  computed: {
    userData() {
      //  TODO filter data by tract id from state
    },
    counterpartData() {
      // TODO see above
    },
    title() {
      return this.data.name;
    }
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

.right {
  .value-container {
    padding-left: 20px;
    text-align: left;
  }
}

.left {
  .value-container {
    padding-right: 20px;
    text-align: right;
    float: right;
  }
}
</style>