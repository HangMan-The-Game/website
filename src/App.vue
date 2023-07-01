<script setup>
import { RouterLink, RouterView } from "vue-router";
import Navbar from "./components/Navbar.vue";
import { ref } from "vue";

</script >

<script>
const previousLang = localStorage.lang || "English";
const theme = ref(false);

export default {
  created() {
    if (previousLang) {
      this.$i18n.locale = previousLang;
    } else {
      this.$i18n.locale = "English";
    }
  },
  methods: {
    saveLocale(locale) {
      //this.$i18n.locale = locale;
      localStorage.setItem("lang", locale);
    },
    toggleTheme(isDark) {
      theme.value = isDark;
    }
  },
};
</script>

<template>
  <Navbar @locale-changed="saveLocale" @toggle-theme="toggleTheme" />
  <RouterView :theme="theme" />
</template>

<style>
.dark {
  background-color: #343a40 !important;
  color: #fff;
}

html {
  scroll-behavior: smooth;
  scroll-padding-top: 80px;
}
</style>