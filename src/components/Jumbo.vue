<script setup>
import { ref } from 'vue';
const props = defineProps(['theme'])

</script>

<template>
    <section id="home">
        <div class="container h-75">
            <div class="row h-100">
                <div class="col h-100 d-flex flex-column align-items-center justify-content-center">
                    <img v-if="props.theme" class=" img-fluid" src="../assets/images/HangManGameWhite.svg"
                        alt="HangMan-Logo" height="">
                    <img v-else class="img-fluid" src="../assets/images/HangManGame.svg" alt="HangMan-Logo" height="">

                    <p class="fs-2 w-50 mx-auto text-center" v-html="$t('jumbo3')"></p>
                    <div class="d-flex flex-column gap-2 mb-5">
                        <a type="button" href="#about" class="btn btn-primary btn-lg">{{ $t("jumbo1") }}</a>
                        <button id="disabled" type="button" class="btn btn-primary btn-lg" disabled>{{ $t("jumbo2")
                        }}<span class="badge rounded-pill text-bg-warning">WIP</span></button>
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