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
      isForward: true,
      forwardTime: 1000,
      backwardTime: 100,
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
          this.isForward = false;
          this.transitionName = "backward-text-cycle";
        } else if (this.cycleIndex === 0) {
          this.isForward = true;
          this.transitionName = "forward-text-cycle";
        }

        if (this.isForward) {
          this.displayText = this.textArray[this.cycleIndex++];
          this.cycleTimer(this.forwardTime);
        } else {
          this.displayText = this.textArray[this.cycleIndex--];
          this.cycleTimer(this.backwardTime);
        }
      }, timer);
    }
  },
  props: ["textArray"],
  mounted() {
    this.cycleTimer(this.forwardTime);
  }
};
</script>

<style>
span {
  position: absolute;
  display: inline-block;
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