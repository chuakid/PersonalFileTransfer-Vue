<template>
  <div class="transition-all bg-gray-50 shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <h2 class="text-3xl font-medium mb-3">Download</h2>
    <div>
      <label class="">File: </label><span class="font-medium">{{ filename }}</span>
    </div>
    <div>
      Expires in
      <span v-if="hours > 0">{{ hours }} hours and</span>
      {{ minutes }} minutes
    </div>
    <div v-if="passwordNeeded">
      <label class="block font-medium" name="password">Password</label>
      <input v-model="password" id="password" title="password" class="w-full border px-1 shadow-md" type="password" />
    </div>
    <button
      @click="download"
      class="mt-4 transition-all w-full text-white rounded bg-blue-500 hover:bg-blue-700 px-2 py-2"
    >
      Download
    </button>
  </div>
</template>

<script>
import api from "../api";
import store from "../store";
export default {
  methods: {
    download() {
      api
        .post("/token/" + this.$route.params.file_id, {
          password: String(this.password),
        })
        .then((response) => {
          let link = document.createElement("a");
          link.href = api.defaults.baseURL + "/file/" + this.$route.params.file_id + "/" + response.data["token"];
          link.click();
        })
        .catch((error) => {
          console.log(error);
          alert("Wrong password");
        });
    },
  },
  data() {
    return {
      filename: "",
      password: "",
      hours: 0,
      minutes: 0,
      passwordNeeded: false,
    };
  },
  mounted() {
    api
      .get("/file/" + this.$route.params.file_id)
      .then((response) => {
        this.filename = response.data["filename"];
        this.hours = response.data["hours"];
        this.minutes = response.data["minutes"];
        this.passwordNeeded = response.data["passwordneeded"];
      })
      .catch((e) => {
        this.$router.push({ path: "/upload" });
      });
  },
};
</script>
    
<style>
</style>