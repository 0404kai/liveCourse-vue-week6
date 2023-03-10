import { createApp } from "vue";

import axios from "axios";
import VueAxios from "vue-axios";

import App from "./App.vue";
import router from "./router";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

const app = createApp(App);
app
  .use(router)
  .use(VueAxios, axios)
  .mount("#app");
