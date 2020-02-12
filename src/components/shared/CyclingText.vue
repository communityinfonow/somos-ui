<template>
  <transition :name="transitionName">
    <span :key="displayText">{{displayText}}</span>
  </transition>
</template>

<script>
export default {
  name: "CyclingText",
  data() {
    return {
      displayText: null,
      forwardTime: 2000,
      cycleIndex: 0,
      transitionName: "forward-text-cycle"
    };
  },
  methods: {
    cycleTimer(timer) {
      if (this.displayText == null) {
        this.displayText = this.textArray[0];
      }

      setTimeout(() => {
        if (this.cycleIndex === this.textArray.length) {
          this.cycleIndex = 0;
        }

        this.displayText = this.textArray[this.cycleIndex++];
        this.cycleTimer(this.forwardTime);
      }, timer);
    }
  },
  props: ["textArray"],
  mounted() {
    this.cycleTimer(this.forwardTime);
  }
};
</script>

<style scoped>
span {
  position: absolute;
  display: inline-block;
  white-space: nowrap;
}

.forward-text-cycle-enter,
.backward-text-cycle-leave-active {
  transform: translateY(50px);
}

.forward-text-cycle-leave-active,
.backward-text-cycle-enter-active {
  transform: translateY(-50px);
}

.forward-text-cycle-enter-active,
.forward-text-cycle-leave-active {
  transition: all 0.5s;
}

.backward-text-cycle-enter-active,
.backward-text-cycle-leave-active {
  transition: all 50ms;
}
</style>