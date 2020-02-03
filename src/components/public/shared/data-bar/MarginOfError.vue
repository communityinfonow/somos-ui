<template>
  <span class="margin-of-error" :style="{width: marginOfErrorWidth, left: marginOfErrorShiftLeft}"></span>
</template>

<script>
export default {
  name: "MarginOfError",
  props: { marginOfError: Number, denomenator: Number, right: Boolean },
  computed: {
    marginOfErrorWidth() {
      return ((this.marginOfError * 2) / this.denomenator) * 100 + "%";
    },
    marginOfErrorShiftLeft() {
      let shift = (this.marginOfError / this.denomenator) * 100;
      return this.right ? shift * -1 + "%" : shift + "%";
    }
  }
};
</script>

<style lang="scss" scoped>
$moe-height: 5px;

.margin-of-error {
  height: $moe-height;
  background: #afafaf;
  position: relative;
  top: calc(50% - #{$moe-height} / 2);
  border-radius: 3px;
  z-index: 1;
}
</style>