<script setup>
import { RouterLink, RouterView } from "vue-router";
import Navbar from "./components/Navbar.vue";
</script>

<script>
export default {
  watch: {
    $route(to, from) {
      if (to.meta.scrollToTop) {
        const navbarHeight = document.querySelector(".navbar").offsetHeight;
        this.$scrollTo.scrollTo("#app", 500, { offset: -navbarHeight }); // ID del tuo elemento principale
      }
    },
  },
};
</script>

<template>
  <Navbar />

  <RouterView />
</template>

<style>
html {
  scroll-behavior: smooth;
  scroll-padding-top: 80px;
}
</style>
