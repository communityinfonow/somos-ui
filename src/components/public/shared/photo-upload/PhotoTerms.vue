<template>
  <div>
    <div v-if="languageCode = 'en'" class='text'>
      <p>
      Thank you for being part of Somos Neighbors!
      </p>
      <p>
      Somos Neighbors is a project of Community Information Now (CI:Now), a nonprofit here in Bexar County. We want to tell you a little more about what happens next.
      </p>
    <p> <b> By uploading a photo, you agree to let CI:Now show the photo.</b> You agree that you will not be paid for the photo or given credit as the person who took it.</p>
      <p>Some of the places your photo may be shown are the <a href="http://somosneighbors.com/" target="_blank" rel="noopener noreferrer">somosneighbors.com</a> website, the <a href="http://cinow.info/" target="_blank" rel="noopener noreferrer">CINow.info</a> website, flyers, newsletters, reports, and news stories about the project.</p>
      <p>The photo may say what neighborhood it’s from, but not who took it or when. We will never sell your photo, your name, or anything else about you.</p>
      <p>Because we want to keep this community respectful, we look at all the photos that are uploaded. <b>Photos will not show up on the website until they have been checked and approved. </b>That takes about three business days.</p>
      <p>Thank you again for sharing what you love about your neighborhood!</p>
    </div>
    <div v-if="languageCode = 'es'" class="text"></div>
  </div>
</template>

<script>
import translate from "@/mixins/translate";
export default {
  name: "PhotoTerms",
  mixins: [translate]
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