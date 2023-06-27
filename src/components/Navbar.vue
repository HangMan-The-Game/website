<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<script>
export default {
  data() {
    return {
      lang: 'en',
      langText: 'English',
      options: [
        { value: 'en', text: 'English' },
        { value: 'it', text: 'Italiano' }
      ]
    };
  },
  methods: {
    selectOption(option) {
      this.lang = option.value;
      this.langText = option.text;
      this.$emit('lang-selected', this.lang);
    }
  }
};
</script>

<template>
  <nav class="navbar sticky-top navbar-expand-lg bg-body-tertiary scrollspy-navbar" style="background-color: #ffffff">
    <div class="container">
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03"
        aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <RouterLink class="navbar-brand" to="/">
        <img src="../assets/images/HangManLogo.svg" alt="HangMan-Logo" width="100" height="50" />
      </RouterLink>

      <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item fs-5">
            <div class="btn-group">
              <RouterLink to="/" class="nav-link" :class="$route.href == '/' ? 'router-link-active' : 'deactivated'">Home
              </RouterLink>
              <button type="button" class="btn dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown"
                aria-expanded="false">
                <!-- <span class="sr-only"></span> -->
              </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li>
                  <a v-if="$route.name == 'home'" class="dropdown-item"
                    :class="$route.href == '/#about' ? 'router-link-active' : ''" href="#about">{{ $t("message.nav1", {},
                      { locale: lang }) }}</a>
                  <a v-if="$route.name != 'home'" class="dropdown-item"
                    :class="$route.href == '/#about' ? 'router-link-active' : ''" href="/#about">{{
                      $t("message.nav1", {}, {
                        locale: lang
                      }) }}</a>
                </li>
                <li>
                  <a v-if="$route.name == 'home'" class="dropdown-item"
                    :class="$route.href == '/#gamedesc' ? 'router-link-active' : ''" href="#gamedesc">{{
                      $t("message.nav2", {}, { locale: lang }) }}</a>
                  <a v-if="$route.name != 'home'" class="dropdown-item"
                    :class="$route.href == '/#gamedesc' ? 'router-link-active' : ''" href="/#gamedesc">{{
                      $t("message.nav2", {}, {
                        locale: lang
                      }) }}</a>
                </li>
                <li>
                  <a v-if="$route.name == 'home'" class="dropdown-item"
                    :class="$route.href == '/#team' ? 'router-link-active' : ''" href="#team">{{ $t("message.nav3", {}, {
                      locale: lang
                    }) }}</a>
                  <a v-if="$route.name != 'home'" class="dropdown-item"
                    :class="$route.href == '/#team' ? 'router-link-active' : ''" href="/#team">{{ $t("message.nav3", {}, {
                      locale: lang
                    }) }}</a>
                </li>
              </ul>
            </div>
          </li>
          <li class="nav-item fs-5">
            <RouterLink to="/about" class="nav-link">{{ $t("message.nav4", {}, { locale: lang }) }}</RouterLink>
          </li>
          <li class="nav-item fs-5">
            <RouterLink to="/leaderboard" class="nav-link">{{ $t("message.nav5", {}, { locale: lang }) }}</RouterLink>
          </li>
        </ul>
        <div class="d-flex align-items-center">
          <!-- language selector : to-do -->
          <div class="dropdown fs-2">
            <button class="btn dropdown-toggle" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown"
              aria-expanded="false" disabled>
              <span class="position-absolute top-100 start-50 translate-middle badge rounded-pill text-bg-warning">
                WIP
              </span>
              <i class="bi bi-translate text-info"></i> {{ langText }}
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton2">
              <li v-for="option in options" :key="option.value">
                <a class="dropdown-item disabled" href="#" @click="selectOption(option)">
                  <i class="bi bi-translate text-info"></i> {{ option.text }}
                </a>
              </li>
            </ul>
          </div>
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
.dropdown-menu {
  min-width: 7.2rem;
}

.selectpicker {
  border: none;
}

/* .btn {
  border: none;
}
 */
.btn:hover {
  color: #b33636;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

a.dropdown-item:active {
  background-color: #ec9c9c;
}

a.nav-link:hover {
  color: #b33636;
}

.nav-item a {
  color: #ff4d4d;
}

.deactivated {
  color: #ff4d4d;
}

.nav-item.active a {
  font-weight: bold;
}

a.router-link-active {
  font-weight: bold;
  color: #b33636;
}

.btn-link {
  color: #ff4d4d;
}

.btn-link:hover {
  color: #b33636;
}

nav {
  border-bottom: 0.5px solid black;
}
</style>
