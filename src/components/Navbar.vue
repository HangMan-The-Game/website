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
  <nav :class="isDark ? 'navbar-dark' : ''" class="navbar navbar-expand-lg hm-navbar scrollspy-navbar">
    <div class="container">
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03"
        aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <RouterLink class="navbar-brand" to="/">
        <img v-if="isDark" src="../assets/images/HangManLogoWhite.svg" alt="HangMan-Logo" width="100" height="50" />
        <img v-else src="../assets/images/HangManLogo.svg" alt="HangMan-Logo" width="100" height="50" />
      </RouterLink>

      <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0 align-items-lg-center">
          <li class="nav-item">
            <div class="btn-group hm-nav-group">
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
          <li class="nav-item">
            <RouterLink to="/contact" class="nav-link">{{ $t("navbar.contactUs") }}</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/leaderboard" class="nav-link">{{ $t("navbar.leaderboard") }}</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/menu" class="nav-link">{{ $t("navbar.play") }}</RouterLink>
          </li>
        </ul>
        <div class="navbar-actions d-flex align-items-center">
          <!-- language selector : to-do -->
          <!--           <div class="locale-changer">
            <select v-model="$i18n.locale">
              <option v-for="locale in $i18n.availableLocales" :key="locale" :value="locale">{{ locale }}</option>
            </select>
          </div> -->
          <div class="dropdown">
            <button class="btn btn-icon-label dropdown-toggle" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown"
              aria-expanded="false">
              <i class="bi bi-translate"></i> <span>{{ $i18n.locale }}</span>
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
          <button class="btn btn-icon" @click="toggleTheme()" aria-label="Toggle theme">
            <!-- {{ isDark ? 'Light Mode' : 'Dark Mode' }} -->
            <i v-if="isDark" class="bi bi-moon-stars-fill"></i>
            <i v-else class="bi bi-brightness-high-fill"></i>
          </button>

          <a href="https://github.com/HangMan-The-Game" class="btn btn-icon text-decoration-none" aria-label="GitHub"><i
              class="bi bi-github"></i>
          </a>
          <a href="https://www.instagram.com/hangmanit_/" class="btn btn-icon text-decoration-none" aria-label="Instagram"><i
              class="bi bi-instagram"></i>
          </a>
          <a href="https://twitter.com/HangManGameIT" class="btn btn-icon text-decoration-none" aria-label="Twitter"><i
              class="bi bi-twitter"></i>
          </a>
          <RouterLink to="/profile" class="btn btn-icon text-decoration-none position-relative" aria-label="Profile"><i
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

<style scoped>
.hm-navbar {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 1030;
  border-bottom: 1px solid var(--hm-border);
  background: color-mix(in srgb, var(--hm-bg) 76%, transparent);
  backdrop-filter: blur(18px);
}

.navbar-brand img {
  width: 116px;
  height: auto;
  filter: drop-shadow(0 10px 18px rgba(0, 0, 0, 0.18));
}

.navbar-brand {
  margin-right: 1.25rem;
}

.navbar-toggler {
  border: 1px solid var(--hm-border);
  background: rgba(255, 255, 255, 0.08);
}

.navbar-toggler-icon {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%28245,247,255,0.92%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
}

.nav-link {
  position: relative;
  margin: 0 0.2rem;
  padding: 0.65rem 0.9rem !important;
  color: var(--hm-text-muted);
  font-weight: 800;
  border-radius: 999px;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: var(--hm-heading) !important;
  background: rgba(255, 255, 255, 0.08);
}

.nav-link.router-link-active::after {
  position: absolute;
  right: 1rem;
  bottom: 0.3rem;
  left: 1rem;
  height: 2px;
  content: "";
  border-radius: 999px;
  background: linear-gradient(90deg, var(--hm-primary), var(--hm-primary-strong));
}

.hm-nav-group .dropdown-toggle-split {
  min-height: auto;
  padding: 0.55rem 0.45rem;
  color: var(--hm-text-muted);
  background: transparent !important;
  border: 0 !important;
  box-shadow: none;
}

.navbar-actions {
  gap: 0.35rem;
}

.btn-icon,
.btn-icon-label {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  min-height: 42px;
  padding: 0;
  color: var(--hm-text);
  border: 1px solid var(--hm-border);
  background: rgba(255, 255, 255, 0.08) !important;
  box-shadow: none;
}

.btn-icon-label {
  width: auto;
  gap: 0.45rem;
  padding: 0 0.85rem;
}

.btn-icon:hover,
.btn-icon-label:hover {
  color: var(--hm-accent);
  border-color: rgba(255, 77, 77, 0.42);
  background: rgba(255, 77, 77, 0.1) !important;
}

.dropdown-menu {
  min-width: 9rem;
  padding: 0.45rem;
}

.small-badge {
  font-size: 0.65rem;
  background: var(--hm-primary) !important;
  color: #fff;
}

:global(body[theme="custom-light"]) .hm-navbar {
  background: rgba(255, 253, 251, 0.84);
  box-shadow: 0 12px 32px rgba(179, 54, 54, 0.10);
}

:global(body[theme="custom-light"]) .nav-link:hover,
:global(body[theme="custom-light"]) .nav-link.router-link-active,
:global(body[theme="custom-light"]) .btn-icon,
:global(body[theme="custom-light"]) .btn-icon-label {
  background: rgba(255, 77, 77, 0.07) !important;
}

@media (max-width: 991.98px) {
  .hm-navbar .container {
    justify-content: flex-start;
    gap: 0.85rem;
  }

  .navbar-brand {
    margin-right: 0;
  }

  .navbar-brand img {
    width: 104px;
  }

  .navbar-collapse {
    padding: 1rem 0 0.5rem;
  }

  .navbar-actions {
    flex-wrap: wrap;
    justify-content: center;
    padding-top: 0.75rem;
  }

  .btn-icon {
    width: 46px;
  }
}

@media (max-width: 575.98px) {
  .navbar-brand img {
    width: 96px;
  }
}
</style>
