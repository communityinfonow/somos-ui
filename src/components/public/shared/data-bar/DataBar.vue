<template>
  <div class="bar-container">
    <div class="value-container" :style="{background: color, width: valueContainerWidth}">
      <span>{{formattedLabel}}</span>
    </div>
    <MarginOfError
      v-if="marginOfError"
      :marginOfError="marginOfError"
      :denomenator="denomenator"
      :right="right"
    />
  </div>
</template>

<script>
import { ValueType } from "@/components/public/shared/ValueType";
import MarginOfError from "./MarginOfError";
export default {
  name: "DataBar",
  data() {
    return {};
  },
  props: {
    right: Boolean,
    color: String,
    data: Object,
    numerator: Number,
    denomenator: Number,
    marginOfError: Object,
    label: String,
    valueType: String
  },
  computed: {
    formattedLabel() {
      let suffix = "";
      let number = this.numerator;
      if (this.valueType === ValueType.PERCENT) {
        suffix = "%";
        number = number.toFixed(2);
      } else {
        suffix = this.label ? " " + this.label : "";
      }
      return number + suffix;
    },
    valueContainerWidth() {
      return (this.numerator / this.denomenator) * 100 + "%";
    }
  },
  components: {
    MarginOfError
  }
};
</script>

<style lang="scss" scoped>
$bar-height: 48px;

.bar-container {
  background: #e4e4e4;
  height: $bar-height;
  position: relative;
}

.value-container {
  font: 16px/22px Montserrat;
  letter-spacing: 0.24px;
  color: #ffffff;
  line-height: $bar-height;
  span {
    position: relative;
    z-index: 2;
  }
  white-space: nowrap;
}

.bar-container,
.value-container {
  border-radius: 5px;
}
</style>