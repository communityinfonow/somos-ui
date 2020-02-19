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
            v-for="(item, index) in tabItems"
            :key="index"
          >{{translateText(item.title)}}</v-tab>
        </v-tabs>
        <v-tabs-items v-model="tabs" background-color="transparent" id="tab-links">
          <v-tab-item v-for="(item, index) in tabItems" :key="index">
            <div>
              <ExternalLink
                v-for="(link, index) in item.links"
                :key="index"
                :icon="link.icon"
                :title="translateText(link.label)"
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
import translate from "@/mixins/translate.js";
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
          title: { en: "learn", es: "" },
          links: [
            {
              label: { en: "Discover policies and programs that work", es: "" },
              link: links.policies,
              icon: require("./Group 61.svg")
            },
            {
              label: { en: "Get inspired by what others are doing", es: "" },
              link: links.othersDoing,
              icon: require("./Group 62.svg")
            },
            {
              label: { en: "Find out who represents you", es: "" },
              link: links.represents,
              icon: require("./Group 63.svg")
            }
          ]
        },
        {
          title: { en: "speak", es: "" },
          links: [
            {
              label: { en: "Speak up on local issues", es: "" },
              link: links.speakUp,
              icon: require("./Group 64.svg")
            },
            {
              label: { en: "Be counted in the 2020 Census", es: "" },
              link: links.beCounted,
              icon: require("./Group 88.svg")
            },
            {
              label: { en: "Paint your vision for our community", es: "" },
              link: links.paintYourVision,
              icon: require("./Group 95.svg")
            }
          ]
        },
        {
          title: { en: "act", es: "" },
          links: [
            {
              label: {
                en: "Volunteer or donate to a local nonprofit",
                es: ""
              },
              link: links.volunteer,
              icon: require("./Group 96.svg")
            },
            {
              label: { en: "Request city services", es: "" },
              link: links.cityServices,
              icon: require("./Group 97.svg")
            },
            {
              label: { en: "Request county services", es: "" },
              link: links.countyServices,
              icon: require("./Group 61.svg")
            },
            {
              label: { en: "Get informed and vote", es: "" },
              link: links.getInformed,
              icon: require("./Group 61.svg")
            }
          ]
        }
      ],
      tabs: null
    };
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