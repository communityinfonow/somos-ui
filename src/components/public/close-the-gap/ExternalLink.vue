<template>
  <v-container class="external-link">
    <a :href="link.href" @click="sendAnalytics">
      <v-col cols="12">
        <v-row>
          <div class="linkIcon">
            <v-img :src="icon"></v-img>
          </div>
          <div class="text">
            <div class="link-title">{{title}}</div>
            <div class="link-short">{{link.shortened}}</div>
          </div>
        </v-row>
      </v-col>
    </a>
  </v-container>
</template>

<script>
export default {
  name: "ExternalLink",
  props: {
    title: String,
    link: Object,
    icon: String
  },
  methods: {
    sendAnalytics() {
      gtag("event", {
        event_category: "External Link",
        event_action: "submit",
        event_label: this.link
      });
    }
  }
};
</script>

<style lang="scss">
.linkIcon {
  padding: 9px;
  border-radius: 50%;
  position: relative;
  padding-bottom: 11px;
  background: $main-dark-blue;
  height: 50px;
  width: 50px;

  .v-img {
    width: 75%;
    position: absolute;
    left: 16px;
    bottom: 1px;
  }
}

@media (max-width: 1264px) {
  .link-title {
    font-size: 13px !important;
  }

  .linkIcon {
    height: 40px;
    width: 40px;
  }
}

@media (max-width: 473px) {
  .link-title {
    font-size: 12px !important;
  }

  .text {
    margin-left: 13px !important;
  }
}

@media (max-width: 960px) {
  .link-title {
    color: white !important;
    font-weight: 800;
  }
}

.link-title {
  text-align: left;
  font: 800 14px/22px Montserrat;
  letter-spacing: 0.21px;
  color: $main-dark-blue;
}

.link-short {
  text-align: left;
  font: 700 14px/22px Montserrat;
  letter-spacing: 0.21px;
  color: white;
}

.text {
  margin-left: 20px;
}

.external-link {
  cursor: pointer;

  &:hover {
    transform: scale(1.01);
    transition: scale 1ms linear;
  }
}
</style>