import "./assets/main.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import VueScrollTo from "vue-scrollto";
import CountryFlag from 'vue-country-flag-next'
import i18n from "./i18n"

createApp(App).use(router).use(VueScrollTo).use(CountryFlag).use(i18n).mount("#app");