<template>
  <transition-group :name="up ? 'cycle-up' : 'cycle-down'" tag="div">
    <div
      class="profile-container"
      :key="neighbor.name"
      v-for="(neighbor,index) in neighbors"
      v-show="index === neighborsIndex"
    >
      <NeighborProfile
        :name="neighbor.name"
        :story="neighbor.story"
        :lazyImage="neighbor.lazyImage"
        :image="neighbor.image"
      >
        <CircleTabs :index="neighborsIndex" :count="neighbors.length" class="circle-tab-grouping" />
      </NeighborProfile>
    </div>
  </transition-group>
</template>

<script>
import NeighborProfile from "./NeighborProfile";
import CircleTabs from "../shared/CircleTabs";
export default {
  name: "NeighborProfilesContainer",
  components: {
    NeighborProfile,
    CircleTabs
  },
  props: {
    neighbors: Array,
    neighborsIndex: Number,
    down: Boolean,
    up: Boolean
  }
};
</script>

<style lang="scss">
.cycle-up-enter,
.cycle-down-leave-active {
  transform: translateY(100vh);
}

.cycle-up-leave-active,
.cycle-down-enter {
  transform: translateY(-100vh);
}

.cycle-up-enter-active,
.cycle-up-leave-active,
.cycle-down-enter-active,
.cycle-down-leave-active {
  transition: all 0.5s;
}

.profile-container {
  position: absolute;
  width: 100%;
  z-index: 2;
}

.circle-tab-grouping {
  width: 100%;
}

@media (max-width: 600px) {
  .cycle-up-enter,
  .cycle-down-leave-active {
    transform: translateX(-100vw);
  }

  .cycle-up-leave-active,
  .cycle-down-enter {
    transform: translateX(100vw);
  }
  .profile-container {
    position: relative;
  }

  .circle-tab-grouping {
    position: relative;
    text-align: center;
  }
}

:not(.cycle-down-leave-active):not(.cycle-up-leave-active):not(.cycle-down-enter):not(.cycle-up-enter):not(.cycle-down-enter-active):not(.cycle-up-enter-active).profile-container:hover {
  cursor: pointer;
  transform: translateY(-5px);
  transition: transform 100ms ease-in-out;
}
</style>