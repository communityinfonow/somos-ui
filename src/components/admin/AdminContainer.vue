<template>
  <v-container>
    <v-row justify="center">
      <v-btn-toggle multiple>
        <v-btn>
          <router-link to="/admin">Admin</router-link>
        </v-btn>
        <v-btn>
          <router-link to="/admin/users">Users</router-link>
        </v-btn>
      </v-btn-toggle>
    </v-row>
    <v-row></v-row>
  </v-container>
</template>

<script>
export default { name: "AdminContainer"};
</script>

<style>
</style>