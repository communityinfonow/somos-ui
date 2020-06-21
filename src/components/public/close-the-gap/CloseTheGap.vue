<template>
  <section id="close-the-gap">
    <div id="left-background" class="background"></div>
    <div id="right-background" class="background"></div>

    <h1>{{translateText(title)}}</h1>
    <p v-for="(paragraph, index) in translatedParagraphs" :key="index">{{paragraph}}</p>

    <LinksImages />
  </section>
</template>

<script>
import translate from "@/mixins/translate.js";
import LinksImages from "./LinksImages";
import globals from "@/globals.js";
import Angle from "@/components/public/shared/Angle";
export default {
  name: "CloseTheGap",
  data() {
    return {
      lightBlue: globals.mainLightBlue,
      darkBlue: globals.mainDarkBlue,
      title: { en: "Close The Gap", es: "CERRAR LA BRECHA" },
      paragraphs: [
        {
          en:
            "Media and cultural messages usually tell us that healthy habits and good health care are what’s needed for a long life. Those are important, but it may surprise you that medical care is only 20% of what affects length and quality of life, and our behaviors account for only 30%. ",
          es:
            "Los medios de comunicación y cultura generalmente nos dicen que los hábitos saludables y la buena atención médica son es lo que se necesita para una vida larga. Esos son importantes, pero le sorprenderá saber que la atención médica solo afecta el 20% de la duración y la calidad de vida, y nuestros comportamientos afectan solo el 30%."
        },
        {
          en:
            "What’s the other half of the picture? It’s social, economic, and physical factors like income and employment, education, housing and transit, community safety, social support, and air and water quality. It’s not just about what we do. It’s also about the world we live in and what happens to us.",
          es:
            "¿Qué es el restante 50%? Son factores sociales, económicos y físicos como ingresos y empleo, educación, vivienda y tránsito, seguridad comunitaria, apoyo social, calidad del aire y el agua. No se trata solo de lo que hacemos. También se trata del mundo en que vivimos y de lo que nos sucede."
        },
        {
          en:
            "Changing our own habits isn’t the only way to live longer or better. We can also work with each other to change those neighborhood conditions, laws, and systems that make it harder for us to thrive. And together we have so much more power to change harmful conditions than any of us has by ourselves. ",
          es:
            "Cambiar nuestros propios hábitos no es la única forma de vivir más o mejor. También podemos trabajar juntos para cambiar las condiciones, las leyes y los sistemas del vecindario que nos dificultan el éxito. Juntos tenemos mucho más poder para cambiar las condiciones dañinas que cualquiera de nosotros solos."
        }
      ]
    };
  },
  computed: {
    translatedParagraphs() {
      return this.paragraphs.map(paragraph => this.translateText(paragraph));
    }
  },
  mixins: [translate],
  components: {
    LinksImages,
    Angle
  }
};
</script>

<style lang="scss" scoped>
#close-the-gap {
  position: relative;
}

.background {
  position: absolute;
  height: 100%;
  width: 50%;
}

#left-background {
  background: $main-light-blue;
}

#right-background {
  right: 0;
  background: $main-dark-blue;
}

h1 {
  margin-bottom: 44px;
}

p {
  padding-left: 5%;
  padding-right: 5%;
}

h1,
p {
  color: white;
  position: relative;
  z-index: 2;
}
</style>