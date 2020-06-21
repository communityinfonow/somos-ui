<template>
  <section id="find-your-match">
    <v-container>
      <h1>{{translateText(title)}}</h1>
      <p>{{translateText(introParagraph)}}</p>
      <div class="address-search">
        <AddressSearch
          @selected="selectionHandler"
          :label="translateText(addressSearchLabel)"
          :messages="[translateText(addressSearchDirections)]"
          ref="addressInput"
        ></AddressSearch>
        <p>OR</p>
        <v-dialog v-model="selectLocationFromMap">
          <template v-slot:activator="{on}">
            <button v-on="on" id="select-from-map-btn">{{translateText(selectFromMap)}}</button>
          </template>
          <LocationFromMap @submit="selectLocationFromMap = false" />
        </v-dialog>
      </div>

      <LocationGroups :isClosestLocation="isClosestLocation" />
      <DataDisplay :title="translateText(commonIndicatorsTitle)" v-if="commonData.length">
        <DataBarGroupingContainer
          v-for="(dataGroup, index) in commonData"
          :key="index"
          :data="dataGroup"
        />
      </DataDisplay>
      <ImageGalleryContainer
        :tract="tract"
        :tractPhotos="tractPhotos"
        :matchedTractPhotos="matchedTractPhotos"
      />

      <LifeExpectancy
        :placeholder="!lifeExpectancy"
        :difference="lifeExpectancy"
        :indicator="lifeExpectancyIndicator"
      />
      <p v-if="differenceData.length">{{translateText(differentIndicatorsParagraph)}}</p>
      <DataDisplay>
        <DataBarGroupingContainer
          v-for="(dataGroup, index) in differenceData"
          :key="index"
          :data="dataGroup"
        />
      </DataDisplay>
    </v-container>
  </section>
</template>

<script>
import translate from "@/mixins/translate";
import AddressSearch from "../../../shared/address-search/AddressSearch";
import DataDisplay from "./DataDisplay";
import * as axios from "axios";
import LocationGroup from "./LocationGroup";
import ImageGallery from "./ImageGallery";
import { userDataStore } from "../userDataStore";
import globals from "@/globals.js";
import LifeExpectancy from "./LifeExpectancy";
import DataBarGroupingContainer from "@/components/public/shared/data-bar/DataBarGroupingContainer";
import LocationGroups from "./LocationGroups";
import LocationFromMap from "./LocationFromMap";
import displayData from "@/mixins/display-data";
import ImageGalleryContainer from "./ImageGalleryContainer";
export default {
  name: "CommunityCounterpart",
  components: {
    AddressSearch,
    DataDisplay,
    LocationGroup,
    ImageGallery,
    LifeExpectancy,
    DataBarGroupingContainer,
    LocationGroups,
    ImageGalleryContainer,
    LocationFromMap
  },
  mixins: [translate, displayData],
  props: { lifeExpectancyIndicator: Object, isClosestLocation: Boolean },
  data() {
    return {
      selectLocationFromMap: null,
      storeState: userDataStore.state,
      darkBlue: globals.mainDarkBlue,
      title: { en: "find your match", es: "ENCUENTRE A SU PAR" },
      introParagraph: {
        en:
          "If our daily routine is to go from home to school or work and back, our day-to-day lives don’t offer many chances to get to know other neighborhoods. Enter your information below to see how a neighborhood somewhere else in the county is the same and different from yours.",
        es:
          "Si nuestra rutina diaria es ir de la casa a la escuela o al trabajo y viceversa, nuestra vida cotidiana no ofrece muchas oportunidades de conocer otros vecindarios. Ingrese su información a continuación para ver cómo un vecindario en otro lugar del condado es igual y diferente al suyo."
      },
      addressSearchLabel: {
        en: "Help us find your neighborhood",
        es: "Ayúdanos a encontrar tu vecindario"
      },
      addressSearchDirections: {
        en: "Enter a nearby address or landmark in your neighborhood",
        es:
          "Escribe una dirección cercana a tu vecindario o punto de referencia"
      },

      selectFromMap: {
        en: "Select location from map",
        es: "Selecciona la ubicación en el mapa"
      }
    };
  },

  methods: {
    selectionHandler(selection) {
      userDataStore.setAddress(selection);
      this.sendGoogleAnalytics();
    },

    sendGoogleAnalytics() {
      gtag("event", {
        event_category: "Address Search",
        event_action: "select",
        event_label: "address"
      });
    }
  }
};
</script>

<style lang="scss" >
#select-from-map-btn {
  font-family: montserrat;
  font-size: 14px;
  font-weight: 700;
  height: 40px;
  background-color: #f0f0f0;
  color: $main-dark-blue;
  width: 100%;
  border-radius: 7px;
  text-transform: uppercase;

  &:hover {
    box-shadow: #162d5421 0px 5px 5px 1px;
    transition: box-shadow 100ms ease-in;
  }
}

#photo-upload-btn {
  color: white;
  font: 700 14px/22px Montserrat;
  width: 100%;
  border-radius: 6px;
  padding: 6px;
  text-transform: uppercase;
  min-height: 50px;
  background: $main-dark-blue;

  &:hover {
    box-shadow: #162d5421 0px 5px 5px 1px;
    transition: box-shadow 100ms ease-in;
  }
}
#find-your-match {
  p {
    text-align: center;
    width: 80%;
    margin: auto;
    padding-bottom: 20px;
    position: relative;
    z-index: 2;
  }

  h1 {
    margin-bottom: 20px;
  }

  .left,
  .right {
    h2 {
      font: 20px/28px Montserrat;
      letter-spacing: 2px;
      color: #162d54;
      text-transform: uppercase;
      font-weight: 900;
    }
  }

  .right {
    .location-image {
      text-align: left;
    }

    .location-text {
      h2 {
        text-align: left;
      }
      text-align: left;
      padding-left: 30px;
      left: 40%;
      top: 36%;
    }
  }

  .left {
    .location-text {
      padding-right: 30px;
      h2 {
        text-align: right;
      }
      text-align: right;

      right: 40%;
      top: 36%;
    }

    .location-image {
      text-align: right;
      float: right;
    }
  }

  .address-search {
    width: 80%;
    margin: auto;
    margin-bottom: 30px;
  }
}

@media (max-width: 600px) {
  #find-your-match .address-search {
    width: 100%;
  }

  #find-your-match p {
    width: 100%;
  }
}

#location-groups {
  padding-bottom: 60px;
}
</style>