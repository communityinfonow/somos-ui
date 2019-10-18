/** Contact form for folks to enter personal information when submitting photos */
<template>
  <div>
    <label for="first-name">First Name</label>
    <TextInput id="first-name" v-model="firstName" />
    <label for="last-name">Last Name</label>
    <TextInput id="last-name" v-model="lastName" />
    <label for="email-address">Email</label>
    <TextInput id="email-address" v-model="emailAddress" />
    <!-- TODO: note about collection on data w/ link to terms of service -->
  </div>
</template>

<script>
import TextInput from "../shared/TextInput";
import { store } from "../../store";
export default {
  name: "ContactForm",
  data() {
    return {
      firstName: "",
      lastName: "",
      emailAddress: ""
    };
  },
  components: {
    TextInput
  },
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