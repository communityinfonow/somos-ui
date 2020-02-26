<template>
  <v-dialog v-model="model" width="50%" id="closest-tract-dialog">
    <v-card>
      <v-card-title
        class="headline lighten-2"
        primary-title
        id="closest-tract-title"
      >{{translateText(noDataTitle)}}</v-card-title>

      <v-card-text>
        <p v-html="translateText(noDataParagraph)"></p>
      </v-card-text>
      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="secondary" text @click="$emit('close')">{{translateText(no)}}</v-btn>
        <v-btn color="primary" text @click="$emit('proceed')">{{translateText(yes)}}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import translate from "@/mixins/translate";
export default {
  name: "NoDataDialog",
  data() {
    return {
      no: { en: "No thanks", es: "No Gracias" },
      yes: { en: "Yes", es: "Si" },
      noDataTitle: {
        en: "Location does not have data",
        es: "Esta ubicación no dispone de información"
      },
      noDataParagraph: {
        en:
          "Life expectancy data does not exist for the location you selected.</br>Would you like to view data for the nearest neighborhood?",
        es:
          "Información sobre la expectativa de vida no existe en la ubicación seleccionada. </br>¿Te gustaría ver la información del vecindario más cercano?"
      }
    };
  },
  props: { model: Boolean },
  mixins: [translate]
};
</script>

<style lang="scss" scoped>
#closest-tract-title {
  background: $main-dark-blue;
  color: white;
  margin-bottom: 13px;
}

#closest-tract-dialog {
  p {
    font-size: 16px;
    font-family: Montserrat;
  }
}
</style>