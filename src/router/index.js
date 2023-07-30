import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { auth } from '@/firebase.js'
import { getAuth, onAuthStateChanged } from "firebase/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/contact",
      name: "contact",
      component: () => import("../views/ContactView.vue"),
    },
    {
      path: "/leaderboard",
      name: "leader",
      component: () => import("../views/LeaderView.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/profile",
      name: "profile",
      component: () => import("../views/ProfileView.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/words",
      name: "words",
      component: () => import("../views/WordView.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/points",
      name: "points",
      component: () => import("../views/PointsView.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/users",
      name: "users",
      component: () => import("../views/UsersView.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/menu",
      name: "mainmenu",
      component: () => import("../views/MenuView.vue"),
      /* fare il controllo se è loggato, se non lo è allora lo porta nella schermata login e succesivamente nel game e non nel profile */
      meta: {
        requiresAuth: true,
        requiresVerify: true 
      }
    },
    {
      path: "/game",
      name: "game",
      component: () => import("../views/GameView.vue"),
      /* fare il controllo se è loggato, se non lo è allora lo porta nella schermata login e succesivamente nel game e non nel profile */
      meta: {
        requiresAuth: true,
        requiresVerify: true
      }
    }
  ],
});

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        unsubscribe(); // Rimuovi l'ascoltatore una volta ottenuto l'utente
        resolve(user);
      },
      reject
    );
  });
}

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const requiresVerify = to.matched.some((record) => record.meta.requiresVerify);
  const user = getCurrentUser();

  if (requiresVerify && user) {
    const isEmailVerified = await checkEmailVerification(user); // Utilizza l'utente corrente per verificare l'email
    if (!isEmailVerified) {
      next("/profile");
      return;
    }
  }

  if (requiresAuth && !user) {
    next("/login");
  } else {
    next();
  }
});

async function checkEmailVerification(user) { // Passa l'utente come parametro
  if (!user) {
    return false;
  }

  try {
    await user.reload();
    return user.emailVerified;
  } catch (error) {
    console.log("Errore durante l'aggiornamento dello stato dell'utente:", error);
    return false;
  }
}
export default router;
