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
          <h1 class="text-center fw-bold">{{ $t("nav1") }}</h1>
          <h2 class="text-center fw-semibold" v-html="$t('about1')"></h2>
        </div>
        <div class="col-lg-6 d-flex align-items-center mt-5">
          <p class="fs-4" v-html="$t('about2')"></p>
        </div>
        <div class="col-lg-6">
          <img class="img-fluid img-thumbnail shadow-lg rounded mt-5"
            src="https://img.freepik.com/free-vector/group-people-illustration-set_52683-33806.jpg"
            alt="About Us Image" />
        </div>
      </div>
      <div class="row">
        <div class="col-lg-5 mt-5">
          <img class="img-fluid img-thumbnail shadow-lg rounded mt-5" src="../assets/images/photo4.jpg"
            alt="About Us Image" />
        </div>
        <div class="col-lg-7 d-flex align-items-center">
          <p class="fs-4" v-html="$t('about3')"></p>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-6 d-flex align-items-center mt-5">
          <p class="fs-4" v-html="$t('about4')"></p>
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
