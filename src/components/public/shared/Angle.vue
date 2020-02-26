<template>
  <div class="my-0 py-0">
    <svg
      class="topper"
      width="100%"
      viewBox="0 0 100 13.4"
      preserveAspectRatio="xMidYMin"
      v-if="!!empty"
    >
      <!-- <defs>
        <filter id="null">
          <feBlend mode="normal" in="SourceGraphic" />
        </filter>
      </defs>-->
      <g>
        <polygon points="50,0 50,13.4 0,13.4" :style="{fill:colorLeft}" />
        <polygon points="50,0 50,13.4 100,13.4" :style="{fill:colorRight}" />
      </g>
    </svg>

    <svg
      class="footer"
      width="100%"
      viewBox="0 0 100 13.4"
      preserveAspectRatio="none"
      v-else-if="!empty"
    >
      <polygon points="0,0 0,13.4 50,0" :style="{fill:colorLeft}" />
      <polygon points="50,0 100,13.4 100,0" :style="{fill:colorRight}" />
    </svg>
    <div class="filler">
      <div class="filler-left" :style="{background:colorLeft}"></div>
      <div class="filler-right" :style="{background:colorRight}"></div>
    </div>
  </div>
</template>

<script>
export default { name: "Angle", props: ["empty", "colorLeft", "colorRight"] };
</script>

<style lang="scss" scoped>
svg {
  display: block;
}

.filler {
  height: 389%; //TODO see if there's another way to fill this height between the two
  position: relative;

  div {
    height: 100%;
    width: 50%;
  }
}

.filler-left {
  float: left;
}

.filler-right {
  float: right;
}

polygon {
  stroke: black;
  stroke-width: 0;
}
</style>