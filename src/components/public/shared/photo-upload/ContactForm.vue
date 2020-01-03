/** Contact form for folks to enter personal information when submitting photos */
<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field v-model="firstName" :rules="nameRules" :counter="15" label="First name"></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field v-model="lastName" :rules="nameRules" :counter="15" label="Last name"></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field v-model="emailAddress" :rules="emailRules" label="E-mail"></v-text-field>
        </v-col>
      </v-row>
    </v-container>

    <!-- TODO: note about collection on data w/ link to terms of service -->
  </div>
</template>

<script>
import { store } from "../../../../store";
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
      emailRules: [v => /.+@.+/.test(v) || "E-mail must be valid"]
    };
  },
  components: {},
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