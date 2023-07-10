<script setup>
import SimpleKeyboard from './SimpleKeyboard.vue';
import { ref, onMounted } from "vue";

const word = ref("HELLO");
const guessedLetters = ref([]);

const handleInput = (key) => {
    const uppercaseKey = key.toUpperCase();
    if (!guessedLetters.value.includes(uppercaseKey)) {
        guessedLetters.value.push(uppercaseKey);
    }
};

const isLetterGuessed = (letter) => {
    return guessedLetters.value.includes(letter);
};

const isWordGuessed = () => {
    for (const letter of word.value) {
        if (!isLetterGuessed(letter)) {
            return false;
        }
    }
    return true;
};

onMounted(() => {
    window.addEventListener("keyup", (e) => {
        e.preventDefault();
        const key = e.key.toUpperCase();
        handleInput(key);
    });
});
</script>

<template>
    <div class="container w-50 mx-auto my-5">
        <div class="word-container">
            <span v-for="(letter, index) in word" :key="index">
                <span v-if="guessedLetters.includes(letter)">{{ letter }}</span>
                <span v-else>_</span>
            </span>
        </div>
        <div class="keyboard-container">
            <SimpleKeyboard @onKeyPress="handleInput" />
        </div>
    </div>
</template>
  
<style>
.word-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 1rem;
}

.keyboard-container {
    display: flex;
    justify-content: center;
}
</style>
  