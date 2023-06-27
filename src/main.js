import "./assets/main.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import VueScrollTo from "vue-scrollto";
import CountryFlag from 'vue-country-flag-next'
import { createI18n } from "vue-i18n";

const i18n = createI18n({
  legacy: false,
  locale: "en",
  globalInjection: true,
  messages: {
    en: {
        message: {
          language: "English",
          nav1: "About us",
          nav2: "Game Description",
          nav3: "Team",
          nav4: "Contact us",
          nav5: "Leaderboard",
          jumbo1: "Learn More!"
        }
      },
      it: {
        message: {
          language: "Italiano",
          nav1: "Chi siamo",
          nav2: "Descrizione Gioco",
          nav3: "Squadra",
          nav4: "Contattaci",
          nav5: "Classifica",
          jumbo1: "Scopri di Più!"
        }
      }
    }
});

createApp(App).use(router).use(VueScrollTo).use(CountryFlag).use(i18n).mount("#app");