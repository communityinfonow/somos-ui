<template>
  <l-tooltip direction="top">
    <h1>{{ location.name }}</h1>
    <ul>
      <li>
        <span style="font-weight: bold;">Garbage Bags:</span>
        {{location.garbageBags}}
      </li>
      <li>
        <span style="font-weight: bold;">Volunteers:</span>
        {{ location.volunteers}}
      </li>
    </ul>
  </l-tooltip>
</template>

<script>
import { LTooltip } from "vue2-leaflet";
export default {
  name: "MarkerTooltip",
  components: {
    LTooltip
  },
  props: ["location"]
};
</script>

 <style lang="scss" scoped>
ul {
  list-style: none;
  padding: 0;
  font-size: 12pt;
}
</style>

