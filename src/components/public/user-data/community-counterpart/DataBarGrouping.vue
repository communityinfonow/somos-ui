<template>
  <div>
    <h4>{{title}}</h4>
    <DataBar :color="userDataColor" />
    <DataBar right :color="counterpartDataColor" />
  </div>
</template>
    
<script>
import DataBar from "./DataBar";
import globals from "../../../../globals";
import userDataStore from "../userDataStore";
export default {
  name: "DataBarGrouping",
  components: {
    DataBar
  },
  data() {
    return {
      title: "",
      counterpartDataColor: globals.yellow,
      userDataColor: globals.pink,
      storeState: userDataStore.state
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
    }
  }
};
</script>

<style>
</style>