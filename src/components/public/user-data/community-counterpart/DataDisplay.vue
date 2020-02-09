<template>
  <div class="data-display">
    <h3>{{title}}</h3>
    <DataBarGrouping v-for="dataGroup in data" :key="dataGroup.id" :data="dataGroup" />
  </div>
</template>

<script>
import DataBarGrouping from "@/components/public/shared/data-bar/DataBarGrouping";
export default {
  name: "DataDisplay",
  props: { title: String, data: Array },
  components: {
    DataBarGrouping
  }
};
</script>

<style>
h3 {
  text-align: center;
  letter-spacing: 1.6px;
  text-transform: uppercase;
  margin-bottom: 20px;
  font: 800 16px/28px Montserrat;
}

.data-display {
  margin-bottom: 42px;
  position: relative;
  z-index: 2;
}
</style>