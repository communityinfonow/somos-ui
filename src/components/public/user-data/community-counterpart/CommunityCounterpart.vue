<template>
  <v-container id="community-counterpart">
    <h1>Find your community counterpart</h1>
    <p>
      We’re connecting our community together! Meet your counterpart: A neighborhood exactly like yours, with a few major differences.
      Enter your information below and click the button to find out how these differences impact you and your neighbors.
    </p>
    <AddressSearch class="address-search" @selected="selectionHandler"></AddressSearch>
    <v-row id="location-groups">
      <v-col cols="12" sm="6" class="left pr-0 mr-0">
        <LocationGroup :image="require('../left-flag.svg')" title="your location" />
      </v-col>
      <v-col cols="12" sm="6" class="right pl-0 ml-0">
        <LocationGroup :image="require('../right-flag.svg')" title="your counterpart" />
      </v-col>
    </v-row>
    <DataDisplay title="you two have a lot in common. take a look:" :data="commonData" />
    <DataDisplay title="you two are also very different" :data="differenceData" />
  </v-container>
</template>

<script>
import AddressSearch from "./address-search/AddressSearch";
import DataDisplay from "./DataDisplay";
import LocationGroup from "./LocationGroup";
import { userDataStore } from "../userDataStore";
export default {
  name: "CommunityCounterpart",
  components: {
    AddressSearch,
    DataDisplay,
    LocationGroup
  },
  data() {
    return {
      storeState: userDataStore.state,
      commonData: [
        {
          id: 1,
          name: "Indicator One",
          maxValue: 100,
          dataLabel: "%",
          userTractData: { value: 40 },
          counterpartTractData: { value: 50 }
        },
        {
          id: 2,
          name: "Indicator Two",
          maxValue: 100,
          dataLabel: "%",
          userTractData: { value: 24.5 },
          counterpartTractData: { value: 50 }
        }
      ],
      differenceData: [
        {
          id: 3,
          name: "Indicator Three",
          maxValue: 4000,
          dataLabel: "Households",
          userTractData: { value: 3040 },
          counterpartTractData: { value: 2500 }
        }
      ]
    };
  },
  methods: {
    selectionHandler(selection) {
      userDataStore.setAddress(selection);
    }
  }
};
</script>

<style lang="scss" >
#community-counterpart {
  p {
    text-align: center;
    width: 80%;
    margin: auto;
    padding-bottom: 20px;
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
      font-weight: bold;
    }
  }

  .right {
    h2 {
      text-align: left;
    }

    .location-image {
      text-align: left;
    }

    .location-text {
      padding-left: 30px;
      left: 40%;
      top: 36%;
    }
  }

  .left {
    h2 {
      text-align: right;
    }

    .location-text {
      padding-right: 30px;
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