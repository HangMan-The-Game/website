<script setup>
import { onMounted } from "vue";
import SimpleKeyboard from "./SimpleKeyboard.vue"

const handleInput = (key) => {
    console.log(key)
}

onMounted(() => {
    window.addEventListener("keyup", (e) => {
        e.preventDefault();
        let key =
            e.key.toUpperCase() + " ";
        handleInput(key);
    })
})

</script>
<template>
    <div class="container w-50 mx-auto my-5">
        <SimpleKeyboard @onKeyPress="handleInput" />
    </div>
</template>