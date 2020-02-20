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
      :class="{'exceeds-container': exceedsContainer, 'is-long': valueLabelIsLong}"
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
    return { exceedsContainer: false };
  },
  props: {
    right: Boolean,
    color: String,
    numerator: Number,
    denomenator: Number,
    marginOfError: Object,
    label: String,
    valueType: String
  },
  watch: {},
  methods: {
    checkLabelsSize() {
      this.exceedsContainer =
        this.$refs.valuelabel.clientWidth >
        this.$refs.valuecontainer.clientWidth;
    },
    onResize() {
      this.checkLabelsSize();
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
    this.$nextTick(this.checkLabelsSize);
  },
  created() {
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

  &.exceeds-container {
    color: black;
  }
}

.is-long.value-label {
  line-height: 13px;
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