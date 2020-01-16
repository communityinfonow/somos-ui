<template>
  <div class="bar-container">
    <div class="value-container" :style="{background: color, width: valueContainerWidth}">
      <span>{{formattedLabel}}</span>
    </div>
  </div>
</template>

<script>
import { ValueType } from "../ValueType";
export default {
  name: "DataBar",
  data() {
    return {
      valueType: ValueType.PERCENT
    };
  },
  props: {
    right: Boolean,
    color: String,
    data: Object,
    numerator: Number,
    denomenator: Number,
    label: String
  },
  computed: {
    formattedLabel() {
      let suffix = "";
      if (this.valueType === ValueType.PERCENT) {
        suffix = "%";
      } else {
        suffix = " " + this.label;
      }
      return this.numerator + suffix;
    },
    valueContainerWidth() {
      return (this.numerator / this.denomenator) * 100 + "%";
    }
  }
};
</script>

<style lang="scss" scoped>
$bar-height: 48px;

.bar-container {
  background: #e4e4e4;
  height: $bar-height;
}

.value-container {
  font: 16px/22px Montserrat;
  letter-spacing: 0.24px;
  color: #ffffff;
  line-height: $bar-height;
}

.bar-container,
.value-container {
  border-radius: 5px;
}
</style>