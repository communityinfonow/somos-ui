<template>
  <footer>
    <v-img class="somos-logo" :src="require('./somos-logo.svg')"></v-img>

    <v-row>
      <v-col cols="12" md="3" v-for="(link, index) in links" :key="index">
        <div class="somos-link">
          <a
            :href="link.link"
            :style="{'float': index >=12/6 && $vuetify.breakpoint.mdAndUp ? 'right' : 'none'}"
          >{{translateText(link.text)}}</a>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-row justify="space-between">
          <div class="color-block" :style="{backgroundColor: blockColors[0]}"></div>
          <div class="color-block" :style="{backgroundColor: blockColors[1]}"></div>
        </v-row>

        <span id="footer-links">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://cinow.info/somos-neighbors/"
            class="px-2"
          >{{translateText(aboutText)}}</a>

          <a
            href="/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
            class="px-2"
          >{{translateText(privacyPolicyText)}}</a>
          <a
            href="/terms-of-service"
            target="_blank"
            rel="noopener noreferrer"
            class="px-2"
          >{{translateText(termsText)}}</a>
        </span>
        <img id="cinow-logo" :src="require('./CI Now+UTH.png')" />
      </v-col>
    </v-row>
  </footer>
</template>

<script>
import globals from "@/globals.js";
import translate from "@/mixins/translate";
export default {
  name: "Footer",
  mixins: [translate],
  data() {
    return {
      links: [
        {
          text: { en: "meet your neighbors", es: "CONOCE A TUS VECINOS" },
          link: "#meet-your-neighbors"
        },
        {
          text: { en: "find your match", es: "ENCUENTRE A SU PAR" },
          link: "#find-your-match"
        },
        {
          text: {
            en: "life expectancy in bexar county",
            es: "Expectativa de vida del condado de bexar"
          },
          link: "#life-expectancy-in-bexar"
        },
        {
          text: { en: "close the gap", es: "CERRAR LA BRECHA" },
          link: "#close-the-gap"
        }
      ],
      blockColors: [globals.mainLightBlue, globals.mainDarkBlue],
      aboutText: { en: "About the Project", es: "Acerca del Proyecto" },
      privacyPolicyText: {
        en: "Privacy Policy",
        es: "Política de Privacidad "
      },
      termsText: { en: "Terms of Service", es: "Términos del Servicio" }
    };
  }
};
</script>

<style lang="scss" scoped>
footer {
  .somos-logo {
    width: 273px;
    margin: auto;
    margin-bottom: 30px;
  }
  position: relative;
  width: 100%;
  top: -42px;
}

@media (max-width: 400px) {
  #cinow-logo {
    width: 100% !important;
    height: auto !important;
  }
  footer {
    top: 0 !important;
  }
}

@media (max-width: 760px) {
  #cinow-logo {
    display: block;
    margin: auto;
    float: none !important;
  }

  #footer-links {
    display: block;
    text-align: center;
    float: none !important;
  }
}

@media (max-width: 960px) {
  .somos-link {
    font-size: 1.7rem !important;
  }
}

#cinow-logo {
  height: 48px;
  width: auto;
  float: left;
}

#footer-links {
  float: right;
}

.color-block {
  height: 9px;
  width: 50%;
}

.somos-link {
  text-align: center;
  font: 500 1.286rem Bebas Neue;
  letter-spacing: 3.6px;
  a {
    color: $main-dark-blue;
    text-decoration: none;
  }

  text-transform: uppercase;

  &:hover {
    color: $main-light-blue;
  }

  transition: color 200ms ease-in-out;
}
</style>