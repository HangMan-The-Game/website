<script>
/* export default {
  props: ['currentLang']
} */
</script>

<template>
  <section id="about" class="about-us section-shell">
    <div class="container">
      <div class="row align-items-center g-5">
        <div class="col-lg-5">
          <span class="section-kicker"><i class="bi bi-people"></i> Project team</span>
          <h1 class="section-title">{{ $t("navbar.aboutUs") }}</h1>
          <h2 class="about-subtitle" v-html="$t('about.title')"></h2>
          <div class="about-proof">
            <div><strong>5</strong><span>students</span></div>
            <div><strong>IT</strong><span>school project</span></div>
            <div><strong>3D</strong><span>prototype</span></div>
          </div>
        </div>
        <div class="col-lg-7">
          <div class="about-copy">
            <p v-html="$t('about.description1')"></p>
          </div>
        </div>
      </div>
      <div class="about-gallery">
        <div class="gallery-item">
          <img class="img-fluid" src="../assets/images/photo3.jpeg"
            alt="About Us Image" />
        </div>
        <div class="gallery-item">
          <img class="img-fluid" src="../assets/images/photo4.jpg"
            alt="About Us Image" />
        </div>
        <div class="gallery-item">
          <img class="img-fluid" src="../assets/images/photo2.jpeg"
            alt="About Us Image" />
        </div>
        <div class="gallery-item">
          <img class="img-fluid" src="../assets/images/photo5.jpeg"
            alt="About Us Image" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-us {
  background: linear-gradient(180deg, transparent, var(--hm-accent-soft), transparent);
}

.about-subtitle {
  margin-top: 1rem;
  color: var(--hm-text-muted);
  font-size: clamp(1.15rem, 2vw, 1.45rem);
  font-weight: 650;
}

.about-copy {
  padding: clamp(1.2rem, 3vw, 2rem);
  border: 1px solid var(--hm-border);
  border-radius: var(--hm-radius);
  background: var(--hm-surface);
  box-shadow: var(--hm-shadow-soft);
}

.about-copy p {
  margin: 0;
  color: var(--hm-text-muted);
  font-size: 1.05rem;
}

.about-proof {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.7rem;
  margin-top: 1.5rem;
}

.about-proof div {
  padding: 0.9rem;
  border: 1px solid var(--hm-border);
  border-radius: var(--hm-radius-sm);
  background: rgba(255, 255, 255, 0.06);
}

.about-proof strong,
.about-proof span {
  display: block;
}

.about-proof strong {
  color: var(--hm-accent);
  font-size: 1.4rem;
  line-height: 1;
}

.about-proof span {
  color: var(--hm-text-muted);
  font-size: 0.78rem;
}

.about-gallery {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1rem;
  margin-top: clamp(2rem, 5vw, 4rem);
}

.gallery-item {
  overflow: hidden;
  min-height: 240px;
  border: 1px solid var(--hm-border);
  border-radius: var(--hm-radius);
  background: var(--hm-surface);
  box-shadow: var(--hm-shadow-soft);
}

.gallery-item:nth-child(even) {
  transform: translateY(1.5rem);
}

.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.45s ease, filter 0.45s ease;
}

.gallery-item:hover img {
  transform: scale(1.06);
  filter: saturate(1.1) contrast(1.05);
}

@media (max-width: 991.98px) {
  .about-gallery {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 575.98px) {
  .about-proof,
  .about-gallery {
    grid-template-columns: 1fr;
  }

  .gallery-item:nth-child(even) {
    transform: none;
  }
}
</style>
