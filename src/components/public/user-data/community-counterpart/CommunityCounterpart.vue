<template>
  <v-container id="community-counterpart" v-scroll="onScroll">
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
    <DataDisplay title="YOUR NEIGHBORHOODS HAVE A LOT IN COMMON. TAKE A LOOK." :data="commonData" />
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

    <LifeExpectancy :data="lifeExpectancy" />

    <p>Your neighborhoods have other differences, too. The differences may not directly cause the life expectancy gap you’re seeing. Local data tells us, though, that there’s a relationship between these issues and a neighborhood’s average life expectancy.</p>
    <DataDisplay :data="differenceData" />
  </v-container>
</template>

<script>
import AddressSearch from "../../../shared/address-search/AddressSearch";
import DataDisplay from "./DataDisplay";
import LocationGroup from "./LocationGroup";
import ImageGallery from "./ImageGallery";
import { userDataStore } from "../userDataStore";
import photoData from "@/api/photo-data.js";
import globals from "@/globals.js";
import LifeExpectancy from "./LifeExpectancy";
export default {
  name: "CommunityCounterpart",
  components: {
    AddressSearch,
    DataDisplay,
    LocationGroup,
    ImageGallery,
    LifeExpectancy
  },
  data() {
    return {
      storeState: userDataStore.state,
      lightBlue: globals.mainLightBlue,
      tractPhotos: [],
      matchedTractPhotos: [],
      address: { line1: "", line2: "" },
      commonData: [
        {
          id: 1,
          name: "Indicator One",
          maxValue: 100,
          dataLabel: "%",
          userTractData: { value: 40, marginOfError: { high: 60, low: 30 } },
          counterpartTractData: {
            value: 50,
            marginOfError: { high: 54.3, low: 40.3 }
          }
        },
        {
          id: 2,
          name: "Indicator Two",
          maxValue: 100,
          dataLabel: "%",
          userTractData: { value: 24.5, marginOfError: { high: 30, low: 10 } },
          counterpartTractData: {
            value: 50,
            marginOfError: { high: 70, low: 30 }
          }
        }
      ],
      differenceData: [
        {
          id: 3,
          name: "Indicator Three",
          maxValue: 4000,
          dataLabel: "Households",
          userTractData: { value: 3040, marginOfError: { high: 70, low: 30 } },
          counterpartTractData: {
            value: 2500,
            marginOfError: { high: 70, low: 30 }
          }
        }
      ],
      lifeExpectancy: [
        {
          id: 3,

          maxValue: 90,
          dataLabel: "Years",
          userTractData: {
            value: 65,
            marginOfError: { high: null, low: null }
          },
          counterpartTractData: {
            value: 85,
            marginOfError: { high: null, low: null }
          }
        }
      ]
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
    onScroll() {
      this.$refs.addressInput.$el.focus();
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