<script></script>

<template>
  <section id="gamedesc" class="game-description">
    <div class="container">
      <div class="text-center mb-5">
        <span class="section-kicker justify-content-center"><i class="bi bi-controller"></i> Gameplay</span>
        <h1 class="section-title">{{ $t("gameDescription.title") }}</h1>
        <p class="section-lead mx-auto">Guess the hidden word, protect your attempts, and climb a live ranking connected to the project ecosystem.</p>
      </div>
      <div class="row align-items-center g-4">
        <div class="col-lg-5">
          <div class="game-visual">
            <img class="img-fluid" src="../assets/images/photo4.jpeg"
            alt="Game Description Image" />
            <div class="attempts-card">
              <span>{{ $t("game.attempts") }}</span>
              <strong>6</strong>
            </div>
          </div>
        </div>
        <div class="col-lg-7">
          <div class="description-panel">
            <p v-html="$t('gameDescription.description1')"></p>
            <div class="feature-strip">
              <span><i class="bi bi-sliders"></i> Difficulty</span>
              <span><i class="bi bi-translate"></i> Languages</span>
              <span><i class="bi bi-database"></i> Database</span>
              <span><i class="bi bi-cpu"></i> Hardware</span>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="row my-3">
        <div class="col-lg-7 d-flex align-items-center">
          <p class="fs-4" v-html="$t('gameDescription.description2')"></p>
        </div>
        <div class="col-lg-5">
          <img class="img-thumbnail shadow-lg rounded" src="../assets/images/photo5.jpeg" alt="Game Description Image" />
        </div>
      </div> -->
      <!-- <div class="row">
        <div class="col-lg-6">
          <img class="img-thumbnail shadow-lg rounded mt-5 mb-5" src="../assets/images/photo5.jpeg"
            alt="Game Description Image" />
        </div>
        <div class="col-lg-6 d-flex align-items-center">
          <p class="fs-4" v-html="$t('gameDescription.description3')"></p>
        </div>
      </div> -->
    </div>
  </section>
</template>

<style scoped>
.game-description {
  padding: clamp(4rem, 8vw, 7rem) 0;
}

.game-visual {
  position: relative;
  overflow: hidden;
  min-height: 460px;
  border: 1px solid var(--hm-border);
  border-radius: var(--hm-radius);
  background: var(--hm-surface);
  box-shadow: var(--hm-shadow);
}

.game-visual img {
  width: 100%;
  height: 100%;
  min-height: 460px;
  object-fit: cover;
  filter: saturate(0.95) contrast(1.08);
}

.attempts-card {
  position: absolute;
  right: 1rem;
  bottom: 1rem;
  padding: 1rem 1.15rem;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: var(--hm-radius-sm);
  background: rgba(9, 11, 20, 0.78);
  backdrop-filter: blur(12px);
}

:global(body[theme="custom-light"]) .attempts-card {
  background: rgba(255, 255, 255, 0.82);
}

.attempts-card span,
.attempts-card strong {
  display: block;
}

.attempts-card span {
  color: var(--hm-text-muted);
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
}

.attempts-card strong {
  color: var(--hm-accent);
  font-size: 2.4rem;
  line-height: 1;
}

.description-panel {
  padding: clamp(1.35rem, 3vw, 2.2rem);
  border: 1px solid var(--hm-border);
  border-radius: var(--hm-radius);
  background: var(--hm-surface);
  box-shadow: var(--hm-shadow-soft);
}

.description-panel p {
  margin: 0;
  color: var(--hm-text-muted);
  font-size: 1.04rem;
}

.feature-strip {
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
  margin-top: 1.5rem;
}

.feature-strip span {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.62rem 0.85rem;
  color: var(--hm-heading);
  border: 1px solid var(--hm-border);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.07);
  font-size: 0.85rem;
  font-weight: 800;
}
</style>
