<script setup></script>

<template>
  <footer class="footer">
    <div class="container">
      <span class="footer-brand"><i class="bi bi-c-circle"></i> HangMan 2023</span>
      <span class="footer-divider">x</span>
      <a class="fw-bold"
          href="https://www.rapisardidavinci.edu.it/">ITET Rapisardi - Da Vinci</a>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  margin-top: auto;
  border-top: 1px solid var(--hm-border);
  background: rgba(255, 255, 255, 0.035);
}

.footer .container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 1.35rem 1rem;
  color: var(--hm-text-muted);
}

.footer-brand {
  color: var(--hm-heading);
  font-weight: 850;
}

.footer-divider {
  color: var(--hm-accent);
  font-weight: 900;
}
</style>
