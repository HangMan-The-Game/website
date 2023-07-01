<script></script>

<template>
  <section id="gamedesc" class="game-description">
    <div class="container my-5">
      <div class="row">
        <h1 class="fw-bold text-center my-5">{{ $t("nav2") }} <i class="bi bi-controller"></i></h1>
        <div class="col-lg-6 d-flex align-items-center">
          <img class="img-thumbnail shadow-lg rounded mb-5" src="../assets/images/photo1.jpeg"
            alt="Game Description Image" />
        </div>
        <div class="col-lg-6">
          <p class="fs-4" v-html="$t('gamedesc1')"></p>
        </div>
        <div class="col-lg-6">
          <p class="fs-4 mt-5" v-html="$t('gamedesc2')"></p>
        </div>
        <div class="col-lg-6 d-flex align-items-center">
          <img class="img-thumbnail shadow-lg rounded mt-5" src="../assets/images/photo2.jpeg"
            alt="Game Description Image" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
