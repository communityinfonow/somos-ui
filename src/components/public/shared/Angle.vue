<template>
  <div>
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 100 13.4"
      preserveAspectRatio="none"
      v-if="!!empty"
    >
      <polygon points="0,13.4 50,0 50,13.4" :style="{fill:colorLeft}" />
      <polygon points="50,0 50,13.4 100,13.4" :style="{fill:colorRight}" />
    </svg>

    <svg
      width="100%"
      height="100%"
      viewBox="0 0 100 13.4"
      preserveAspectRatio="none"
      v-else-if="!empty"
    >
      <polygon points="0,0 0,13.4 50,0" :style="{fill:color-left}" />
      <polygon points="50,0 100,13.4 100,0" :style="{fill:color-right}" />
    </svg>
  </div>
</template>

<script>
export default { name: "Angle", props: ["empty", "colorLeft", "colorRight"] };
</script>

<style>
</style>