<template>
  <router-link :to="{ name: 'download', params: { file_id: file } }">
    <div class="bg-indigo-700 text-center transform hover:scale-110 transition mt-2 text-white rounded">
      <span class="block px-2 transition py-1 bg-indigo-900">{{ filename }}</span>
      <span class="block px-2 py-1">Expires in {{ hoursleft }} {{ minutes }} minutes</span>
    </div>
  </router-link>
</template>

<script>
import api from "../api";
import store from "../store";
export default {
  computed: {
    hoursleft() {
      return this.hours ? this.hours + " and" : "";
    },
  },
  props: ["file"],
  data() {
    return {
      previousFilesStore: store,
      filename: 0,
      hours: 0,
      minutes: 0,
    };
  },
  mounted() {
    api
      .get("/file/" + this.file)
      .then((response) => {
        this.filename = response.data["filename"];
        this.hours = response.data["hours"];
        this.minutes = response.data["minutes"];
        if (this.hours == 0 && this.minutes == 0) {
          this.previousFilesStore.removeFileFromStore(this.file);
        }
      })
      .catch((e) => {
        this.previousFilesStore.removeFileFromStore(this.file);
      });
  },
};
</script>

<style>
</style>