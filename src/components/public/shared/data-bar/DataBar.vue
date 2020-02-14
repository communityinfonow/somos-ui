<template>
  <div class="bar-container">
    <div
      class="value-container"
      :style="{background: color, width: valueContainerWidth}"
      ref="valuecontainer"
    ></div>
    <span
      class="value-label"
      ref="valuelabel"
      :class="{shifted: isShifted, 'is-long': valueLabelIsLong}"
      :style="shift"
    >
      <span>{{formattedValue}}</span>
      <span class="label">{{valueLabel}}</span>
    </span>

    <MarginOfError
      v-if="marginOfError"
      :marginOfError="marginOfError"
      :denomenator="denomenator"
      :right="right"
      ref="marginoferror"
    />
  </div>
</template>

<script>
import { ValueType } from "@/components/public/shared/ValueType";
import MarginOfError from "./MarginOfError";
import format from "@/components/format.js";
const labelMargins = 20;
export default {
  name: "DataBar",
  data() {
    return { isShifted: false, shiftLength: 0, shift: {} };
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
  methods: {
    shiftLabels() {
      this.isShifted =
        this.$refs.valuelabel.clientWidth + labelMargins >
        this.$refs.valuecontainer.clientWidth;

      if (this.isShifted) {
        if (!!this.marginOfError) {
          this.shiftLength = this.right
            ? parseFloat(this.$refs.marginoferror.$el.style.left) || 0
            : parseFloat(this.$refs.marginoferror.$el.style.right) || 0;
          this.shiftLength += parseFloat(
            this.$refs.marginoferror.$el.style.width
          );
        } else {
          this.shiftLength = parseFloat(this.$refs.valuecontainer.style.width);
        }

        this.shift = {
          left: this.right ? this.shiftLength + "%" : "unset",
          right: this.right ? "unset" : this.shiftLength + "%"
        };
      } else {
        this.shift = {};
        this.shiftLength = 0;
      }
    },
    onResize() {
      this.shiftLabels();
    }
  },
  computed: {
    formattedValue() {
      return format.formatData(this.numerator, this.valueType);
    },
    valueLabel() {
      return this.label ? " " + this.label : "";
    },
    valueLabelIsLong() {
      return this.label ? this.label.length > 5 : false;
    },
    valueContainerWidth() {
      return (this.numerator / this.denomenator) * 100 + "%";
    }
  },
  components: {
    MarginOfError
  },
  mounted() {
    this.shiftLabels();
    window.addEventListener("resize", this.onResize);
  }
};
</script>

<style lang="scss" scoped>
$bar-height: 48px;
$label-padding: 5px;
$label-margin: 10px;
$label-height: $bar-height - $label-padding * 2 - $label-margin * 2;

.bar-container {
  background: #e4e4e4;
  height: $bar-height;
  position: relative;
}

.value-label {
  font: 16px/22px Montserrat;
  letter-spacing: 0.24px;
  color: #ffffff;
  line-height: $label-height;
  margin: $label-margin;
  padding: $label-padding;
  border-radius: 5px;
  position: absolute;
  z-index: 2;
  white-space: nowrap;

  &.shifted {
    background: #162d5417;
    color: black;
  }
}

.is-long.value-label {
  line-height: 11px;
}

.bar-container,
.value-container {
  border-radius: 5px;
}

.is-long .label {
  display: block;
  font-size: 12px;
}

.value-container {
  height: 100%;
}
</style>