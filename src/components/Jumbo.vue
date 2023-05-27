<script setup>

</script>

<template>
    <section>
        <div class="container h-75">
            <div class="row h-100">
                <div class="col h-100 d-flex flex-column align-items-center justify-content-center">


                    <img class="img-fluid" src="../assets/images/HangManGame.svg" alt="HangMan-Logo" height="">

                    <p class="fs-2 w-50 mx-auto text-center">Divertiti con HangMan: il gioco di parole che mette alla prova
                        la
                        tua mente!
                    </p>
                    <div class="d-flex flex-column gap-2 mb-5">
                        <button type="button" class="btn btn-primary btn-lg">Primary</button>
                        <button type="button" class="btn btn-primary btn-lg" disabled>Play Now!</button>
                    </div>

                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
section {
    background-color: #e3f2fd;
    border-bottom: 5px solid red;
    box-shadow: 0 0 30px 0 rgba(255, 0, 0, 0.333);
}
</style>