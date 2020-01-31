
// TODO: change name of component since there's not a *single* admin view
<template>
  <v-container>
    <v-row justify="end">
      <v-col cols="12" sm="5" id="admin-menu">
        <v-btn v-if="isSuperUser" @click="usersClick">Manage Users</v-btn>

        <v-btn color="primary" @click="logout">Logout</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-btn-toggle v-model="approvedFilter">
          <v-btn :value="false">Not Approved</v-btn>
          <v-btn :value="true">Approved</v-btn>
        </v-btn-toggle>
      </v-col>
    </v-row>

    <PhotoSelector
      v-for="tract in filteredPhotos"
      :key="tract[0]"
      :tract="tract[0]"
      :photos="tract[1]"
      @delete="deleteTract"
    ></PhotoSelector>
  </v-container>
</template>

<script>
import PhotoSelector from "./photos/PhotoSelector";
import { store } from "../../store";
import { authenticationStore } from "@/store";
import PhotoData from "../../api/photo-data";
import { adminAppLinks } from "../../mixins/admin-app-links";
import authApi from "@/api/authentication.js";
export default {
  name: "Admin",
  data() {
    return {
      storeState: store.state,
      approvedFilter: false,
      photos: [],
      authState: authenticationStore.state
    };
  },
  methods: {
    deleteTract(tract) {
      this.filteredPhotos.delete(tract);
      //TODO delete the tract if it no longer has photos left
    },
    usersClick() {
      this.$router.push("/admin/users");
    },
    logout() {
      authApi.logout(process.env.VUE_APP_API_DOMAIN + "/logout", response => {
        this.$router.push("/admin/login");
      }); //TODO hateoas
    },
    getPhotos(url) {
      PhotoData.get(url, response => {
        this.photos = response;
        //TODO: error handling
      });
    }
  },
  components: {
    PhotoSelector
  },
  mixins: [adminAppLinks],
  watch: {
    appLinks: function(newLinks) {
      this.getPhotos(newLinks.photos.href);
    }
  },

  computed: {
    filteredPhotos() {
      var map = new Map();
      var toggledPhotos = this.photos.filter(
        photo =>
          photo.approved === this.approvedFilter ||
          (photo.approved === null && this.approvedFilter === false)
      );
      toggledPhotos.forEach(photo => {
        if (map.has(photo.censusTractId)) {
          if (map.get(photo.censusTractId).length > 0) {
            map.get(photo.censusTractId).push(photo);
          } else {
            map.delete(photo.censusTractId);
          }
        } else {
          map.set(photo.censusTractId, [photo]);
        }
      });
      return map;
    },
    isSuperUser() {
      return this.authState.userRoles.find(role => role === "ROLE_SUPER_USER");
    }
  }
};
</script>

<style lang="scss">
#admin-menu {
  text-align: right;
  button {
    margin: 5px;
  }
}
</style>