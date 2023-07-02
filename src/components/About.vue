<script>
/* export default {
  props: ['currentLang']
} */
</script>

<template>
  <section id="about" class="about-us my-5">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <h1 class="text-center fw-bold">{{ $t("navbar.aboutUs") }}</h1>
          <h2 class="text-center fw-semibold" v-html="$t('about.title')"></h2>
        </div>
        <div class="d-flex align-items-center mt-5 w-75 mx-auto">
          <p class="fs-4" v-html="$t('about.description1')"></p>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-5 mt-5">
          <img class="img-fluid img-thumbnail shadow-lg rounded mt-5" src="../assets/images/photo4.jpg"
            alt="About Us Image" />
        </div>
        <div class="col-lg-7 d-flex align-items-center">
          <p class="fs-4" v-html="$t('about.description2')"></p>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-6 d-flex align-items-center mt-5">
          <p class="fs-4" v-html="$t('about.description3')"></p>
        </div>
        <div class="col-lg-6">
          <img class="img-fluid img-thumbnail shadow-lg rounded mt-5" src="../assets/images/photo3.jpeg"
            alt="About Us Image" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
