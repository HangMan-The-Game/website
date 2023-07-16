<script setup>
import { ref, onMounted, watch } from "vue";
import SimpleKeyboard from '../components/SimpleKeyboard.vue';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase.js';

const layout = {
    default: [
        "Q W E R T Y U I O P",
        "A S D F G H J K L",
        "Z X C V B N M",
    ],
};
const mode = ref('');

const word = ref("");
const guessedLetters = ref({
    correct: [],
    wrong: []
});
const remainingAttempts = ref(6);
const gameOver = ref(false);
const wordToGuess = ref("");

const username = ref('');
const email = ref('');
const role = ref('');
const punti = ref(0);
const vittorie = ref(0);
const moltiplicatore = ref(1);

const auth = getAuth();

onMounted(async () => {
    mode.value = localStorage.getItem('selectedMode') || 'Easy';
    if (mode.value === 'Easy') {
        mode.value = 'Facile';
        moltiplicatore.value = 1;
    } else if (mode.value === 'Medium') {
        mode.value = 'Medio';
        moltiplicatore.value = 1.5;
    } else if (mode.value === 'Hard') {
        mode.value = 'Difficile';
        moltiplicatore.value = 2;
    }
    const querySnapshot = await getDocs(collection(db, mode.value));
    const words = querySnapshot.docs.map(doc => doc.data().word);
    const randomIndex = Math.floor(Math.random() * words.length);
    wordToGuess.value = words[randomIndex];
    word.value = wordToGuess.value;
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            email.value = user.email;
            username.value = user.displayName;

            const userDoc = doc(db, 'users', user.uid);
            const userSnap = await getDoc(userDoc);

            if (userSnap.exists()) {
                const userData = userSnap.data();
                await setDoc(userDoc, { role: userData.role, mail: email.value, name: username.value, points: userData.points, vittorie: userData.vittorie });
                vittorie.value = userData.vittorie;
                role.value = userData.role;
                punti.value = userData.points;
            }
        }
    });
});

const handleInput = (key) => {
    if (gameOver.value) {
        return;
    }

    const uppercaseKey = key.toUpperCase();
    if (isValidKey(uppercaseKey) && !guessedLetters.value.correct.includes(uppercaseKey) && !guessedLetters.value.wrong.includes(uppercaseKey)) {
        if (word.value.includes(uppercaseKey)) {
            guessedLetters.value.correct.push(uppercaseKey);
            punti.value += 1 * moltiplicatore.value;
            updatePoints();
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
        punti.value += 5 * moltiplicatore.value;
        vittorie.value += 1;
        updatePoints();
    } else if (isOutOfAttempts()) {
        gameOver.value = true;
    }
};

const isValidKey = (key) => {
    const allowedKeys = layout.default.join("").toUpperCase().split("");
    return allowedKeys.includes(key);
};

const resetGame = () => {
    guessedLetters.value.correct = [];
    guessedLetters.value.wrong = [];
    remainingAttempts.value = 6;
    gameOver.value = false;
    location.reload();
};

/* const isLetterGuessed = (letter) => {
    const isGuessed = guessedLetters.value.correct.includes(letter);

    if (isGuessed) {
        punti.value += 1;
        console.log("punti", punti.value);
        updatePoints();
    }

    return isGuessed;
}; */

const updatePoints = async () => {
    const user = getAuth().currentUser;
    if (user) {
        const userDoc = doc(db, 'users', user.uid);
        try {
            await updateDoc(userDoc, { points: punti.value, vittorie: vittorie.value });
            localStorage.setItem('punti', punti.value);
            localStorage.setItem('vittorie', vittorie.value);
        } catch (error) {
            console.error('Errore durante l\'aggiornamento dei punti:', error);
        }
    }
};


const isWordGuessed = () => {
    for (const letter of word.value) {
        if (!guessedLetters.value.correct.includes(letter)) {
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

    const savedPunti = localStorage.getItem('punti');
    const savedWins = localStorage.getItem('vittorie');
    if (savedPunti && savedWins) {
        vittorie.value = parseInt(savedWins, 0);
        punti.value = parseInt(savedPunti, 0);
    }
});

watch(word, () => {
    guessedLetters.value.correct = [];
    guessedLetters.value.wrong = [];
    remainingAttempts.value = 6;
});
</script>

<template>
    <div class="container mx-auto my-3">
        <div class="card w-50 mx-auto mb-2">
            <div class="card-body mx-auto">
                <h5 class="card-title text-center">Player Info</h5>
                <p class="card-text text-center">
                    <span class="text-danger fw-bold">{{ username }}</span>
                    <br>
                    Points: <span class="fw-bold">{{ punti }}</span>
                    <br>
                    Wins: <span class="fw-bold">{{ vittorie }}</span>
                </p>
                <RouterLink to="/menu" class="btn btn-primary">Return to Menu</RouterLink>
            </div>
        </div>
        <div class="text-center">
            Selected Mode: <span class="text-success fw-bold">{{ mode }}</span>
            <br>Multiplier points: <span class="fw-bold text-warning">{{ moltiplicatore }}x</span>
        </div>
        <div v-if="isWordGuessed()" class="fs-1 text-center fw-bold text-success">WIN!</div>
        <div v-if="isOutOfAttempts()" class="fs-1 text-center fw-bold text-danger">
            LOSS
            <div class="fs-5">The word was: <span class="fw-bold">{{ wordToGuess }}</span></div>
        </div>
        <div class="text-center fs-1">
            <span v-for="(letter, index) in word" :key="index">
                <span v-if="guessedLetters.correct.includes(letter)">{{ letter }}</span>
                <span v-else class="mx-1">_</span>
            </span>
        </div>
        <div class="attempt-count mb-3">Attempts left: {{ remainingAttempts }}</div>
        <div class="keyboard-container w-75 mx-auto">
            <SimpleKeyboard @onKeyPress="handleInput" :guessedLetters="guessedLetters" />
        </div>
        <!--         <div class="letters-container">
            <div class="correct-letters">
                <span v-for="letter in guessedLetters.correct" :key="letter" class="correct-letter">{{ letter }}</span>
            </div>
            <div class="wrong-letters">
                <span v-for="letter in guessedLetters.wrong" :key="letter" class="wrong-letter">{{ letter }}</span>
            </div>
        </div> -->
        <div class="d-flex justify-content-center mt-3">
            <button v-if="gameOver" @click="resetGame" class="btn btn-primary">Reset Game</button>
        </div>
    </div>
</template>

<style>
.keyboard-container {
    display: flex;
    justify-content: center;
}

@media screen and (max-width: 992px) {
    body {
        /* background-color: blue; */
        width: 100%;
    }
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

.word-to-guess {
    text-align: center;
    font-size: 1.5rem;
    margin-top: 1rem;
}
</style>