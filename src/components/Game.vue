<script setup>
import { computed, ref, onMounted, watch } from "vue";
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
const modeview = ref('');
const lang = ref('');

const word = ref("");
const guessedLetters = ref({
    correct: [],
    wrong: []
});
const remainingAttempts = ref(6);
const gameOver = ref(false);
const wordToGuess = ref("");
const wrongAttempts = computed(() => Math.min(6, guessedLetters.value.wrong.length));

const username = ref('');
const email = ref('');
const role = ref('');
const punti = ref(0);
const vittorie = ref(0);
const moltiplicatore = ref(1);
const gamesPlayed = ref(0);
const bestGameScore = ref(0);
const currentStreak = ref(0);
const bestStreak = ref(0);
const currentGameScore = ref(0);
const gameRecorded = ref(false);

const auth = getAuth();

onMounted(async () => {
    mode.value = localStorage.getItem('selectedMode') || 'Easy';
    lang.value = localStorage.getItem('lang') || 'English';
    if (mode.value === 'Easy') {
        mode.value = 'Facile';
        if (lang.value === 'English') {
            modeview.value = 'Easy';
        }
        else if (lang.value === 'Italiano') {
            modeview.value = 'Facile';
        }
        moltiplicatore.value = 1;
    } else if (mode.value === 'Medium') {
        mode.value = 'Medio';
        if (lang.value === 'English') {
            modeview.value = 'Medium';
        }
        else if (lang.value === 'Italiano') {
            modeview.value = 'Medio';
        }
        moltiplicatore.value = 1.5;
    } else if (mode.value === 'Hard') {
        mode.value = 'Difficile';
        if (lang.value === 'English') {
            modeview.value = 'Hard';
        }
        else if (lang.value === 'Italiano') {
            modeview.value = 'Difficile';
        }
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
                const userStats = {
                    role: userData.role || 'user',
                    mail: email.value,
                    name: username.value,
                    points: userData.points || 0,
                    vittorie: userData.vittorie || 0,
                    gamesPlayed: userData.gamesPlayed || 0,
                    bestGameScore: userData.bestGameScore || 0,
                    currentStreak: userData.currentStreak || 0,
                    bestStreak: userData.bestStreak || 0,
                };
                await setDoc(userDoc, userStats, { merge: true });
                vittorie.value = userStats.vittorie;
                role.value = userStats.role;
                punti.value = userStats.points;
                gamesPlayed.value = userStats.gamesPlayed;
                bestGameScore.value = userStats.bestGameScore;
                currentStreak.value = userStats.currentStreak;
                bestStreak.value = userStats.bestStreak;
            } else {
                const userStats = {
                    role: 'user',
                    mail: email.value,
                    name: username.value,
                    points: 0,
                    vittorie: 0,
                    gamesPlayed: 0,
                    bestGameScore: 0,
                    currentStreak: 0,
                    bestStreak: 0,
                };
                await setDoc(userDoc, userStats);
                vittorie.value = userStats.vittorie;
                role.value = userStats.role;
                punti.value = userStats.points;
                gamesPlayed.value = userStats.gamesPlayed;
                bestGameScore.value = userStats.bestGameScore;
                currentStreak.value = userStats.currentStreak;
                bestStreak.value = userStats.bestStreak;
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
            const letterPoints = 1 * moltiplicatore.value;
            punti.value += letterPoints;
            currentGameScore.value += letterPoints;
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
        const winBonus = 5 * moltiplicatore.value;
        punti.value += winBonus;
        currentGameScore.value += winBonus;
        vittorie.value += 1;
        recordGameResult(true);
    } else if (isOutOfAttempts()) {
        gameOver.value = true;
        recordGameResult(false);
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

const recordGameResult = async (hasWon) => {
    if (gameRecorded.value) {
        return;
    }

    gameRecorded.value = true;
    gamesPlayed.value += 1;
    currentStreak.value = hasWon ? currentStreak.value + 1 : 0;
    bestStreak.value = Math.max(bestStreak.value, currentStreak.value);
    bestGameScore.value = Math.max(bestGameScore.value, currentGameScore.value);

    const user = getAuth().currentUser;
    if (user) {
        const userDoc = doc(db, 'users', user.uid);
        try {
            await updateDoc(userDoc, {
                points: punti.value,
                vittorie: vittorie.value,
                gamesPlayed: gamesPlayed.value,
                bestGameScore: bestGameScore.value,
                currentStreak: currentStreak.value,
                bestStreak: bestStreak.value,
            });
            localStorage.setItem('punti', punti.value);
            localStorage.setItem('vittorie', vittorie.value);
        } catch (error) {
            console.error('Errore durante l\'aggiornamento delle statistiche:', error);
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
    currentGameScore.value = 0;
    gameRecorded.value = false;
});
</script>

<template>
    <section class="game-screen">
        <div class="container">
            <div class="game-grid">
                <aside class="player-panel">
                    <h5>{{ $t('game.info') }}</h5>
                    <strong class="player-name">{{ username }}</strong>
                    <div class="player-stats">
                        <div><span>{{ $t('game.points') }}</span><strong>{{ punti }}</strong></div>
                        <div><span>{{ $t('game.wins') }}</span><strong>{{ vittorie }}</strong></div>
                        <div><span>{{ $t('game.mulpoints') }}</span><strong>{{ moltiplicatore }}x</strong></div>
                    </div>
                    <RouterLink to="/menu" class="btn btn-secondary">{{ $t('game.return') }}</RouterLink>
                </aside>

                <main class="word-panel">
                    <div class="game-meta">
                        <span>{{ $t('game.mode') }}: <strong>{{ modeview }}</strong></span>
                        <span>{{ $t('game.attempts') }}: <strong>{{ remainingAttempts }}</strong></span>
                    </div>

                    <div class="hangman-stage" aria-hidden="true">
                        <svg class="hangman-drawing" viewBox="0 0 220 170" role="img">
                            <path class="gallows-line" d="M38 150H168M68 150V30H144V54" />
                            <path class="rope-line" d="M144 54V70" />
                            <g class="hangman-body">
                                <circle class="hangman-piece hangman-head" :class="{ fallen: wrongAttempts >= 6 }" cx="144" cy="86" r="15" />
                                <path class="hangman-piece" :class="{ fallen: wrongAttempts >= 5 }" d="M144 101V128" />
                                <path class="hangman-piece" :class="{ fallen: wrongAttempts >= 4 }" d="M144 108L121 96" />
                                <path class="hangman-piece" :class="{ fallen: wrongAttempts >= 3 }" d="M144 108L167 96" />
                                <path class="hangman-piece" :class="{ fallen: wrongAttempts >= 2 }" d="M144 128L126 150" />
                                <path class="hangman-piece" :class="{ fallen: wrongAttempts >= 1 }" d="M144 128L162 150" />
                            </g>
                        </svg>
                        <div class="stage-caption">
                            <span>{{ wrongAttempts }}/6</span>
                            <strong>{{ $t('game.attempts') }}: {{ remainingAttempts }}</strong>
                        </div>
                        <div class="attempt-meter">
                            <span v-for="attempt in 6" :key="attempt" :class="{ spent: attempt > remainingAttempts }"></span>
                        </div>
                    </div>

                    <div v-if="isWordGuessed()" class="result-message win">{{ $t('game.won') }}!</div>
                    <div v-if="isOutOfAttempts()" class="result-message loss">
                        {{ $t('game.loss') }}
                        <div>{{ $t('game.wordwas') }}: <span>{{ wordToGuess }}</span></div>
                    </div>

                    <div class="word-to-guess">
                        <span v-for="(letter, index) in word" :key="index" :class="{ revealed: guessedLetters.correct.includes(letter) }">
                            <span v-if="guessedLetters.correct.includes(letter)">{{ letter }}</span>
                            <span v-else>_</span>
                        </span>
                    </div>

                    <div class="wrong-letters" v-if="guessedLetters.wrong.length">
                        <span>Missed</span>
                        <strong>{{ guessedLetters.wrong.join(' ') }}</strong>
                    </div>

                    <div class="keyboard-container">
                        <SimpleKeyboard @onKeyPress="handleInput" :guessedLetters="guessedLetters" />
                    </div>

                    <div class="d-flex justify-content-center mt-3">
                        <button v-if="gameOver" @click="resetGame" class="btn btn-primary">{{ $t('game.resgame') }}</button>
                    </div>
                </main>
            </div>
        </div>
    </section>
</template>

<style>
.game-screen {
    padding: clamp(2rem, 6vw, 4rem) 0;
}

.game-grid {
    display: grid;
    grid-template-columns: minmax(240px, 310px) 1fr;
    gap: 1.2rem;
    align-items: start;
}

.player-panel,
.word-panel {
    border: 1px solid var(--hm-border);
    border-radius: var(--hm-radius);
    background: var(--hm-surface);
    box-shadow: var(--hm-shadow-soft);
    backdrop-filter: blur(18px);
}

.player-panel {
    position: sticky;
    top: 96px;
    padding: 1.35rem;
}

.player-panel h5 {
    margin-bottom: 0.4rem;
}

.player-name {
    display: block;
    color: var(--hm-accent);
    font-size: 1.2rem;
}

.player-stats {
    display: grid;
    gap: 0.65rem;
    margin: 1rem 0;
}

.player-stats div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.78rem 0.9rem;
    border: 1px solid var(--hm-border);
    border-radius: var(--hm-radius-xs);
    background: rgba(255, 255, 255, 0.06);
}

.player-stats span {
    color: var(--hm-text-muted);
    font-size: 0.85rem;
    font-weight: 800;
}

.player-stats strong {
    color: var(--hm-heading);
    font-size: 1.1rem;
}

.word-panel {
    padding: clamp(1rem, 3vw, 2rem);
}

.game-meta {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 0.75rem;
    color: var(--hm-text-muted);
}

.game-meta strong {
    color: var(--hm-success);
}

.hangman-stage {
    position: relative;
    min-height: 230px;
    margin: 1.4rem 0;
    border: 1px dashed rgba(255, 255, 255, 0.16);
    border-radius: var(--hm-radius);
    background:
        linear-gradient(90deg, rgba(255, 255, 255, 0.035) 1px, transparent 1px),
        linear-gradient(rgba(255, 255, 255, 0.035) 1px, transparent 1px);
    background-size: 34px 34px;
}

body[theme="custom-light"] .hangman-stage {
    background:
        linear-gradient(90deg, rgba(179, 54, 54, 0.055) 1px, transparent 1px),
        linear-gradient(rgba(179, 54, 54, 0.055) 1px, transparent 1px);
    background-size: 34px 34px;
}

.hangman-drawing {
    position: absolute;
    inset: 1rem;
    width: calc(100% - 2rem);
    height: calc(100% - 2rem);
    overflow: visible;
}

.gallows-line,
.rope-line,
.hangman-piece {
    fill: none;
    stroke-linecap: round;
    stroke-linejoin: round;
}

.gallows-line {
    stroke: var(--hm-accent);
    stroke-width: 7;
    filter: drop-shadow(0 12px 18px rgba(255, 77, 77, 0.18));
}

.rope-line {
    stroke: var(--hm-gold);
    stroke-width: 5;
}

.hangman-body {
    transform-origin: 144px 112px;
}

.hangman-piece {
    opacity: 1;
    stroke: var(--hm-heading);
    stroke-width: 7;
    transform-box: fill-box;
    transform-origin: center;
    transition: opacity 0.34s ease, transform 0.34s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.hangman-piece.fallen {
    opacity: 0.18;
    transform: translateY(54px) rotate(14deg);
}

.hangman-head {
    fill: rgba(255, 255, 255, 0.08);
}

body[theme="custom-light"] .hangman-head {
    fill: rgba(255, 77, 77, 0.06);
}

.stage-caption {
    position: absolute;
    left: 1rem;
    bottom: 1rem;
    display: inline-grid;
    gap: 0.1rem;
    padding: 0.68rem 0.82rem;
    border: 1px solid var(--hm-border);
    border-radius: var(--hm-radius-xs);
    background: rgba(255, 255, 255, 0.07);
    backdrop-filter: blur(10px);
}

.stage-caption span {
    color: var(--hm-accent);
    font-size: 1.25rem;
    font-weight: 950;
    line-height: 1;
}

.stage-caption strong {
    color: var(--hm-text-muted);
    font-size: 0.72rem;
    letter-spacing: 0.05em;
    text-transform: uppercase;
}

.attempt-meter {
    position: absolute;
    right: 1rem;
    bottom: 1rem;
    display: flex;
    gap: 0.35rem;
}

.attempt-meter span {
    width: 0.75rem;
    height: 0.75rem;
    border-radius: 50%;
    background: var(--hm-success);
    box-shadow: 0 0 14px rgba(102, 224, 163, 0.44);
}

.attempt-meter span.spent {
    background: var(--hm-danger);
    box-shadow: none;
}

.result-message {
    margin: 1rem 0;
    text-align: center;
    font-size: clamp(1.6rem, 5vw, 3rem);
    font-weight: 950;
}

.result-message.win {
    color: var(--hm-success);
}

.result-message.loss {
    color: var(--hm-danger);
}

.result-message div {
    color: var(--hm-text-muted);
    font-size: 1rem;
}

.result-message span {
    color: var(--hm-heading);
}

.word-to-guess {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.45rem;
    margin: 1.5rem 0;
    font-size: clamp(1.6rem, 6vw, 3.3rem);
}

.word-to-guess > span {
    display: grid;
    min-width: clamp(2.2rem, 7vw, 4rem);
    min-height: clamp(2.5rem, 7vw, 4.4rem);
    place-items: center;
    color: var(--hm-text-muted);
    border-bottom: 4px solid var(--hm-border);
    font-weight: 950;
}

.word-to-guess > span.revealed {
    color: var(--hm-accent);
    border-color: var(--hm-accent);
}

.wrong-letters {
    display: flex;
    justify-content: center;
    gap: 0.7rem;
    margin-bottom: 1rem;
    color: var(--hm-text-muted);
}

.wrong-letters strong {
    color: var(--hm-danger);
    letter-spacing: 0.18em;
}

.keyboard-container {
    display: flex;
    justify-content: center;
    width: min(100%, 760px);
    margin: 0 auto;
}

#keyboard.simple-keyboard {
    color: #101422;
    border: 1px solid var(--hm-border);
    border-radius: var(--hm-radius);
    background: rgba(255, 255, 255, 0.08);
    box-shadow: var(--hm-shadow-soft);
}

.hg-button {
    border: 0 !important;
    border-radius: 10px !important;
    background: rgba(255, 255, 255, 0.9) !important;
    font-weight: 900;
}

@media screen and (max-width: 992px) {
    .game-grid {
        grid-template-columns: 1fr;
    }

    .player-panel {
        position: static;
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
    margin-top: 1rem;
}
</style>
