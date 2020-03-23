<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="8" lg="6">
        <v-card class="elevation-12">
          <v-toolbar :color="darkBlue" dark flat>
            <v-toolbar-title>Login</v-toolbar-title>
            <v-spacer />
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                label="Email"
                name="email"
                prepend-icon="mdi-account"
                type="text"
                :rules="emailRules"
                v-model="username"
              />

              <v-text-field
                id="password"
                label="Password"
                name="password"
                prepend-icon="mdi-lock"
                type="password"
                v-model="password"
              />
              <SomosButton block @click="login">Login</SomosButton>
            </v-form>
          </v-card-text>
          <v-card-actions></v-card-actions>
          <v-alert type="error" :value="errorMessage">{{errorMessage}}</v-alert>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { authenticationStore } from "@/store.js";
import authenticationApi from "@/api/authentication";
import { adminAppLinks } from "@/mixins/admin-app-links";
import SomosButton from "@/components/shared/SomosButton";
import globals from "@/globals";
export default {
  name: "Login",
  data() {
    return {
      password: null,
      username: null,
      storeState: authenticationStore.state,
      errorMessage: null,
      darkBlue: globals.mainDarkBlue,
      emailRules: [v => /.+@.+/.test(v) || "E-mail must be valid"]
    };
  },
  mixins: [adminAppLinks],
  methods: {
    login() {
      authenticationApi.login(
        this.appLinks.login.href,
        {
          username: this.username,
          password: this.password
        },
        response => {
          authenticationStore.setUserRoles(
            response.data.authorities.map(item => item.authority)
          );

          this.$router.replace("/admin");
        },
        response => {
          this.errorMessage = response.data.message;
        }
      );
    }
  },
  components: {
    SomosButton
  }
};
</script>

<style>
</style>