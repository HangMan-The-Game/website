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
          <h1 class="text-center fw-bold fs-1 ">{{ $t("navbar.aboutUs") }}</h1>
          <h2 class="text-center fs-3" v-html="$t('about.title')"></h2>
        </div>
        <div class="d-flex align-items-center mt-4 w-75 mx-auto">
          <p class="fs-4" v-html="$t('about.description1')"></p>
        </div>
        <!-- <div class="d-flex align-items-center mt-4 w-75 mx-auto">
          <p class="fs-4" v-html="$t('about.description2')"></p>
        </div> -->
      </div>
      <div class="row">
        <div class="col-lg-4 offset-lg-2">
          <img class="img-fluid img-thumbnail shadow-lg rounded mt-5 w-100" src="../assets/images/photo3.jpeg"
            alt="About Us Image" />
        </div>
        <div class="col-lg-4">
          <img class="img-fluid img-thumbnail shadow-lg rounded mt-5 w-100" src="../assets/images/photo4.jpg"
            alt="About Us Image" />
        </div>
        <div class="col-lg-4 offset-lg-2">
          <img class="img-fluid img-thumbnail shadow-lg rounded mt-5 w-100" src="../assets/images/photo2.jpeg"
            alt="About Us Image" />
        </div>
        <div class="col-lg-4 d-flex align-items-center">
          <img class="img-fluid img-thumbnail shadow-lg rounded mt-5 w-100" src="../assets/images/photo5.jpeg"
            alt="About Us Image" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
