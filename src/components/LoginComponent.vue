<template>
  <div class="transition-all bg-gray-50 shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <form @submit.prevent="login">
      <div class="mb-2">
        <label class="block font-medium">Password</label>
        <input class="px-1 w-full shadow-md border" type="password" v-model="password" />
      </div>
      <button
        type="button"
        @click="login"
        class="w-full mt-2 py-2 px-2 bg-blue-500 rounded hover:bg-blue-700 text-white transition"
      >
        Login
      </button>
    </form>
  </div>
</template>

<script>
import api from "../api";
import store from "../store";
export default {
  methods: {
    login() {
      api
        .post("/login", {
          password: String(this.password),
        })
        .then((response) => {
          store.setToken(response.data.token);
          this.$router.push(this.$route.query.redirect || { name: "upload" });
        })
        .catch((error) => {
          console.log(error);
          alert("Wrong password");
        });
    },
  },
  data() {
    return {
      password: "",
      store: store,
    };
  },
};
</script>

<style>
</style>