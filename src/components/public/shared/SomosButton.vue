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
  font: Bold 15px/30px Montserrat !important;
  letter-spacing: 1.05px;
  color: #ffffff !important;
  opacity: 1;
  height: 40px !important;

  &:disabled {
    background-color: #cecece;
  }
}
</style>