<script></script>

<template>
  <section id="gamedesc" class="game-description">
    <div class="container my-5">
      <div class="row">
        <i class="bi bi-controller text-center fs-1"></i>
        <h1 class="fw-bold text-center fs-1 mb-5">{{ $t("gameDescription.title") }}</h1>
      </div>
      <div class="row">
        <div class="col-lg-3">
          <img class="img-thumbnail shadow-lg rounded mb-5" src="../assets/images/photo4.jpeg"
            alt="Game Description Image" />
        </div>
        <div class="col-lg-9 d-flex align-items-center">
          <p class="fs-4 mb-5" v-html="$t('gameDescription.description1')"></p>
        </div>
      </div>
      <div class="row my-3">
        <div class="col-lg-7 d-flex align-items-center">
          <p class="fs-4" v-html="$t('gameDescription.description2')"></p>
        </div>
        <div class="col-lg-5">
          <img class="img-thumbnail shadow-lg rounded mt-5" src="../assets/images/photo2.jpeg"
            alt="Game Description Image" />
        </div>
      </div>
      <div class="row">
        <div class="col-lg-6">
          <img class="img-thumbnail shadow-lg rounded mt-5 mb-5" src="../assets/images/photo5.jpeg"
            alt="Game Description Image" />
        </div>
        <div class="col-lg-6 d-flex align-items-center">
          <p class="fs-4" v-html="$t('gameDescription.description3')"></p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
