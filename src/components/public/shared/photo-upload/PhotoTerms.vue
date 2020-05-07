<template>
  <div>
    <p>
      {{translateText(termsText)}}
      <a href="#" @click="open = true">{{translateText(privacyPolicy)}}</a>
    </p>
    <v-dialog v-model="open">
      <div id="privacy-dialog" v-if="language=== 'es'">
        <div id="cancel" @click="open = false">X</div>
        <div>
          <p>¡Gracias por ser parte de Somos Neighbors!</p>
          <p>Somos Neighbors es un projecto de Community Information Now (CI:Now), una asociación sin fines de lucro en el condado de Bexar. Queremos decirte un poco mas sobre lo que está por pasar.</p>
          <p>
            <b>Al subir una foto, tu accedes a que CI:NOW muestre tu foto.</b>
            Accedes a no recibir pago por la foto o recibir crédito como la persona que tomo la foto.
          </p>
          <p>
            Algunos lugares en los que tu foto puede ser mostrada incluyen el sitio
            <a
              href="http://somosneighbors.com/"
              target="_blank"
              rel="noopener noreferrer"
            >somosneighbors.com</a> , el sitio
            <a
              href="http://cinow.info/"
              target="_blank"
              rel="noopener noreferrer"
            >CINow.info</a>, volantes, boletines informativos, reportes y artículos de noticias sobre el proyecto.
          </p>
          <p>La foto puede decir en que vecindario fue tomada, mas no puede decir quien la tomo o cuando se tomó. Nosotros nunca venderemos tu foto, tu nombre o cualquier otra información sobre ti.</p>
          <p>
            Debido a que queremos mantener el respeto en esta comunidad, nosotros veremos las fotos que han sido cargadas.
            <b>Las fotos no serán publicadas en el sitio hasta que hayan sido revisadas y aprobadas.</b>Esto durara alrededor de tres días hábiles.
          </p>
          <p>¡Gracias de nuevo por compartir lo que más amas de tu vecindario!</p>
        </div>
      </div>
      <div id="privacy-dialog" v-if="language=== 'en'">
        <div id="cancel" @click="open = false">X</div>
        <div>
          <p>Thank you for being part of Somos Neighbors!</p>
          <p>Somos Neighbors is a project of Community Information Now (CI:Now), a nonprofit here in Bexar County. We want to tell you a little more about what happens next.</p>
          <p>
            <b>By uploading a photo, you agree to let CI:Now show the photo.</b> You agree that you will not be paid for the photo or given credit as the person who took it.
          </p>
          <p>
            Some of the places your photo may be shown are the
            <a
              href="http://somosneighbors.com/"
              target="_blank"
              rel="noopener noreferrer"
            >somosneighbors.com</a> website, the
            <a
              href="http://cinow.info/"
              target="_blank"
              rel="noopener noreferrer"
            >CINow.info</a> website, flyers, newsletters, reports, and news stories about the project.
          </p>
          <p>The photo may say what neighborhood it’s from, but not who took it or when. We will never sell your photo, your name, or anything else about you.</p>
          <p>
            Because we want to keep this community respectful, we look at all the photos that are uploaded.
            <b>Photos will not show up on the website until they have been checked and approved.</b>That takes about three business days.
          </p>
          <p>Thank you again for sharing what you love about your neighborhood!</p>
        </div>
      </div>
    </v-dialog>
  </div>
</template>

<script>
import translate from "@/mixins/translate";
export default {
  name: "PhotoTerms",
  mixins: [translate],
  data() {
    return {
      open: false,
      termsText: {
        en: "By clicking submit, you agree to our ",
        es: "Al presionar enviar, aceptas nuestra "
      },
      privacyPolicy: {
        en: "photo share privacy policy",
        es: "política de privacidad de colaboración de fotos"
      }
    };
  }
};
</script>

<style lang="scss" scoped>
#privacy-dialog {
  padding: 25px;
  border-radius: 10px;
  background: white;
}

#cancel {
  position: absolute;
  right: 11px;
  font-weight: bold;
  font-size: 18px;
  cursor: pointer;
  width: 26px;
  text-align: center;
  border-radius: 50%;
  height: 26px;
  top: 10px;

  &:hover {
    background: #cecece;
    transition: background 250ms ease-in;
  }
}
</style>