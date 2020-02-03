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
          <v-btn color="primary" dark @click="open">Add User</v-btn>
          <User
            :isOpen="dialog"
            :isNewUser="!isEditingExistingUser"
            :model="editedItem"
            :createUserUrl="createUserUrl"
            @close="closeDialog"
            @save="saveItem"
            @open="open"
          />
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
import User from "./User";
import LogoutButton from "@/components/admin/shared/LogoutButton";
export default {
  name: "SuperUser",
  data() {
    return {
      users: [],
      createUserUrl: null,
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
      selectedRoles: []
    };
  },
  components: {
    LogoutButton,
    User
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
    saveItem(savedItem) {
      if (this.isEditingExistingUser) {
        Object.assign(this.users[this.itemIndex], this.editedItem);
      } else {
        self.users.push(responseData);
      }

      this.closeDialog();
    },
    closeDialog() {
      this.dialog = false;
      this.clear();
    },
    open() {
      this.dialog = true;
    },
    deleteItem(item) {
      confirm("Are you sure you'd like to delete this item?") &&
        axios.delete(item._links.self.href).then(response => {
          this.users.splice(this.users.indexOf(item), 1);
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
    isEditingExistingUser: function() {
      return this.itemIndex > -1;
    }
  },
  created: function() {
    axios
      .get(process.env.VUE_APP_API_DOMAIN + "/admin/users") //TODO hateoas
      .then(response => {
        this.createUserUrl = response.data._links.self.href;
        this.users = response.data._embedded.userDtoes;
      });

    // get all possible roles to populate when editing/adding users
    axios
      .get(process.env.VUE_APP_API_DOMAIN + "/admin/roles") //TODO hateoas
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