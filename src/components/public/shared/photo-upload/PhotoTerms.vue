<template>
  <div>
    <p>
      {{translateText(termsText)}}
      <a href="#" @click="open = true">{{translateText(privacyPolicy)}}</a>
    </p>
    <v-dialog v-model="open">
      <div id="privacy-dialog">
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