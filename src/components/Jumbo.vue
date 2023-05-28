<script setup>

</script>

<template>
    <section id="home">
        <div class="container h-75">
            <div class="row h-100">
                <div class="col h-100 d-flex flex-column align-items-center justify-content-center">
                    <img class="img-fluid" src="../assets/images/HangManGame.svg" alt="HangMan-Logo" height="">

                    <p class="fs-2 w-50 mx-auto text-center">Divertiti con HangMan: il gioco di parole che mette alla prova
                        la
                        tua mente!
                    </p>
                    <div class="d-flex flex-column gap-2 mb-5">
                        <button type="button" class="btn btn-primary btn-lg">Scopri di più</button>
                        <button id="disabled" type="button" class="btn btn-primary btn-lg" disabled>Play Now! <span
                                class="badge rounded-pill text-bg-warning">WIP</span></button>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
section {
    background-color: #ffffff;
    border-bottom: 5px solid red;
    box-shadow: 0 0 30px 0 rgba(255, 0, 0, 0.333);
}

.btn-primary {
    background-color: #FF4D4D;
    border-color: #FF4D4D;
}

.btn-primary:hover {
    background-color: #B33636;
    border-color: #FF4D4D;
}

.btn-primary:active {
    background-color: #4e0909;
    border-color: #FF4D4D;
}

#disabled {
    background-color: #ffd3d3;
    color: #FF4D4D;
    border-color: #FF4D4D;
    cursor: not-allowed !important;
}
</style>