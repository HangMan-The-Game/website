<script setup>
import Jumbo from "../components/Jumbo.vue";
import Cards from "../components/Cards.vue";
import About from "../components/About.vue";
import GameDesc from "../components/GameDesc.vue";
import Footer from "../components/Footer.vue";
const props = defineProps(['theme'])

</script>

<template>
  <main>
    <Jumbo :theme="props.theme" />
    <About />
    <GameDesc />
    <Cards />
    <Footer />
  </main>
</template>