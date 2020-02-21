<template>
  <DataBarGrouping
    :neighborhoodData="neighborhoodData"
    :matchData="matchData"
    :title="title"
    :tooltip="tooltip"
    :label="label"
    :valueType="valueType"
  ></DataBarGrouping>
</template>

<script>
import axios from "axios";
import DataBarGrouping from "./DataBarGrouping";
export default {
  name: "DataBarGroupingContainer",
  props: { data: Object },
  components: {
    DataBarGrouping
  },
  data() {
    return {
      neighborhoodData: null,
      matchData: null
    };
  },
  computed: {
    title() {
      return this.data && this.data.indicator ? this.data.indicator.name : "";
    },
    tooltip() {
      return this.data && this.data.indicator
        ? this.data.indicator.description
        : "";
    },
    label() {
      return this.data && this.data.indicator
        ? this.data.indicator.dataLabel
        : "";
    },
    valueType() {
      return this.data && this.data.indicator
        ? this.data.indicator.valueType.type
        : "";
    }
  },
  watch: {
    data() {
      this.getData();
    }
  },
  methods: {
    getData() {
      if (this.data && this.data._links) {
        axios.get(this.data._links["parent-data"].href).then(response => {
          this.neighborhoodData = response.data;
        });

        axios.get(this.data._links["child-data"].href).then(response => {
          this.matchData = response.data;
        });
      }
    }
  },
  mounted() {
    this.getData();
  }
};
</script>

<style>
</style>