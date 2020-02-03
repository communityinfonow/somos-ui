<template>
  <span
    class="margin-of-error"
    :style="{width: marginOfErrorWidth, left: marginOfErrorShiftLeft, right: marginOfErrorShiftRight}"
  ></span>
</template>

<script>
export default {
  name: "MarginOfError",
  props: { marginOfError: Object, denomenator: Number, right: Boolean },
  computed: {
    marginOfErrorWidth() {
      return (
        ((this.marginOfError.high - this.marginOfError.low) /
          this.denomenator) *
          100 +
        "%"
      );
    },
    shift() {
      return (this.marginOfError.low / this.denomenator) * 100;
    },
    marginOfErrorShiftLeft() {
      return this.right ? this.shift + "%" : "unset";
    },
    marginOfErrorShiftRight() {
      return this.right ? "unset" : this.shift + "%";
    }
  }
};
</script>

<style lang="scss" scoped>
$moe-height: 5px;

.margin-of-error {
  height: $moe-height;
  background: #afafaf;
  position: absolute;
  top: calc(50% - #{$moe-height} / 2);
  border-radius: 3px;
  z-index: 1;
}
</style>