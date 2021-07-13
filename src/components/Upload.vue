<template>
  <div class="flex bg-gray-50 shadow-md rounded">
    <form id="form" class="px-8 pt-6 pb-8">
      <h2 class="text-3xl font-medium text-center mb-3">Upload</h2>
      <div class="mb-2">
        <label class="block font-medium">File</label
        ><input name="file" v-on:change="fileChanged" class="cursor-pointer" type="file" />
      </div>
      <div class="mb-2">
        <label class="block font-medium">Password (optional)</label>
        <input class="px-1 w-full shadow-md border" type="password" v-model="password" />
      </div>
      <button
        @click="submit"
        class="w-full mt-2 py-2 px-2 bg-blue-500 rounded hover:bg-blue-700 text-white transition"
        id="submit"
        type="button"
      >
        Upload
      </button>
      <div v-if="uploadStarted" class="relative pt-1">
        <div class="flex mb-2 items-center justify-between">
          <div>
            <span
              class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-indigo-600 bg-indigo-200"
            >
              Upload Progress
            </span>
          </div>
          <div class="text-right">
            <span class="text-xs font-semibold inline-block text-indigo-600"> {{ uploadProgress }}% </span>
          </div>
        </div>
        <div class="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-200">
          <div
            :style="progressBarWidth"
            class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500"
          ></div>
        </div>
      </div>
      <div v-if="uploadSuccess" class="rounded bg-indigo-900 hover:bg-indigo-500 pr-2 mt-2 transition">
        <span class="rounded inline-block bg-indigo-700 shadow-none text-white px-3 mr-2">Link</span>
        <router-link :to="{ name: 'download', params: { file_id: fileid } }" class="text-white">
          {{ downloadLink }}
        </router-link>
      </div>
    </form>
    <div class="flex flex-col bg-gray-50 border-l px-8 pt-6 pb-8">
      <h2 class="text-3xl font-medium text-center mb-3">Previous Files</h2>
      <uploaded-file-component
        v-for="file in previousFilesStore.previousFiles"
        :key="file"
        :file="file"
      ></uploaded-file-component>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import store from "../store";
import UploadedFileComponent from "./UploadedFileComponent.vue";
export default {
  components: { UploadedFileComponent },
  mounted() {
    this.previousFilesStore.loadStore();
  },
  computed: {
    progressBarWidth() {
      return "width: " + this.uploadProgress + "%";
    },
  },
  methods: {
    fileChanged(e) {
      this.file = e.target.files[0];
    },
    submit() {
      let formData = new FormData();
      formData.append("file", this.file);
      formData.append("password", this.password);
      axios
        .put(store.apis.file, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            this.uploadStarted = true;
            this.uploadProgress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
            // console.log(progressEvent.loaded / progressEvent.total),
          },
        })
        .then((response) => {
          this.fileid = response.data["file_id"];
          this.downloadLink =
            window.location.protocol + "//" + window.location.host + "/download/" + response.data["file_id"];
          this.uploadSuccess = true;
          this.uploadStarted = false;
          this.previousFilesStore.addFileToStore(response.data["file_id"]);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  data() {
    return {
      previousFilesStore: store,
      uploadProgress: 0,
      uploadStarted: false,
      file: null,
      password: "",
      uploadSuccess: false,
      downloadLink: "",
    };
  },
};
</script>

<style>
</style>