<template>
  <CommunityCounterpart />
</template>

<script>
import { userDataStore } from "./userDataStore";
import Explore from "./Explore";
import CommunityCounterpart from "./community-counterpart/CommunityCounterpart";
export default {
  name: "UserData",
  components: {
    CommunityCounterpart
  },
  data() {
    return {
      userTract: null,
      state: userDataStore.state,
      userAddress: null
    };
  },
  methods: {
    getContainingTract() {
      // TODO use userAddress to get containing tract from API
      userDataStore.setTract();
    }
  }
};
</script>

<style>
</style>