<template>
  <v-btn color="primary" @click="logout">Logout</v-btn>
</template>

<script>
import authApi from "@/api/authentication";
export default {
  name: "LogoutButton",
  methods: {
    logout() {
      authApi.logout(process.env.VUE_APP_API_DOMAIN + "/logout", response => {
        this.$router.push("/admin/login");
      }); //TODO hateoas
    }
  }
};
</script>

<style>
</style>