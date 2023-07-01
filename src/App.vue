<script setup>
import { RouterLink, RouterView } from "vue-router";
import Navbar from "./components/Navbar.vue";

</script >

<template :class="{ 'dark-mode': isDarkMode }">
  <Navbar />
  <RouterView />
</template>

<style>
.dark-mode {
  background-color: #343a40;
  color: #fff;
}

html {
  scroll-behavior: smooth;
  scroll-padding-top: 80px;
}
</style>