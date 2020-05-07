<template>
  <div class="data-bar-grouping">
    <h4>{{title}}</h4>
    <v-row>
      <v-col
        cols="12"
        sm="6"
        :class="{left: $vuetify.breakpoint.smAndUp, right: $vuetify.breakpoint.xsOnly}"
      >
        <DataBar
          v-if="neighborhoodData && !placeholder"
          :color="userDataColor"
          :numerator="neighborhoodData.value"
          :denomenator="neighborhoodData.maxValue"
          :marginOfError="neighborhoodData.marginOfError"
          :label="label"
          :valueType="valueType"
          :right="$vuetify.breakpoint.xsOnly"
          :key="neighborhoodData.value"
        />

        <DataBar
          v-if="placeholder || !neighborhoodData"
          color="#e4e4e4"
          :numerator="null"
          :denomenator="null"
          :marginOfError="null"
          label="No data"
          :valueType="null"
          :right="true"
          :key="1"
        />
      </v-col>
      <v-col cols="12" sm="6" class="right">
        <DataBar
          v-if="matchData && !placeholder"
          :color="counterpartDataColor"
          :numerator="matchData.value"
          :denomenator="matchData.maxValue"
          :marginOfError="matchData.marginOfError"
          :label="label"
          :valueType="valueType"
          :right="true"
          :key="matchData.value"
        />

        <DataBar
          v-if="placeholder || !matchData"
          color="#e4e4e4"
          :numerator="null"
          :denomenator="null"
          :marginOfError="null"
          label="No Data"
          :valueType="null"
          :right="true"
          :key="1"
        />
      </v-col>
    </v-row>
    <div class="group-popup">
      <span>
        <div>{{tooltip}}</div>
        <a class="moe-link" @click="dialog= true">{{translateText(moeLink)}}</a>
      </span>
    </div>
    <v-dialog v-model="dialog" max-width="900px" transition="dialog-transition">
      <div>
        <img :src="require('@/assets/moe-img.png')" />
        <p>{{translateText(moeDescription)}}</p>
      </div>
    </v-dialog>
  </div>
</template>
   
 
    
<script>
import DataBar from "./DataBar";
import globals from "../../../../globals";
import translate from "@/mixins/translate";
export default {
  name: "DataBarGrouping",
  components: {
    DataBar
  },
  mixins: [translate],
  data() {
    return {
      counterpartDataColor: globals.yellow,
      userDataColor: globals.darkPink,
      dialog: false,
      moeLink: {
        en: "What's that gray bar? Click here to find out more",
        es: "¿Qué es la barra gris? Haz click aquí para aprender mas"
      },
      moeDescription: {
        en:
          "There’s always some degree of uncertainty about numbers that come from samples rather than actual counts. In the bar charts on this site uncertainty is represented with an error bar, a gray line that overlaps the end of the bar. In general, the wider the error bar for an estimate, the more we need to take that estimate with a grain of salt.",
        es:
          "Siempre hay un grado de incertidumbre en los números que provienen de muestras en lugar de recuentos reales. En las graficas de barras de este sitio, la incertidumbre es representada con una barra de error, una línea gris superpuesta al final de la barra. En general, entre mas ancha la barra de error, mas tenemos que tomar el número estimado con cautela."
      }
    };
  },
  props: {
    matchData: Object,
    neighborhoodData: Object,
    title: String,
    tooltip: String,
    label: String,
    valueType: String,
    placeholder: Boolean
  }
};
</script>

<style lang="scss">
.group-popup {
  width: 100%;
  position: absolute;
  text-align: center;
  left: 0;
  top: -45px;
  opacity: 0;
  transition: opacity 200ms ease-in-out;
  z-index: 500;
  span {
    background: white;
    display: inline-block;
    padding: 15px;
    border-radius: 10px;
    color: black;
    box-shadow: 0px 4px 6px #00000063;

    div {
      font-weight: bold;
    }
  }
}

.data-bar-grouping:hover .group-popup,
.group-popup:hover {
  opacity: 1;
}

.group-popup button {
  padding: 6px;
  margin-top: 16px;
  background: white;
  border-radius: 5px;
  color: black;
  text-transform: uppercase;
  font-weight: bold;
  width: 100%;
}
.moe-link {
  font-style: italic;
  margin-top: 7px;
}

.v-dialog {
  background: white;
  padding: 40px;
}
h4 {
  text-align: center;
  font: 16px/22px Montserrat;
  font-weight: bold;
  letter-spacing: 0.24px;
}

.data-bar-grouping {
  padding-left: 48px;
  padding-right: 48px;
  margin-bottom: 26px;
  position: relative;
}

@media (max-width: 600px) {
  .data-bar-grouping {
    padding-left: 0px;
    padding-right: 0px;
  }
}

.right {
  .value-container {
    text-align: left;
    float: left;
  }
  .value-label {
    left: 0;
  }
  .margin-of-error {
    float: left;
  }

  .is-long {
    text-align: left;
  }
}

.left {
  .value-container {
    text-align: right;
    float: right;
  }

  .value-label {
    right: 0;
  }

  .margin-of-error {
    float: right;
  }

  .is-long {
    text-align: right;
  }
}
</style>