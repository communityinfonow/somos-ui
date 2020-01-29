<template>
  <v-btn class="somos-btn" text v-bind="$attrs" @click="clickHandler">
    <slot></slot>
  </v-btn>
</template>

<script>
export default {
  name: "SomosButton",
  methods: {
    clickHandler() {
      this.$emit("click");
    }
  }
};
</script>

<style lang="scss" scoped>
.somos-btn {
  border-radius: 4px !important;
  background-color: $main-dark-blue;
  opacity: 1;
  text-align: center;
  font: Bold 1.071rem/2.143rem Montserrat !important;
  letter-spacing: 0.075rem;
  color: #ffffff !important;
  opacity: 1;
  height: 40px !important;
  display: block;
  &:disabled {
    background-color: #cecece;
  }
}
</style>