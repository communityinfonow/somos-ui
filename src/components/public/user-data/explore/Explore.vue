<template>
  <div>
    <h1>{{translateText(title)}}</h1>
    <ExploreMap :tract="storeState.tract" />
    <ExploreActions @click:new="$emit('click:new')" />
  </div>
</template>

<script>
import ExploreMap from "./ExploreMap";
import ExploreActions from "./ExploreActions";
import { userDataStore } from "../userDataStore";
import translate from "@/mixins/translate";
export default {
  name: "Explore",
  components: {
    ExploreMap,
    ExploreActions
  },
  data() {
    return {
      storeState: userDataStore.state,
      title: { en: "Life Expectancy in Bexar", es: "" }
    };
  },
  mixins: [translate]
};
</script>

<style lang="scss" scoped>
h1 {
  padding-bottom: 30px;
}
</style>