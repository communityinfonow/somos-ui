<template>
  <v-container>
    <v-row justify="end">
      <v-col cols="12">
        <LogoutButton class="logout-btn" />
      </v-col>
    </v-row>
    <v-data-table
      :items="users"
      :headers="headers"
      item-key="id"
      hide-default-footer
      id="datatable"
      class="elevation-3"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Users</v-toolbar-title>

          <v-spacer></v-spacer>

          <v-dialog v-model="dialog" persistent max-width="290">
            <template v-slot:activator="{on}">
              <v-btn color="primary" dark v-on="on">Add User</v-btn>
            </template>
            <v-card>
              <v-card-title class="headline">{{dialogTitle}}</v-card-title>
              <v-card-text>text</v-card-text>
              <v-card-text>
                <v-form v-model="valid" ref="form" lazy-validation>
                  <v-text-field
                    label="First Name"
                    v-model="editedItem.firstName"
                    :rules="nameRules"
                    :counter="10"
                    required
                  ></v-text-field>
                  <v-text-field
                    label="Last Name"
                    v-model="editedItem.lastName"
                    :rules="nameRules"
                    :counter="10"
                    required
                  ></v-text-field>
                  <v-text-field
                    label="E-mail"
                    v-model="editedItem.emailAddress"
                    :rules="emailRules"
                    required
                  ></v-text-field>
                  <v-select
                    multiple
                    label="Role(s)"
                    v-model="editedItem.roles"
                    :items="roles"
                    item-text="name"
                    item-value="id"
                    :rules="[v => !!v || 'Item is required']"
                    return-object
                    required
                  ></v-select>
                </v-form>
                <v-alert type="error" v-if="saveResponse.error"></v-alert>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="closeDialog">Close</v-btn>
                <v-btn color="primary" text @click="saveItem" :disabled="!valid">Confirm</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <!-- TODO: 400 error handling for email already exists -->
      <template v-slot:item.roles="{item}">
        <ul v-for="role in item.roles" :key="role.id">
          <li>{{role.name}}</li>
        </ul>
      </template>
      <template v-slot:item.edit="{item}">
        <v-btn icon @click="editItem(item)">
          <v-icon primary>mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon @click="deleteItem(item)">
          <v-icon red>mdi-delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import axios from "axios";
import LogoutButton from "./shared/LogoutButton";
export default {
  name: "SuperUser",
  data() {
    return {
      users: [],
      usersResponse: {},
      dialog: false,
      headers: [
        { text: "First Name", value: "firstName" },
        { text: "Last Name", value: "lastName" },
        { text: "Email", value: "emailAddress" },
        { text: "Roles", value: "roles" },
        { text: "", value: "edit" }
      ],
      editedItem: {},
      itemIndex: -1, // used to track if editing or creating new item
      defaultItem: {
        firstName: "",
        lastName: "",
        email: "",
        roles: []
      },
      saveResponse: {
        error: false,
        text: ""
      },
      valid: false,
      selectedRoles: [],
      roles: [],
      nameRules: [
        v => (v && v.length <= 15) || "Name must be less than 15 characters"
      ],
      emailRules: [v => /.+@.+/.test(v) || "E-mail must be valid"]
    };
  },
  components: {
    LogoutButton
  },
  methods: {
    addItem: function() {
      this.editedItem = Object.assign({}, this.defaultItem);
      this.itemIndex = -1;
    },
    editItem: function(item) {
      this.itemIndex = this.users.indexOf(item);
      this.selectedRoles = item.roles;
      this.dialog = true;
      this.editedItem = Object.assign({}, item);
    },
    clearItem: function() {
      this.close();
      this.clear();
    },
    saveItem: function() {
      var self = this;
      // if edting
      if (this.itemIndex > -1) {
        Object.assign(this.users[this.itemIndex], this.editedItem);
        axios.put(this.editedItem._links.self.href, this.editedItem);
      } else {
        axios
          .post(this.usersResponse._links.self.href, this.editedItem)
          .then(response => {
            self.users.push(response.data);
          });
      }

      this.closeDialog();
    },
    closeDialog: function() {
      this.dialog = false;
      this.clear();
    },
    deleteItem: function(item) {
      this.itemIndex = this.users.indexOf(item);

      confirm("Are you sure you'd like to delete this item?") &&
        axios.delete(item._links.self.href).then(response => {
          this.users.splice(this.itemIndex, 1);
          this.clear();
        });
    },
    clear: function() {
      this.editedItem = Object.assign({}, this.defaultItem);
      this.selectedRoles = [];
      this.itemIndex = -1;
    }
  },
  computed: {
    dialogTitle: function() {
      return this.isEditingExistingUser ? "Edit User" : "Add User";
    },
    isEditingExistingUser: function() {
      return !this.itemIndex;
    }
  },
  created: function() {
    axios
      .get(process.env.VUE_APP_API_DOMAIN + "/admin/users")
      .then(response => {
        this.usersResponse = response.data;
        this.users = response.data._embedded.userDtoes;
      });

    // get all possible roles to populate when editing/adding users
    axios
      .get(process.env.VUE_APP_API_DOMAIN + "/admin/roles")
      .then(response => {
        this.roles = response.data._embedded.roleDtoes;
      })
      .catch(error => {
        this.saveResponse.error = true;
        this.saveResponse.text = error.text;
      });
  }
};
</script>

<style lang="scss" scoped>
.logout-btn {
  float: right;
}

#datatable {
  border-radius: 13px;

  header {
    border-radius: 13px;
  }
}
</style>