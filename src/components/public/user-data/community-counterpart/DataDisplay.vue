<template>
  <div class="data-display">
    <h3>{{title}}</h3>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "DataDisplay",
  props: { title: String }
};
</script>

<style lang="scss" scoped>
h3 {
  text-align: center !important;
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