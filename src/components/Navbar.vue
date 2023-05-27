<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary" style="background-color: #e3f2fd;">
    <div class="container">
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03"
        aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <RouterLink class="navbar-brand" to="/">
        <img src="../assets/images/HangManLogo.svg" alt="HangMan-Logo" width="100" height="50">
      </RouterLink>
      <div class=" collapse navbar-collapse" id="navbarTogglerDemo03">
        <ul class="navbar-nav mb-2 mb-lg-0">
          <li class="nav-item">
            <RouterLink to="/" class="nav-link">Home</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/about" class="nav-link">About us</RouterLink>
          </li>
        </ul>
        <ul class="navbar-nav mx-auto mb-2 mb-lg-0">
          <li class="nav-item ">
            <a class="nav-link disabled">Play Now!</a>
          </li>
        </ul>
        <div class="d-flex">
          <a href="/about" class="btn btn-link px-1 text-decoration-none">GitHub
            <i class="bi bi-box-arrow-up-right"></i>
          </a>
          <a href="/home" class="btn btn-link px-1 text-decoration-none">Instagram
            <i class="bi bi-box-arrow-up-right"></i>

          </a>
          <a href="" class="btn btn-link px-1 text-decoration-none">Twitter
            <i class="bi bi-box-arrow-up-right"></i>

          </a>

        </div>
      </div>
    </div>
  </nav>
</template>
  
<style scoped>
a.nav-link:hover {
  background-color: rgb(169, 235, 169);
}

.nav-item.active a {
  font-weight: bold;
}


a.router-link-active {
  font-weight: bold;
  color: black;
}

nav {
  border-bottom: 0.5px solid black;
}
</style>
  