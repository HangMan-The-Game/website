<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary" style="background-color: #ffffff;">
    <div class="container">
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03"
        aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <RouterLink class="navbar-brand" to="/">
        <img src="../assets/images/HangManLogo.svg" alt="HangMan-Logo" width="100" height="50">
      </RouterLink>
      <div class=" collapse navbar-collapse" id="navbarTogglerDemo03">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item fs-5">
            <RouterLink to="/" class="nav-link">Home</RouterLink>
          </li>
          <li class="nav-item fs-5">
            <RouterLink to="/about" class="nav-link">About us</RouterLink>
          </li>
          <li class="nav-item fs-5">
            <RouterLink to="/about" class="nav-link">Team</RouterLink>
          </li>
          <li class="nav-item fs-5">
            <RouterLink to="/about" class="nav-link">Contact</RouterLink>
          </li>
        </ul>
        <div class="d-flex">
          <a href="https://github.com/HangMan-The-Game" class="btn btn-link fs-3 px-2 text-decoration-none"><i
              class="bi bi-github"></i>
          </a>
          <a href="https://www.instagram.com/hangmanit_/" class="btn btn-link fs-3 px-2 text-decoration-none"><i
              class="bi bi-instagram"></i>
          </a>
          <a href="https://twitter.com/HangManGameIT" class="btn btn-link fs-3 px-2 text-decoration-none"><i
              class="bi bi-twitter"></i>
          </a>
        </div>
      </div>
    </div>
  </nav>
</template>
  
<style scoped>
a.nav-link:hover {
  color: #b33636;
}

.nav-item a {
  color: #FF4D4D;
}

.nav-item.active a {
  font-weight: bold;
}

a.router-link-active {
  font-weight: bold;
  color: #b33636;
}

.btn-link {
  color: #FF4D4D;
}

.btn-link:hover {
  color: #b33636;
}

nav {
  border-bottom: 0.5px solid black;
}
</style>
  