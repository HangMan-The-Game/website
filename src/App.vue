<script setup>
import { RouterLink, RouterView } from "vue-router";
import Navbar from "./components/Navbar.vue";

/* let currentLang = "en";

const updateLang = (lang) => {
  if (typeof lang === 'string') {
    currentLang = lang;
    console.log("yo: " + currentLang + " lang: " + lang);
  } else {
    console.error('Il valore passato non è una stringa.');
  }
} */

</script >

<template>
  <Navbar @lang-selected="updateLang" />
  <RouterView :langcurrent="currentLang" />
</template>

<style>
html {
  scroll-behavior: smooth;
  scroll-padding-top: 80px;
}
</style>
