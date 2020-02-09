<template>
  <div class="bar-container">
    <div class="value-container" :style="{background: color, width: valueContainerWidth}">
      <span>{{formattedLabel}}</span>
    </div>
    <MarginOfError :marginOfError="marginOfError" :denomenator="denomenator" :right="right" />
  </div>
</template>

<script>
import { ValueType } from "@/components/public/shared/ValueType";
import MarginOfError from "./MarginOfError";
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
    marginOfError: Object,
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
}

.bar-container,
.value-container {
  border-radius: 5px;
}
</style>