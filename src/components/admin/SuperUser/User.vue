<template>
  <div>
    <v-dialog v-model="isOpen" persistent>
      <v-card>
        <v-card-title class="headline">{{dialogTitle}}</v-card-title>
        <v-card-text>
          <v-form v-model="valid" ref="form">
            <v-text-field
              label="First Name"
              v-model="model.firstName"
              :rules="nameRules"
              :counter="20"
              required
            ></v-text-field>
            <v-text-field
              label="Last Name"
              v-model="model.lastName"
              :rules="nameRules"
              :counter="20"
              required
            ></v-text-field>
            <v-text-field label="E-mail" v-model="model.emailAddress" :rules="emailRules" required></v-text-field>
            <v-text-field
              label="Password"
              v-model="model.password"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPassword ? 'text' : 'password' "
              @click:append="showPassword = !showPassword"
            ></v-text-field>
            <v-text-field
              label="Confirm Password"
              v-model="passwordConfirm"
              :type="showPassword ? 'text' : 'password' "
              :rules="passwordRules"
              :required="model.password && model.password.length > 0 ? true: false"
            ></v-text-field>
            <v-select
              multiple
              label="Role(s)"
              v-model="model.roles"
              :items="roles"
              item-text="name"
              item-value="id"
              :rules="[v => !!v || 'Item is required']"
              return-object
              required
            ></v-select>
          </v-form>
          <v-alert type="error" v-if="saveResponse.error">{{saveResponse.text}}</v-alert>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="close">Close</v-btn>
          <v-btn color="primary" text @click="save" :disabled="!valid">Confirm</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import * as axios from "axios";
export default {
  name: "User",
  props: {
    isOpen: Boolean,
    isNewUser: Boolean,
    model: Object,
    createUserUrl: String
  },
  data() {
    return {
      valid: false,
      showPassword: false,
      passwordConfirm: null,
      saveResponse: {
        error: false,
        text: ""
      },
      roles: [],
      nameRules: [
        v => (v && v.length <= 20) || "Name must be less than 20 characters"
      ],
      emailRules: [v => /.+@.+/.test(v) || "E-mail must be valid"],
      passwordRules: [
        v =>
          (this.model.password && !!v && v == this.model.password) ||
          "Passwords must match"
      ]
    };
  },
  methods: {
    close() {
      this.$emit("close");
      this.clear();
    },
    save() {
      // if edting
      if (!this.isNewUser) {
        axios
          .put(this.model._links.self.href, this.model)
          .then(response => {
            this.$emit("save", response.data);
            this.clear();
          })
          .catch(error => {
            this.saveResponse.error = true;
            this.saveResponse.text = error.response.data.message;
          });
      } else {
        axios
          .post(this.createUserUrl, this.model)
          .then(response => {
            this.$emit("save", response.data);
            this.clear();
          })
          .catch(error => {
            this.saveResponse.error = true;
            this.saveResponse.text = error.response.data.message;
          });
      }
    },
    clear() {
      this.passwordConfirm = null;
      this.saveResponse = { error: false, text: null };
    }
  },
  computed: {
    dialogTitle() {
      return this.isNewUser ? "Add User" : "Edit User";
    }
  },
  created() {
    // get all possible roles to populate when editing/adding users
    axios
      .get(process.env.VUE_APP_API_DOMAIN + "/admin/roles") //TODO hateoas
      .then(response => {
        this.roles = response.data._embedded.roleDtoes;
      });
  }
};
</script>

<style>
</style>