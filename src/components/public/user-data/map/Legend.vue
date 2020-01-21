<template>
  <l-control position="bottomright" id="legend">
    <div>
      <h1>{{title}}</h1>
      <ul>
        <li v-for="(range, index) in ranges" v-bind:key="index">
          <div>
            <svg :width="calculateRadius(max) * 2" :height="calculateRadius(max) * 2">
              <circle
                :cx="calculateRadius(max) + (range == max ? 0 : calculateRadius(range))"
                :cy="calculateRadius(max)"
                :r="calculateRadius(range)"
              />
            </svg>
            <span class="legend-range">{{range}}</span>
          </div>
        </li>
      </ul>
    </div>
  </l-control>
</template>

<script>
import { LControl } from "vue2-leaflet";
export default {
  name: "Legend",
  components: {
    LControl
  },
  props: ["title", "ranges"]
};
</script>

<style>
</style>
