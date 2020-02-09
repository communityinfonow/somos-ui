<template>
  <div>
    <h1>explore the community</h1>
    <ExploreMap :tract="storeState.tract" />
    <ExploreActions />
  </div>
</template>

<script>
import ExploreMap from "./ExploreMap";
import ExploreActions from "./ExploreActions";
import { userDataStore } from "../userDataStore";
export default {
  name: "Explore",
  components: {
    ExploreMap,
    ExploreActions
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