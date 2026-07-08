<script setup>
const openCookieSettings = () => {
  window.dispatchEvent(new CustomEvent("hm:open-cookie-settings"));
};
</script>

<template>
  <footer class="footer">
    <div class="container footer-inner">
      <div class="footer-project">
        <span class="footer-brand"><i class="bi bi-c-circle"></i> HangMan 2023</span>
        <span class="footer-divider">x</span>
        <a class="fw-bold" href="https://www.rapisardidavinci.edu.it/">ITET Rapisardi - Da Vinci</a>
      </div>
      <nav class="footer-legal" :aria-label="$i18n.locale === 'Italiano' ? 'Informazioni legali' : 'Legal information'">
        <RouterLink to="/privacy-policy">Privacy</RouterLink>
        <RouterLink to="/cookie-policy">Cookie</RouterLink>
        <RouterLink to="/terms">{{ $i18n.locale === 'Italiano' ? 'Termini' : 'Terms' }}</RouterLink>
        <button type="button" @click="openCookieSettings">
          <i class="bi bi-sliders"></i> {{ $i18n.locale === 'Italiano' ? 'Preferenze cookie' : 'Cookie preferences' }}
        </button>
      </nav>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  margin-top: auto;
  border-top: 1px solid var(--hm-border);
  background: rgba(255, 255, 255, 0.035);
}

.footer-inner {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem 2rem;
  padding: 1.35rem 1rem;
  color: var(--hm-text-muted);
}

.footer-project,
.footer-legal {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem;
}

.footer-legal {
  justify-content: flex-end;
  font-size: 0.86rem;
  font-weight: 750;
}

.footer-legal a,
.footer-legal button {
  color: var(--hm-text-muted);
  text-decoration: none;
}

.footer-legal button {
  padding: 0;
  border: 0;
  background: transparent;
  font: inherit;
}

.footer-legal a:hover,
.footer-legal button:hover {
  color: var(--hm-accent);
}

.footer-brand {
  color: var(--hm-heading);
  font-weight: 850;
}

.footer-divider {
  color: var(--hm-accent);
  font-weight: 900;
}

@media (max-width: 767.98px) {
  .footer-inner,
  .footer-project,
  .footer-legal {
    justify-content: center;
  }
}
</style>
