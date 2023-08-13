<script setup>
import { RouterLink, RouterView } from "vue-router";
import { useDark, useToggle } from "@vueuse/core";
import { getAuth } from "firebase/auth";
import { auth } from '@/firebase.js';
import { onMounted, ref } from "vue";
const isDark = useDark({
  selector: "body", //element to add attribute to
  attribute: "theme", // attribute name
  valueDark: "custom-dark", // attribute value for dark mode
  valueLight: "custom-light", // attribute value for light mode
});
const emit = defineEmits(['toggleTheme'])

const toggleDark = useToggle(isDark);
const toggleTheme = () => {
  toggleDark();
  emit("toggleTheme", isDark.value);
}

const isLoggedIn = ref(false);
const isEmailVerified = ref(false);

function checkEmailVerification() {
  const user = getAuth().currentUser;
  isLoggedIn.value = user !== null;

  if (user) {
    isEmailVerified.value = user.emailVerified;
  } else {
    isEmailVerified.value = false;
  }

  console.log(
    `L'utente è ${isLoggedIn.value ? "loggato" : "non loggato"} e ${isEmailVerified.value ? "ha" : "non ha"
    } verificato l'email.`
  );

  return isLoggedIn.value && !isEmailVerified.value;
}

const unsubscribe = auth.onAuthStateChanged(() => {
  checkEmailVerification();
});

onMounted(() => {
  emit("toggleTheme", isDark.value || false);
  unsubscribe();
})
</script>

<script>
export default {
  data() {
    return {
      isDarkMode: false
    };
  },
  methods: {
    toggleTheme() {
      this.isDarkMode = !this.isDarkMode;
    },
    changeLocale(locale) {
      this.$i18n.locale = locale;
      this.$emit("locale-changed", locale);
    },
  }
}
</script>

<template>
  <nav :class="isDark ? 'navbar-dark' : ''" class="navbar sticky-top navbar-expand-lg bg-body-tertiary scrollspy-navbar"
    style="background-color: #ffffffec">
    <div class=" container">
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03"
        aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <RouterLink class="navbar-brand" to="/">
        <img v-if="isDark" src="../assets/images/HangManLogoWhite.svg" alt="HangMan-Logo" width="100" height="50" />
        <img v-else src="../assets/images/HangManLogo.svg" alt="HangMan-Logo" width="100" height="50" />
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
                    :class="$route.href == '/#about' ? 'router-link-active' : ''" href="#about">{{ $t("navbar.aboutUs")
                    }}</a>
                  <a v-if="$route.name != 'home'" class="dropdown-item"
                    :class="$route.href == '/#about' ? 'router-link-active' : ''" href="/#about">{{
                      $t("navbar.aboutUs") }}</a>
                </li>
                <li>
                  <a v-if="$route.name == 'home'" class="dropdown-item"
                    :class="$route.href == '/#gamedesc' ? 'router-link-active' : ''" href="#gamedesc">{{
                      $t("navbar.gameDescription") }}</a>
                  <a v-if="$route.name != 'home'" class="dropdown-item"
                    :class="$route.href == '/#gamedesc' ? 'router-link-active' : ''" href="/#gamedesc">{{
                      $t("navbar.gameDescription") }}</a>
                </li>
                <li>
                  <a v-if="$route.name == 'home'" class="dropdown-item"
                    :class="$route.href == '/#team' ? 'router-link-active' : ''" href="#team">{{ $t("navbar.team") }}</a>
                  <a v-if="$route.name != 'home'" class="dropdown-item"
                    :class="$route.href == '/#team' ? 'router-link-active' : ''" href="/#team">{{ $t("navbar.team") }}</a>
                </li>
                <!--                 <li>
                  <a v-if="$route.name == 'home'" class="dropdown-item"
                    :class="$route.href == '/#partners' ? 'router-link-active' : ''" href="#partners">{{
                      $t("navbar.partners") }}</a>
                  <a v-if="$route.name != 'home'" class="dropdown-item"
                    :class="$route.href == '/#partners' ? 'router-link-active' : ''" href="/#partners">{{
                      $t("navbar.partners")
                    }}</a>
                </li> -->
              </ul>
            </div>
          </li>
          <li class="nav-item fs-5">
            <RouterLink to="/contact" class="nav-link">{{ $t("navbar.contactUs") }}</RouterLink>
          </li>
          <li class="nav-item fs-5">
            <RouterLink to="/leaderboard" class="nav-link">{{ $t("navbar.leaderboard") }}</RouterLink>
          </li>
          <li class="nav-item fs-5">
            <RouterLink to="/menu" class="nav-link">{{ $t("navbar.play") }}</RouterLink>
          </li>
        </ul>
        <div class="d-flex align-items-center">
          <!-- language selector : to-do -->
          <!--           <div class="locale-changer">
            <select v-model="$i18n.locale">
              <option v-for="locale in $i18n.availableLocales" :key="locale" :value="locale">{{ locale }}</option>
            </select>
          </div> -->
          <div class="dropdown fs-2 mb-1">
            <button class="btn dropdown-toggle" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown"
              aria-expanded="false">
              <i class="bi bi-translate text-info"></i> {{ $i18n.locale }}
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton2">
              <li v-for="locale in $i18n.availableLocales" :key="locale">
                <a :class="locale === $i18n.locale ? 'dropdown-item active' : 'dropdown-item'" class="dropdown-item"
                  href="#" @click="changeLocale(locale)">
                  {{ locale }}
                </a>
              </li>
            </ul>
          </div>
          <button class="btn btn-link" @click="toggleTheme()">
            <!-- {{ isDark ? 'Light Mode' : 'Dark Mode' }} -->
            <i v-if="isDark" class="bi bi-moon-stars-fill text-white fs-3"></i>
            <i v-else class="bi bi-brightness-high-fill text-warning fs-3"></i>
          </button>

          <a href="https://github.com/HangMan-The-Game" class="btn btn-link fs-3 px-2 text-decoration-none"><i
              class="bi bi-github"></i>
          </a>
          <a href="https://www.instagram.com/hangmanit_/" class="btn btn-link fs-3 px-2 text-decoration-none"><i
              class="bi bi-instagram"></i>
          </a>
          <a href="https://twitter.com/HangManGameIT" class="btn btn-link fs-3 px-2 text-decoration-none"><i
              class="bi bi-twitter"></i>
          </a>
          |
          <RouterLink to="/profile" class="btn-link fs-3 px-2 text-decoration-none position-relative"><i
              class="bi bi-person-circle"></i>
            <!-- to-do se non è verificata la mail -->
            <span v-if="isLoggedIn && checkEmailVerification()"
              class="position-absolute top-0 start-75 translate-middle badge rounded-pill bg-primary small-badge">
              1
            </span>
          </RouterLink>
        </div>
      </div>
    </div>
  </nav>
</template>

<style>
[theme="custom-dark"] {
  background: #16171d !important;
  color: #fff;
}

[theme="custom-dark"] nav {
  background: #16171d !important;
  color: #fff;
  border-bottom: 0.5px solid white !important;
}

[theme="custom-dark"] #dropdownMenuButton2 {
  color: #fff !important;
}

[theme="custom-dark"] .dropdown-menu {
  background-color: #16171d !important;
  border: #fff 1px solid !important;
}

[theme="custom-dark"] .dropdown-toggle-split {
  color: #ffffff !important;
}

[theme="custom-dark"] a.router-link-active {
  color: #ef5454 !important;
}

[theme="custom-dark"] .dropdown-item {
  color: #fff !important;
}

[theme="custom-dark"] #home {
  background: #16171d !important;
  color: #ffffff;
}

[theme="custom-dark"] .card {
  background: #43454e !important;
  color: #ffffff;
}

[theme="custom-dark"] .card:hover {
  box-shadow: 0 8px 50px #ef3c3c33 !important;
}

[theme="custom-dark"] .card .card-title {
  color: #ffffff;
}

[theme="custom-dark"] .t-lead {
  color: #ffffff;
}

[theme="custom-dark"] #keyboard {
  background-color: #43454e !important;
  color: #16171d;
}

[theme="custom-dark"] .toast-body {
  background-color: #43454e !important;
  border-radius: 5px;
}
</style>

<style scoped>
.dropdown-menu {
  min-width: 7.2rem;
}

.dropdown-item.active {
  background-color: #e64343;
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
  backdrop-filter: blur(10px);
}

.small-badge {
  font-size: 0.7rem;
}
</style>
