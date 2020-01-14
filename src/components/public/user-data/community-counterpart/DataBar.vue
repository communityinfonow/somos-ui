<template></template>

<script>
export default {
  name: "DataBar",
  data() {
    return {
      numerator: 0,
      denomenator: 0,
      valueType: ValueType.percent
    };
  },
  props: {
    right: Boolean,
    color: String,
    data: Object
  }
};
</script>

<style>
</style>