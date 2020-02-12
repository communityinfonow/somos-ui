<template>
  <v-container id="community-counterpart">
    <h1>Find your match</h1>
    <p>If our daily routine is to go from home to school or work and back, our day-to-day lives don’t offer many chances to get to know other neighborhoods. Enter your information below to see how a neighborhood somewhere else in the county is the same and different from yours.</p>
    <AddressSearch
      class="address-search"
      @selected="selectionHandler"
      label="Input your neighborhood"
      ref="addressInput"
    ></AddressSearch>
    <v-row id="location-groups">
      <v-col cols="12" sm="6" class="left pr-0 mr-0">
        <LocationGroup
          :image="require('../left-flag.svg')"
          title="your neighborhood"
          :address="address"
        />
      </v-col>
      <v-col cols="12" sm="6" class="right pl-0 ml-0">
        <LocationGroup :image="require('../right-flag.svg')" title="your match neighborhood" />
      </v-col>
    </v-row>
    <DataDisplay title="YOUR NEIGHBORHOODS HAVE A LOT IN COMMON. TAKE A LOOK.">
      <DataBarGroupingContainer
        v-for="(dataGroup, index) in commonData"
        :key="index"
        :data="dataGroup"
      />
    </DataDisplay>
    <v-row>
      <v-col cols="12" sm="6">
        <ImageGallery :photos="tractPhotos" />
      </v-col>
      <v-col cols="12" sm="6">
        <ImageGallery :photos="matchedTractPhotos" />
      </v-col>
    </v-row>
    <v-btn
      id="photo-upload-btn"
      dense
      block
      :color="lightBlue"
      class="my-3"
      @click="$router.push('/photoshare')"
    >Upload your own photos here</v-btn>
    <LifeExpectancy
      v-if="lifeExpectancy"
      :difference="lifeExpectancy"
      :neighborhoodData="neighborhoodLifeExpectancy"
      :matchData="matchLifeExpectancy"
      :indicator="lifeExpectancyIndicator"
    />
    <p>Your neighborhoods have other differences, too. The differences may not directly cause the life expectancy gap you’re seeing. Local data tells us, though, that there’s a relationship between these issues and a neighborhood’s average life expectancy.</p>
    <DataDisplay>
      <DataBarGroupingContainer
        v-for="(dataGroup, index) in differenceData"
        :key="index"
        :data="dataGroup"
      />
    </DataDisplay>
  </v-container>
</template>

<script>
import AddressSearch from "../../../shared/address-search/AddressSearch";
import DataDisplay from "./DataDisplay";
import * as axios from "axios";
import LocationGroup from "./LocationGroup";
import ImageGallery from "./ImageGallery";
import { userDataStore } from "../userDataStore";
import photoData from "@/api/photo-data.js";
import globals from "@/globals.js";
import LifeExpectancy from "./LifeExpectancy";
import DataBarGroupingContainer from "@/components/public/shared/data-bar/DataBarGroupingContainer";
export default {
  name: "CommunityCounterpart",
  components: {
    AddressSearch,
    DataDisplay,
    LocationGroup,
    ImageGallery,
    LifeExpectancy,
    DataBarGroupingContainer
  },
  data() {
    return {
      storeState: userDataStore.state,
      lightBlue: globals.mainLightBlue,
      tractPhotos: [],
      matchedTractPhotos: [],
      address: { line1: "", line2: "" },
      neighborhoodLifeExpectancy: null,
      matchLifeExpectancy: null
    };
  },
  watch: {
    tract(newTract) {
      this.getPhotos(newTract);
    }
  },
  computed: {
    tract() {
      return userDataStore.state.tract;
    },
    matchedTract() {
      return userDataStore.getMatchedTract();
    },
    commonData() {
      return this.matchedTract
        ? this.matchedTract.similarIndicators.sort((a, b) => a.rank - b.rank)
        : [];
    },
    differenceData() {
      return this.matchedTract
        ? this.matchedTract.dissimilarIndicators.sort((a, b) => a.rank - b.rank)
        : [];
    },
    lifeExpectancy() {
      return this.matchedTract
        ? this.matchedTract.lifeExpectancyDifference
        : null;
    },
    lifeExpectancyIndicator() {
      return this.matchedTract
        ? this.matchedTract.lifeExpectancyIndicator
        : null;
    }
  },
  methods: {
    selectionHandler(selection) {
      userDataStore.setAddress(selection);
      this.setTractFormattedAddress(selection);
      this.getMatchedData();
      this.sendGoogleAnalytics();
    },
    setTractFormattedAddress(addressSelection) {
      let details = addressSelection.addressDetails;
      let address1 = details.house_number || "";
      address1 += address1 ? " " : "";
      address1 +=
        details.road ||
        details.pedestrian ||
        addressSelection.name.split(",")[0];
      let address2 = details.city || details.town || details.village || "";
      address2 += address2 ? ", TX" : "TX";
      address2 += " " + details.postcode || "";
      this.address = { line1: address1, line2: address2 };
    },
    getPhotos(tract) {
      if (tract) {
        photoData.get(
          tract._links.photos.href,
          response => {
            this.tractPhotos = response;
          },
          error => {
            return [];
          }
        );
      }

      if (tract && tract.matchedTract) {
        photoData.get(
          tract.matchedTract._links.photos.href,
          response => {
            this.matchedTractPhotos = response;
          },
          error => {
            return [];
          }
        );
      }
    },
    sendGoogleAnalytics() {
      ga("send", {
        hitType: "event",
        eventCategory: "Address Search",
        eventAction: "select",
        eventLabel: "address"
      });
    },
    getMatchedData() {}
  }
};
</script>

<style lang="scss" >
#photo-upload-btn {
  color: white;
  font: 500 14px/22px Montserrat;
}
#community-counterpart {
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
      text-align: left;
      padding-left: 30px;
      left: 40%;
      top: 36%;
    }
  }

  .left {
    .location-text {
      padding-right: 30px;
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

#location-groups {
  padding-bottom: 60px;
}
</style>