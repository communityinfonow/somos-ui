<template>
  <div>
    <div
      v-for="index in count"
      :key="index"
      class="circle-tab"
      :class="{selected: isSelected(index)}"
    ></div>
  </div>
</template>

<script>
export default {
  name: "CircleTabs",
  props: ["count", "index"],
  data() {
    return {};
  },

  methods: {
    isSelected(index) {
      return this.index === index - 1;
    }
  }
};
</script>

<style lang="scss" scoped>
.circle-tab {
  border-radius: 50%;
  background: $main-dark-blue;
  height: 14px;
  width: 14px;
  display: inline-block;
  margin: 5px 5px 0px 5px;

  &.selected {
    background: white;
  }
}
</style>