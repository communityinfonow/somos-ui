<template>
  <v-btn text>
    <slot></slot>
  </v-btn>
</template>

<script>
export default { name: "SomosButton" };
</script>

<style lang="scss" scoped>
button {
  border-radius: 4px !important;
  background-color: $main-dark-blue !important;
  opacity: 1;
  text-align: center;
  font: Bold 15px/30px Montserrat !important;
  letter-spacing: 1.05px;
  color: #ffffff !important;
  opacity: 1;
  height: 40px !important;
}
</style>