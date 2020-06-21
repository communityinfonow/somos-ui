/** Contact form for folks to enter personal information when submitting photos */
<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="firstName"
            :rules="nameRules"
            :counter="15"
            :label="translateText(firstNameLabel)"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            v-model="lastName"
            :rules="nameRules"
            :counter="15"
            :label="translateText(lastNameLabel)"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            v-model="emailAddress"
            :rules="emailRules"
            :label="translateText(emailLabel)"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { store } from "../../../../store";
import translate from "@/mixins/translate";
export default {
  name: "ContactForm",
  data() {
    return {
      firstName: "",
      lastName: "",
      emailAddress: "",
      nameRules: [
        v => v.length <= 15 || "Name must be less than 15 characters"
      ],
      emailRules: [v => /.+@.+/.test(v) || "E-mail must be valid"],
      firstNameLabel: { en: "First name", es: "Nombre" },
      lastNameLabel: { en: "Last name", es: "Apellido" },
      emailLabel: { en: "E-mail", es: "Email" }
    };
  },
  components: {},
  mixins: [translate],
  watch: {
    firstName: function(newName) {
      store.setContactFirstName(newName);
    },
    lastName: function(newName) {
      store.setContactLastName(newName);
    },
    emailAddress: function(email) {
      store.setContactEmail(email);
    }
  }
};
</script>

<style lang="scss" scoped>
input {
  display: block;
}
</style>