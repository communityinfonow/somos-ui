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
    valueHigh() {
      let high = this.marginOfError.moeValueHigh;
      if (high > this.denomenator) {
        return this.denomenator;
      } else if (high < 0) {
        return 0;
      }
      return high;
    },
    valueLow() {
      let low = this.marginOfError.moeValueLow;

      if (low > this.denomenator) {
        return this.denomenator;
      } else if (low < 0) {
        return 0;
      }
      return low;
    },
    marginOfErrorWidth() {
      return ((this.valueHigh - this.valueLow) / this.denomenator) * 100 + "%";
    },
    shift() {
      return (this.valueLow / this.denomenator) * 100;
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
  background: #ababab;
  position: absolute;
  top: calc(50% - #{$moe-height} / 2);
  border-radius: 3px;
  z-index: 1;
}
</style>