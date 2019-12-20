<template>
  <div id="splash-title" class="mb-9">
    <span class="main-text">WE ARE&nbsp;</span>
    <span class="secondary-text">{{currentCommunity}}</span>
  </div>
</template>

<script>
export default {
  name: "Title",
  data() {
    return {
      communities: [
        "NEIGHBORS",
        "SAN ANTONIANS",
        "LEADERS",
        "MOTHERS",
        "FATHERS",
        "TEACHERS",
        "STUDENTS",
        "SONS",
        "DAUGHTERS",
        "UNITED",
        "CREATIVE THINKERS",
        "PROBLEM SOLVERS",
        "FRIENDS",
        "LOVERS",
        "STRONG"
      ],
      currentCommunity: null
    };
  },
  methods: {
    communityTimer() {
      if (this.currentCommunity == null) {
        this.currentCommunity = this.communities[0];
      }
      let index = 1;
      setInterval(() => {
        this.currentCommunity =
          index === this.communities.length
            ? this.communities[(index = 0)]
            : this.communities[index++];
      }, 2000);
    },
    clickHandler() {}
  },
  computed: {},
  created() {
    this.communityTimer();
  }
};
</script>

<style lang="scss" scoped>
#splash-title {
  text-align: left;
  font: Bold 40px/24px Bebas Neue;
  letter-spacing: 8px;
  text-transform: uppercase;
  opacity: 1;
  font-family: "Bebas Neue";
}
</style>