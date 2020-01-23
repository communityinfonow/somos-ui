<template>
  <div>
    <h1>explore the community</h1>
    <ExploreMap :tract="storeState.tract" />
  </div>
</template>

<script>
import ExploreMap from "./ExploreMap";
import { userDataStore } from "../userDataStore";
export default {
  name: "Explore",
  components: {
    ExploreMap
  },
  data() {
    return {
      storeState: userDataStore.state
    };
  }
};
</script>

<style lang="scss" scoped>
h1 {
  padding-bottom: 30px;
}
</style>