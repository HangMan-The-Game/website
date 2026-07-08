import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { auth } from '@/firebase.js'
import { getAuth, onAuthStateChanged } from "firebase/auth";

const SITE_URL = "https://hangmangame.it";
const DEFAULT_TITLE = "HangMan - The Game | Progetto scolastico interattivo";
const DEFAULT_DESCRIPTION =
  "HangMan - The Game è un progetto scolastico interattivo ispirato al classico gioco dell'impiccato, con parole nascoste, classifica live e un prototipo fisico con parti che cadono a ogni errore.";

const setMetaContent = (selector, content) => {
  const element = document.querySelector(selector);

  if (element && content) {
    element.setAttribute("content", content);
  }
};

const setCanonicalUrl = (url) => {
  const canonical = document.querySelector('link[rel="canonical"]');

  if (canonical && url) {
    canonical.setAttribute("href", url);
  }
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        title: DEFAULT_TITLE,
        description: DEFAULT_DESCRIPTION,
      },
    },
    {
      path: "/contact",
      name: "contact",
      component: () => import("../views/ContactView.vue"),
      meta: {
        title: "Contatti | HangMan - The Game",
        description:
          "Contatta il team di HangMan - The Game e segui il progetto scolastico attraverso i canali ufficiali.",
      },
    },
    {
      path: "/leaderboard",
      name: "leader",
      component: () => import("../views/LeaderView.vue"),
      meta: {
        title: "Classifica | HangMan - The Game",
        description:
          "Consulta la classifica live di HangMan - The Game e scopri chi guida la sfida delle parole nascoste.",
      },
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
      meta: {
        title: "Accedi | HangMan - The Game",
        description: "Accedi al tuo account HangMan per giocare, salvare punti e seguire le tue statistiche.",
        robots: "noindex, nofollow",
      },
    },
    {
      path: "/profile",
      name: "profile",
      component: () => import("../views/ProfileView.vue"),
      meta: {
        requiresAuth: true,
        robots: "noindex, nofollow",
      }
    },
    {
      path: "/words",
      name: "words",
      component: () => import("../views/WordView.vue"),
      meta: {
        requiresAuth: true,
        robots: "noindex, nofollow",
      }
    },
    {
      path: "/points",
      name: "points",
      component: () => import("../views/PointsView.vue"),
      meta: {
        requiresAuth: true,
        robots: "noindex, nofollow",
      }
    },
    {
      path: "/users",
      name: "users",
      component: () => import("../views/UsersView.vue"),
      meta: {
        requiresAuth: true,
        robots: "noindex, nofollow",
      }
    },
    {
      path: "/leadino",
      name: "leadino",
      component: () => import("../views/LeadinoView.vue"),
      meta: {
        requiresAuth: true,
        robots: "noindex, nofollow",
      }
    },
    {
      path: "/menu",
      name: "mainmenu",
      component: () => import("../views/MenuView.vue"),
      /* fare il controllo se è loggato, se non lo è allora lo porta nella schermata login e succesivamente nel game e non nel profile */
      meta: {
        requiresAuth: true,
        requiresVerify: true,
        robots: "noindex, nofollow",
      }
    },
    {
      path: "/game",
      name: "game",
      component: () => import("../views/GameView.vue"),
      /* fare il controllo se è loggato, se non lo è allora lo porta nella schermata login e succesivamente nel game e non nel profile */
      meta: {
        requiresAuth: true,
        requiresVerify: true,
        robots: "noindex, nofollow",
      }
    },
    {
      path: "/links",
      name: "links",
      component: () => import("../views/LinksView.vue"),
      meta: {
        title: "Link ufficiali | HangMan - The Game",
        description:
          "Trova il sito e i profili social ufficiali di HangMan - The Game.",
      },
    },
    {
      path: "/privacy-policy",
      name: "privacy",
      component: () => import("../views/LegalView.vue"),
      props: { documentType: "privacy" },
      meta: {
        title: "Privacy Policy | HangMan - The Game",
        description:
          "Informativa sul trattamento dei dati personali di account, statistiche e classifica di HangMan - The Game.",
      },
    },
    {
      path: "/cookie-policy",
      name: "cookies",
      component: () => import("../views/LegalView.vue"),
      props: { documentType: "cookies" },
      meta: {
        title: "Cookie Policy | HangMan - The Game",
        description:
          "Informazioni su memorie tecniche, Firebase Authentication e Analytics opzionali usati da HangMan - The Game.",
      },
    },
    {
      path: "/terms",
      name: "terms",
      component: () => import("../views/LegalView.vue"),
      props: { documentType: "terms" },
      meta: {
        title: "Termini e condizioni | HangMan - The Game",
        description:
          "Regole per usare il gioco, creare un account e partecipare alla classifica di HangMan - The Game.",
      },
    }
  ],
});

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        unsubscribe();
        resolve(user);
      },
      reject
    );
  });
}

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const requiresNotAuth = to.matched.some((record) => record.meta.requiresNotAuth);
  const requiresVerify = to.matched.some((record) => record.meta.requiresVerify);

  const user = auth.currentUser;
  
  onAuthStateChanged(auth, (user) => {
    if (requiresNotAuth && user) {
      next("/profile");
    } else if (requiresAuth && !user) {
      next("/login");
    } else if (requiresVerify && user) {
      checkEmailVerification(user)
        .then((isEmailVerified) => {
          if (!isEmailVerified) {
            next("/profile");
          } else {
            next();
          }
        })
        .catch((error) => {
          console.log("Errore durante la verifica dell'email:", error);
          next("/");
        });
    } else {
      next();
    }
  });
});

router.afterEach((to) => {
  const title = to.meta.title || DEFAULT_TITLE;
  const description = to.meta.description || DEFAULT_DESCRIPTION;
  const canonicalUrl = `${SITE_URL}${to.path === "/" ? "/" : to.path}`;
  const robots = to.meta.robots || "index, follow, max-image-preview:large";

  document.title = title;
  setCanonicalUrl(canonicalUrl);
  setMetaContent('meta[name="description"]', description);
  setMetaContent('meta[name="robots"]', robots);
  setMetaContent('meta[property="og:title"]', title);
  setMetaContent('meta[property="og:description"]', description);
  setMetaContent('meta[property="og:url"]', canonicalUrl);
  setMetaContent('meta[name="twitter:title"]', title);
  setMetaContent('meta[name="twitter:description"]', description);
});

async function checkEmailVerification(user) {
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
