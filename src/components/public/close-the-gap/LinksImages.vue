<template>
  <v-container>
    <v-row id="links-images">
      <v-col cols="12" md="6">
        <v-tabs
          v-model="tabs"
          :color="darkBlue"
          slider-color="white"
          background-color="transparent"
          id="tabs"
        >
          <v-tab
            class="tab-title"
            v-for="(item, index) in translatedTabItems"
            :key="index"
          >{{item.title}}</v-tab>
        </v-tabs>
        <v-tabs-items v-model="tabs" background-color="transparent" id="tab-links">
          <v-tab-item v-for="(item, index) in translatedTabItems" :key="index">
            <div>
              <ExternalLink
                v-for="link in item.links"
                :key="link.label"
                :icon="link.icon"
                :title="link.label"
                :link="link.link"
              />
            </div>
          </v-tab-item>
        </v-tabs-items>
      </v-col>
      <v-col cols="12" md="6" class="hidden-sm-and-down">
        <OverlappingImages
          :topSource="require('./shutterstock_160644944.png')"
          :topLazySource="require('./shutterstock_160644944@2x.png')"
          :bottomSource="require('./shutterstock_367286867.png')"
          :bottomLazySource="require('./shutterstock_367286867@2x.png')"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import OverlappingImages from "@/components/public/shared/OverlappingImages";
import { translate } from "@/mixins/translate.js";
import ExternalLink from "./ExternalLink";
import globals from "@/globals";
const links = {
  policies: {
    href:
      "https://www.countyhealthrankings.org/take-action-to-improve-health/what-works-for-health/policies",
    shortened: "countyhealthrankings.org"
  },
  othersDoing: {
    href: "https://changelibrary.100mlives.org/",
    shortened: "100mlives.org"
  },
  represents: {
    href: "https://www.bexar.org/2231/Who-represents-me-Search",
    shortened: "bexar.org"
  },
  speakUp: {
    href: "https://www.saspeakup.com/",
    shortened: "saspeakup.com"
  },
  beCounted: {
    href: "https://www.sabexarcountmein.org/",
    shortened: "sabexarcountmein.org"
  },
  paintYourVision: {
    href: "https://sa2020.typeform.com/to/iXo4hE",
    shortened: "sa2020.typeform.com"
  },
  volunteer: {
    href: "https://servesa.sa2020.org/npos",
    shortened: "sa2020.org"
  },
  cityServices: {
    href: "https://www.sanantonio.gov/CustomerService/MobileApp",
    shortened: "sanantonio.gov"
  },
  countyServices: {
    href: "https://www.bexar.org/2654/BexarConnect-App",
    shortened: "bexar.org"
  },
  getInformed: {
    href: "https://www.vote411.org/",
    shortened: "vote411.org"
  }
};
export default {
  name: "LinksImages",
  mixins: [translate],
  components: {
    OverlappingImages,
    ExternalLink
  },
  data() {
    return {
      darkBlue: globals.mainDarkBlue,
      tabItems: [
        {
          en: {
            title: "learn",
            links: [
              {
                label: "Discover policies and programs that work",
                link: links.policies,
                icon: require("./Group 61.svg")
              },
              {
                label: "Get inspired by what others are doing",
                link: links.othersDoing,
                icon: require("./Group 62.svg")
              },
              {
                label: "Find out who represents you",
                link: links.represents,
                icon: require("./Group 63.svg")
              }
            ]
          },
          es: null
        },
        {
          en: {
            title: "speak",
            links: [
              {
                label: "Speak up on local issues",
                link: links.speakUp,
                icon: require("./Group 64.svg")
              },
              {
                label: "Be counted in the 2020 Census",
                link: links.beCounted,
                icon: require("./Group 88.svg")
              },
              {
                label: "Paint your vision for our community",
                link: links.paintYourVision,
                icon: require("./Group 95.svg")
              }
            ]
          },
          es: null
        },
        {
          en: {
            title: "act",
            links: [
              {
                label: "Volunteer or donate to a local nonprofit",
                link: links.volunteer,
                icon: require("./Group 96.svg")
              },
              {
                label: "Request city services",
                link: links.cityServices,
                icon: require("./Group 97.svg")
              },
              {
                label: "Request county services",
                link: links.countyServices,
                icon: require("./Group 61.svg")
              },
              {
                label: "Get informed and vote",
                link: links.getInformed,
                icon: require("./Group 61.svg")
              }
            ]
          },
          es: null
        }
      ],
      tabs: null
    };
  },
  computed: {
    translatedTabItems() {
      return this.tabItems.map(item => this.translateText(item));
    }
  }
};
</script>

<style lang="scss">
#links-images {
  height: 500px;
}
.tab-title {
  text-align: left;
  font: 700 16px/21px Montserrat;
  letter-spacing: 1.6px;
  font-size: 18px !important;
  color: $main-dark-blue !important;
  font-weight: 700 !important;
}

#tabs,
#tab-links {
  padding-left: 25px;
}

#tab-links {
  background-color: transparent !important;
}

a {
  text-decoration: none !important;
}
</style>