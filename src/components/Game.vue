<template>
    <div class="container w-50 mx-auto my-5">
        <div class="word-container">
            <span v-for="(letter, index) in word" :key="index">
                <span v-if="guessedLetters.includes(letter)">{{ letter }}</span>
                <span v-else>-</span>
            </span>
        </div>
        <div class="keyboard-container">
            <SimpleKeyboard @onKeyPress="handleInput" :guessedLetters="guessedLetters" />
        </div>
        <div v-if="isWordGuessed()" class="result text-success">WIN!</div>
        <div v-if="isOutOfAttempts()" class="result text-danger">LOSS</div>
        <div class="attempt-count">Attempts left: {{ remainingAttempts }}</div>
        <div class="letters-container">
            <div class="correct-letters">
                <span v-for="letter in correctLetters" :key="letter" class="correct-letter">{{ letter }}</span>
            </div>
            <div class="wrong-letters">
                <span v-for="letter in wrongLetters" :key="letter" class="wrong-letter">{{ letter }}</span>
            </div>
        </div>

    </div>
</template>
  
<script setup>
import { ref, onMounted, watch } from "vue";
import SimpleKeyboard from '../components/SimpleKeyboard.vue';

const word = ref("HELLO");
const guessedLetters = ref([]);
const remainingAttempts = ref(6);
const correctLetters = ref([]);
const wrongLetters = ref([]);

const gameOver = ref(false);

const handleInput = (key) => {
    if (gameOver.value) {
        return;
    }

    const uppercaseKey = key.toUpperCase();
    if (!guessedLetters.value.includes(uppercaseKey)) {
        guessedLetters.value.push(uppercaseKey);
        if (!word.value.includes(uppercaseKey)) {
            remainingAttempts.value--;
            wrongLetters.value.push(uppercaseKey);
        } else {
            correctLetters.value.push(uppercaseKey);
        }
        if (remainingAttempts.value < 0) {
            remainingAttempts.value = 0;
        }
    }

    if (isWordGuessed()) {
        gameOver.value = true;
    } else if (isOutOfAttempts()) {
        gameOver.value = true;
    }
};

const resetGame = () => {
    word.value = "HELLO";
    guessedLetters.value = [];
    remainingAttempts.value = 6;
    correctLetters.value = [];
    wrongLetters.value = [];
    gameOver.value = false;
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

const isOutOfAttempts = () => {
    return remainingAttempts.value <= 0;
};

onMounted(() => {
    window.addEventListener("keyup", (e) => {
        e.preventDefault();
        const key = e.key.toUpperCase();
        handleInput(key);
    });
});

watch(word, () => {
    guessedLetters.value = [];
    remainingAttempts.value = 6;
    correctLetters.value = [];
    wrongLetters.value = [];
});
</script>
  
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

.result {
    text-align: center;
    font-size: 2rem;
    font-weight: bold;
}

.attempt-count {
    text-align: center;
    margin-top: 1rem;
    font-weight: bold;
}

.letters-container {
    display: flex;
    justify-content: center;
    margin-top: 2rem;
}

.correct-letters {
    margin-right: 2rem;
}

.correct-letter {
    display: inline-block;
    margin-right: 0.5rem;
    color: green;
}

.wrong-letter {
    display: inline-block;
    margin-right: 0.5rem;
    color: red;
}
</style>
  