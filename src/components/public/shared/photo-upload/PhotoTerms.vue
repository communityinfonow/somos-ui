<template>
  <p v-html="translateText(termsText)"></p>
</template>

<script>
import translate from "@/mixins/translate";
export default {
  name: "PhotoTerms",
  mixins: [translate],
  data() {
    return {
      termsText: {
        en:
          "By clicking submit, you agree to our <a href=''>privacy policy</a> and <a href=''>terms of service</a>",
        es: ""
      }
    };
  }
};
</script>

<style scoped>
.text {
  line-height: 12px;
  padding: 15px;
  border-radius: 10px;
  background: #cecece;
  font-size: 12px;
}
</style>