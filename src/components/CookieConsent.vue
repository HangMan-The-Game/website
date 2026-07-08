<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { setAnalyticsConsent } from "@/firebase.js";

const CONSENT_KEY = "hm-cookie-consent";
const CONSENT_VERSION = 1;
const CONSENT_DURATION = 180 * 24 * 60 * 60 * 1000;

const props = defineProps({
  locale: {
    type: String,
    default: "English",
  },
});
const showBanner = ref(false);
const showSettings = ref(false);
const analyticsEnabled = ref(false);
const savedChoice = ref(null);

const copy = computed(() => {
  if (props.locale === "Italiano") {
    return {
      eyebrow: "Privacy & cookie",
      title: "La tua sfida, le tue scelte",
      description:
        "HangMan usa strumenti tecnici per login, lingua, tema e partita. Firebase Analytics resta disattivato finché non scegli di abilitarlo.",
      close: "Chiudi e mantieni solo i necessari",
      reject: "Rifiuta opzionali",
      customize: "Personalizza",
      accept: "Accetta tutti",
      privacy: "Privacy Policy",
      cookies: "Cookie Policy",
      settingsTitle: "Preferenze privacy",
      settingsDescription: "Puoi cambiare idea in qualsiasi momento dal link nel footer.",
      necessaryTitle: "Necessari",
      necessaryDescription:
        "Mantengono sessione, preferenze del gioco e scelta privacy. Non possono essere disattivati senza compromettere le funzioni richieste.",
      alwaysActive: "Sempre attivi",
      analyticsTitle: "Analisi di utilizzo",
      analyticsDescription:
        "Google Analytics for Firebase misura visite e utilizzo per capire come migliorare il progetto. Può usare identificatori e cookie _ga.",
      cancel: "Annulla",
      save: "Salva preferenze",
    };
  }

  return {
    eyebrow: "Privacy & cookies",
    title: "Your challenge, your choices",
    description:
      "HangMan uses technical storage for login, language, theme and gameplay. Firebase Analytics stays disabled until you choose to enable it.",
    close: "Close and keep necessary only",
    reject: "Reject optional",
    customize: "Customize",
    accept: "Accept all",
    privacy: "Privacy Policy",
    cookies: "Cookie Policy",
    settingsTitle: "Privacy preferences",
    settingsDescription: "You can change your choice at any time from the footer.",
    necessaryTitle: "Necessary",
    necessaryDescription:
      "These preserve your session, game preferences and privacy choice. They cannot be disabled without affecting requested features.",
    alwaysActive: "Always active",
    analyticsTitle: "Usage analytics",
    analyticsDescription:
      "Google Analytics for Firebase measures visits and usage to help improve the project. It may use identifiers and _ga cookies.",
    cancel: "Cancel",
    save: "Save preferences",
  };
});

const readStoredChoice = () => {
  try {
    const parsed = JSON.parse(localStorage.getItem(CONSENT_KEY));

    if (
      parsed?.version === CONSENT_VERSION &&
      parsed?.expiresAt &&
      new Date(parsed.expiresAt).getTime() > Date.now()
    ) {
      return parsed;
    }
  } catch (error) {
    console.warn("Preferenze privacy non leggibili:", error);
  }

  localStorage.removeItem(CONSENT_KEY);
  return null;
};

const persistChoice = async (analytics) => {
  const now = new Date();
  const choice = {
    version: CONSENT_VERSION,
    necessary: true,
    analytics,
    updatedAt: now.toISOString(),
    expiresAt: new Date(now.getTime() + CONSENT_DURATION).toISOString(),
  };

  localStorage.setItem(CONSENT_KEY, JSON.stringify(choice));
  savedChoice.value = choice;
  analyticsEnabled.value = analytics;
  showBanner.value = false;
  showSettings.value = false;
  await setAnalyticsConsent(analytics);
};

const openSettings = () => {
  analyticsEnabled.value = Boolean(savedChoice.value?.analytics);
  showBanner.value = false;
  showSettings.value = true;
};

const closeSettings = () => {
  showSettings.value = false;
  showBanner.value = !savedChoice.value;
};

const handleOpenSettings = () => openSettings();

onMounted(async () => {
  savedChoice.value = readStoredChoice();

  if (savedChoice.value) {
    analyticsEnabled.value = Boolean(savedChoice.value.analytics);
    await setAnalyticsConsent(analyticsEnabled.value);
  } else {
    showBanner.value = true;
    await setAnalyticsConsent(false);
  }

  window.addEventListener("hm:open-cookie-settings", handleOpenSettings);
});

onBeforeUnmount(() => {
  window.removeEventListener("hm:open-cookie-settings", handleOpenSettings);
});
</script>

<template>
  <div v-if="showBanner" class="consent-layer">
    <section class="consent-banner" role="region" aria-live="polite" aria-labelledby="consent-title">
      <button class="consent-close" type="button" :aria-label="copy.close" @click="persistChoice(false)">
        <i class="bi bi-x-lg"></i>
      </button>

      <div class="consent-icon" aria-hidden="true"><i class="bi bi-shield-check"></i></div>
      <div class="consent-copy">
        <span>{{ copy.eyebrow }}</span>
        <h2 id="consent-title">{{ copy.title }}</h2>
        <p>{{ copy.description }}</p>
        <div class="consent-links">
          <RouterLink to="/privacy-policy">{{ copy.privacy }}</RouterLink>
          <RouterLink to="/cookie-policy">{{ copy.cookies }}</RouterLink>
        </div>
      </div>

      <div class="consent-actions">
        <button class="btn btn-secondary" type="button" @click="persistChoice(false)">{{ copy.reject }}</button>
        <button class="btn btn-outline-primary" type="button" @click="openSettings">{{ copy.customize }}</button>
        <button class="btn btn-primary" type="button" @click="persistChoice(true)">{{ copy.accept }}</button>
      </div>
    </section>
  </div>

  <div v-if="showSettings" class="privacy-backdrop" @click.self="closeSettings">
    <section class="privacy-dialog" role="dialog" aria-modal="true" aria-labelledby="privacy-settings-title">
      <header>
        <div>
          <span class="section-kicker"><i class="bi bi-sliders"></i> {{ copy.eyebrow }}</span>
          <h2 id="privacy-settings-title">{{ copy.settingsTitle }}</h2>
          <p>{{ copy.settingsDescription }}</p>
        </div>
        <button class="btn btn-icon privacy-dialog-close" type="button" :aria-label="copy.cancel" @click="closeSettings">
          <i class="bi bi-x-lg"></i>
        </button>
      </header>

      <div class="privacy-option">
        <div>
          <h3><i class="bi bi-lock-fill"></i> {{ copy.necessaryTitle }}</h3>
          <p>{{ copy.necessaryDescription }}</p>
        </div>
        <span class="always-active">{{ copy.alwaysActive }}</span>
      </div>

      <label class="privacy-option privacy-option-toggle" for="analytics-consent">
        <div>
          <h3><i class="bi bi-bar-chart-fill"></i> {{ copy.analyticsTitle }}</h3>
          <p>{{ copy.analyticsDescription }}</p>
        </div>
        <span class="consent-switch">
          <input id="analytics-consent" v-model="analyticsEnabled" type="checkbox">
          <span aria-hidden="true"></span>
        </span>
      </label>

      <footer>
        <button class="btn btn-secondary" type="button" @click="persistChoice(false)">{{ copy.reject }}</button>
        <button class="btn btn-primary" type="button" @click="persistChoice(analyticsEnabled)">{{ copy.save }}</button>
      </footer>
    </section>
  </div>
</template>

<style scoped>
.consent-layer,
.privacy-backdrop {
  position: fixed;
  inset: 0;
  z-index: 2000;
  background: rgba(3, 5, 12, 0.42);
  backdrop-filter: blur(4px);
}

.consent-layer {
  display: flex;
  align-items: flex-end;
  padding: 1rem;
  pointer-events: none;
}

.consent-banner {
  position: relative;
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  gap: 1rem;
  width: min(100%, 1180px);
  margin: 0 auto;
  padding: 1.3rem 3.5rem 1.3rem 1.3rem;
  color: var(--hm-text);
  border: 1px solid var(--hm-border);
  border-radius: var(--hm-radius);
  background: var(--hm-surface-strong);
  box-shadow: var(--hm-shadow);
  backdrop-filter: blur(24px) saturate(1.2);
  pointer-events: auto;
}

.consent-icon {
  display: grid;
  width: 52px;
  height: 52px;
  place-items: center;
  color: #fff;
  border-radius: 14px;
  background: linear-gradient(135deg, var(--hm-primary), var(--hm-primary-strong));
  font-size: 1.45rem;
}

.consent-copy > span {
  color: var(--hm-accent);
  font-size: 0.72rem;
  font-weight: 900;
  text-transform: uppercase;
}

.consent-copy h2,
.privacy-dialog h2 {
  margin: 0.12rem 0 0.35rem;
  font-size: clamp(1.35rem, 3vw, 1.85rem);
}

.consent-copy p,
.privacy-dialog p {
  margin: 0;
  color: var(--hm-text-muted);
  line-height: 1.5;
}

.consent-links {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 0.45rem;
  font-size: 0.88rem;
  font-weight: 800;
}

.consent-actions {
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  justify-content: flex-end;
  gap: 0.65rem;
}

.consent-actions .btn {
  white-space: nowrap;
}

.consent-close {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  display: grid;
  width: 36px;
  height: 36px;
  padding: 0;
  place-items: center;
  color: var(--hm-text-muted);
  border: 0;
  border-radius: 50%;
  background: transparent;
}

.consent-close:hover {
  color: var(--hm-heading);
  background: rgba(255, 255, 255, 0.08);
}

.privacy-backdrop {
  display: grid;
  padding: 1rem;
  place-items: center;
}

.privacy-dialog {
  width: min(100%, 760px);
  max-height: calc(100vh - 2rem);
  overflow-y: auto;
  padding: clamp(1.2rem, 4vw, 2rem);
  color: var(--hm-text);
  border: 1px solid var(--hm-border);
  border-radius: var(--hm-radius);
  background: var(--hm-surface-strong);
  box-shadow: var(--hm-shadow);
}

.privacy-dialog > header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  padding-bottom: 1.3rem;
}

.privacy-dialog-close {
  flex: 0 0 44px;
}

.privacy-option {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.25rem;
  padding: 1.15rem 0;
  border-top: 1px solid var(--hm-border);
}

.privacy-option h3 {
  margin: 0 0 0.25rem;
  font-size: 1rem;
}

.privacy-option h3 i {
  margin-right: 0.4rem;
  color: var(--hm-accent);
}

.privacy-option p {
  font-size: 0.9rem;
}

.always-active {
  flex: 0 0 auto;
  color: var(--hm-success);
  font-size: 0.78rem;
  font-weight: 900;
  text-transform: uppercase;
}

.privacy-option-toggle {
  cursor: pointer;
}

.consent-switch {
  position: relative;
  flex: 0 0 52px;
  width: 52px;
  height: 30px;
}

.consent-switch input {
  position: absolute;
  width: 1px;
  height: 1px;
  opacity: 0;
}

.consent-switch span {
  position: absolute;
  inset: 0;
  border: 1px solid var(--hm-border);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.1);
  transition: background 0.2s ease, border-color 0.2s ease;
}

.consent-switch span::after {
  position: absolute;
  top: 4px;
  left: 4px;
  width: 20px;
  height: 20px;
  content: "";
  border-radius: 50%;
  background: var(--hm-text-muted);
  transition: transform 0.2s ease, background 0.2s ease;
}

.consent-switch input:checked + span {
  border-color: var(--hm-accent);
  background: var(--hm-accent-soft);
}

.consent-switch input:checked + span::after {
  background: var(--hm-accent);
  transform: translateX(22px);
}

.consent-switch input:focus-visible + span {
  outline: 3px solid rgba(255, 77, 77, 0.28);
  outline-offset: 3px;
}

.privacy-dialog > footer {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 0.75rem;
  padding-top: 1.25rem;
  border-top: 1px solid var(--hm-border);
}

@media (max-width: 991.98px) {
  .consent-banner {
    grid-template-columns: auto minmax(0, 1fr);
  }

  .consent-actions {
    grid-column: 1 / -1;
    justify-content: stretch;
  }

  .consent-actions .btn {
    flex: 1 1 150px;
  }
}

@media (max-width: 575.98px) {
  .consent-layer {
    padding: 0.5rem;
  }

  .consent-banner {
    grid-template-columns: 1fr;
    gap: 0.75rem;
    padding: 1rem;
    border-radius: var(--hm-radius-sm);
  }

  .consent-icon {
    width: 44px;
    height: 44px;
  }

  .consent-copy {
    padding-right: 2rem;
  }

  .consent-actions {
    grid-column: auto;
  }

  .consent-actions .btn,
  .privacy-dialog > footer .btn {
    flex: 1 1 100%;
  }

  .privacy-option {
    align-items: flex-start;
  }
}

@media (prefers-reduced-motion: reduce) {
  .consent-switch span,
  .consent-switch span::after {
    transition: none;
  }
}
</style>
