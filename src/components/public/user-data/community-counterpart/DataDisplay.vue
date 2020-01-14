<template>
  <h3>{{ title}}</h3>
</template>

<script>
import DataBarGrouping from "./DataBarGrouping";
export default { name: "DataDisplay", props: { title: String, data: Object } };
</script>

<style>
h3 {
  text-align: center;
  letter-spacing: 1.6px;
  font-weight: 800;
  text-transform: uppercase;
  margin-bottom: 20px;
}
</style>