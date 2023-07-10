<script setup>
import { ref, onMounted, watch } from "vue";
import SimpleKeyboard from '../components/SimpleKeyboard.vue';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebase.js';

const word = ref("");
const guessedLetters = ref({
    correct: [],
    wrong: []
});
const remainingAttempts = ref(6);
const gameOver = ref(false);

onMounted(async () => {
    const querySnapshot = await getDocs(collection(db, 'Facile'));
    const words = querySnapshot.docs.map(doc => doc.data().word);
    const randomIndex = Math.floor(Math.random() * words.length);
    word.value = words[randomIndex];
});

const handleInput = (key) => {
    if (gameOver.value) {
        return;
    }

    const uppercaseKey = key.toUpperCase();
    if (!guessedLetters.value.correct.includes(uppercaseKey) && !guessedLetters.value.wrong.includes(uppercaseKey)) {
        if (word.value.includes(uppercaseKey)) {
            guessedLetters.value.correct.push(uppercaseKey);
        } else {
            guessedLetters.value.wrong.push(uppercaseKey);
            remainingAttempts.value--;
            if (remainingAttempts.value < 0) {
                remainingAttempts.value = 0;
            }
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
    guessedLetters.value.correct = [];
    guessedLetters.value.wrong = [];
    remainingAttempts.value = 6;
    gameOver.value = false;
    location.reload();
};

const isLetterGuessed = (letter) => {
    return guessedLetters.value.correct.includes(letter);
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
    guessedLetters.value.correct = [];
    guessedLetters.value.wrong = [];
    remainingAttempts.value = 6;
});
</script>

<template>
    <div class="container w-50 mx-auto my-5">
        <div class="word-container">
            <span v-for="(letter, index) in word" :key="index">
                <span v-if="guessedLetters.correct.includes(letter)">{{ letter }}</span>
                <span v-else>_</span>
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
                <span v-for="letter in guessedLetters.correct" :key="letter" class="correct-letter">{{ letter }}</span>
            </div>
            <div class="wrong-letters">
                <span v-for="letter in guessedLetters.wrong" :key="letter" class="wrong-letter">{{ letter }}</span>
            </div>
        </div>
        <div class="d-flex justify-content-center mt-3">
            <button v-if="gameOver" @click="resetGame" class="btn btn-primary">Reset Game</button>
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

.wrong-letters {
    margin-right: 2rem;
}

.wrong-letter {
    display: inline-block;
    margin-right: 0.5rem;
    color: red;
}
</style>
