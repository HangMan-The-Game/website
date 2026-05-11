<script setup>
import { computed, onMounted, ref } from 'vue';
import { getAuth, onAuthStateChanged, signOut, updateProfile, updatePassword, sendEmailVerification, /* EmailAuthProvider, reauthenticateWithCredential */ } from 'firebase/auth';
import { collection, addDoc, getDocs, doc, deleteDoc, setDoc, getDoc } from 'firebase/firestore';
import router from '../router';
import { db } from '@/firebase.js';

const isLoggedIn = ref(false);

const username = ref('');
const email = ref('');
const role = ref('');
const punti = ref('');
const vittorie = ref(0)
const gamesPlayed = ref(0);
const bestGameScore = ref(0);
const currentStreak = ref(0);
const bestStreak = ref(0);

const newPassword = ref('');
/* const currentPassword = ref('');
const confirmNewPassword = ref(''); */

const editMsg = ref();

const isUsernameEditable = ref(false);

const auth = getAuth();

onMounted(async () => {
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            isLoggedIn.value = true;
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
                role.value = userStats.role;
                vittorie.value = userStats.vittorie;
                punti.value = userStats.points;
                gamesPlayed.value = userStats.gamesPlayed;
                bestGameScore.value = userStats.bestGameScore;
                currentStreak.value = userStats.currentStreak;
                bestStreak.value = userStats.bestStreak;
            } else {
                await setDoc(userDoc, {
                    role: 'user',
                    mail: email.value,
                    name: username.value,
                    points: 0,
                    vittorie: 0,
                    gamesPlayed: 0,
                    bestGameScore: 0,
                    currentStreak: 0,
                    bestStreak: 0,
                });
                punti.value = 0;
                vittorie.value = 0;
                gamesPlayed.value = 0;
                bestGameScore.value = 0;
                currentStreak.value = 0;
                bestStreak.value = 0;
                role.value = 'user';
            }
        } else {
            isLoggedIn.value = false;
        }
    });
});


const roleLabel = computed(() => {
    if (role.value === 'user') {
        return 'Utente';
    } else if (role.value === 'admin') {
        return 'Amministratore';
    } else {
        return '';
    }
});

const winRate = computed(() => {
    if (!gamesPlayed.value) {
        return '0%';
    }

    return `${Math.round((vittorie.value / gamesPlayed.value) * 100)}%`;
});

const handleSignOut = () => {
    signOut(auth).then(() => {
        router.push('/login');
    });
};

const toggleUsernameEditable = () => {
    isUsernameEditable.value = !isUsernameEditable.value;
};

function checkEmailVerification() {
    const user = getAuth().currentUser;
    if (user && user.emailVerified) {
        console.log('L\'email è stata verificata.');
        return false;
    } else {
        console.log('L\'email non è stata verificata.');
        return true;
    }
}

async function sendVerificationEmail() {
    const user = getAuth().currentUser;

    if (user) {
        try {
            await sendEmailVerification(user);
            console.log('Email di verifica inviata con successo.');
        } catch (error) {
            console.error('Errore durante l\'invio dell\'email di verifica:', error);
        }
    } else {
        console.log('Nessun utente loggato.');
    }
}

async function updateAccount() {
    try {
        if (username.value !== user.displayName) {
            await updateProfile(user, {
                displayName: username.value,
            });
        }

        if (newPassword.value !== '') {
            await updatePassword(user, newPassword.value);
        }

        editMsg.value = 'Modifiche salvate con successo';
    } catch (error) {
        console.error(error);
    }
}

const showAlert = ref(false);

function hideAlert() {
    showAlert.value = false;
}
</script>

<template>
    <section class="profile-page">
    <div class="profile-panel">
        <div v-if="checkEmailVerification()" class="toast align-items-center d-block mx-auto">
            <div class="d-flex">
                <div class="toast-body">
                    {{ $t("profile.alertver") }}
                </div>
            </div>
        </div>
        <div class="card mt-4">
            <div class="card-body">
                <span class="section-kicker justify-content-center d-flex"><i class="bi bi-person-badge"></i> Account</span>
                <h3 class="card-title text-center mb-4">{{ $t("profile.welcome") }}</h3>
                <div v-if="showAlert" class="alert alert-success w-75 mx-auto d-flex" role="alert">
                    <div class="flex-grow-1">{{ $t("profile.emailver") }}</div>
                    <button type="button" class="btn-close" @click="hideAlert" aria-label="Close"></button>
                </div>
                <button type="button" class="btn btn-danger d-block mx-auto mb-3 fs-5"
                    @click="() => { sendVerificationEmail(); showAlert = true; }" v-if="checkEmailVerification()">{{
                        $t("profile.veryouremail") }}</button>
                <!-- <button class="btn btn-danger d-block mx-auto mb-3 fs-5" @click="sendVerificationEmail()"
                    v-if="checkEmailVerification()">Verifica la tua mail</button> -->
                <div class="account-details">
                    <div><span>Email</span><strong>{{ email }}</strong></div>
                    <div><span>Username</span><strong>{{ username }}</strong></div>
                    <div><span>{{ $t("profile.role") }}</span><strong>{{ roleLabel }}</strong></div>
                </div>
                <button class="btn btn-danger d-block mx-auto mt-5" @click="handleSignOut" v-if="isLoggedIn">{{
                    $t("profile.logout") }}</button>
            </div>
            <RouterLink v-if="role === 'admin'" to="/words" class="card-footer text-center mt-4 text-decoration-none">
                {{ $t("profile.manwords") }}
            </RouterLink>
            <RouterLink v-if="role === 'admin'" to="/points" class="card-footer text-center text-decoration-none">{{
                $t("profile.manpoints") }}
            </RouterLink>
            <RouterLink v-if="role === 'admin'" to="/users" class="card-footer text-center text-decoration-none">{{
                $t("profile.manusers") }}
            </RouterLink>
            <RouterLink v-if="role === 'admin'" to="/leadino" class="card-footer text-center text-decoration-none">
                MakerFaire
            </RouterLink>
        </div>

        <div class="card stats-card mt-4">
            <div class="card-body">
                <span class="section-kicker justify-content-center d-flex"><i class="bi bi-graph-up-arrow"></i> Stats</span>
                <div class="profile-stats">
                    <div><span>{{ $t("profile.points") }}</span><strong>{{ punti }}</strong></div>
                    <div><span>{{ $t("profile.wins") }}</span><strong>{{ vittorie }}</strong></div>
                    <div><span>{{ $t("profile.gamesPlayed") }}</span><strong>{{ gamesPlayed }}</strong></div>
                    <div><span>{{ $t("profile.winRate") }}</span><strong>{{ winRate }}</strong></div>
                    <div><span>{{ $t("profile.bestScore") }}</span><strong>{{ bestGameScore }}</strong></div>
                    <div><span>{{ $t("profile.currentStreak") }}</span><strong>{{ currentStreak }}</strong></div>
                    <div><span>{{ $t("profile.bestStreak") }}</span><strong>{{ bestStreak }}</strong></div>
                </div>
            </div>
        </div>
        <!--         <div class="card shadow mt-2">
            <div class="card-body">
                <h2 class="card-title text-center mb-4">Impostazioni dell'account</h2>
                <form @submit="updateAccount">
                    <div class="mb-3">
                        <label for="username" class="form-label">Nome utente:</label>
                        <div class="input-group">
                            <input type="text" class="form-control" id="username" v-model="username" required
                                :disabled="!isUsernameEditable">
                            <button class="btn btn-outline-primary" type="button" @click="toggleUsernameEditable">
                                <i class="bi bi-pencil-fill"></i>
                            </button>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="email" class="form-label">Email:</label>
                        <div class="input-group">
                            <input type="email" class="form-control" id="email" v-model="email" disabled>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="newPassword" class="form-label">Nuova password:</label>
                        <input type="password" class="form-control" id="newPassword" v-model="newPassword">
                    </div>
                    <button type="submit" class="btn btn-primary">Salva modifiche</button>
                    <p class="text-primary text-center fw-bold mt-2" v-if="editMsg">{{ editMsg }}</p>
                </form>
            </div>
        </div> -->
    </div>
    </section>
</template>

<style scoped>
.profile-page {
    padding: clamp(2rem, 6vw, 5rem) 1rem;
}

.profile-panel {
    width: min(100%, 720px);
    margin: 0 auto;
}

.profile-panel .card {
    backdrop-filter: blur(18px);
}

.card-title {
    font-size: clamp(2.2rem, 6vw, 3.6rem);
}

.account-details,
.profile-stats {
    display: grid;
    gap: 0.7rem;
    margin-top: 1.25rem;
}

.account-details div {
    position: relative;
    display: grid;
    grid-template-columns: minmax(150px, 0.42fr) 1fr;
    gap: 1rem;
    align-items: center;
    overflow: hidden;
    padding: 0.85rem 1rem 0.85rem 1.1rem;
    border: 1px solid var(--hm-border);
    border-radius: var(--hm-radius-xs);
    background:
        linear-gradient(90deg, rgba(255, 77, 77, 0.12), transparent 38%),
        rgba(255, 255, 255, 0.055);
}

.account-details span {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    color: var(--hm-accent);
    font-size: 0.82rem;
    font-weight: 850;
    letter-spacing: 0.08em;
    text-transform: uppercase;
}

.account-details span::before {
    width: 0.42rem;
    height: 0.42rem;
    content: "";
    border-radius: 999px;
    background: var(--hm-accent);
    box-shadow: 0 0 14px rgba(255, 77, 77, 0.55);
}

.account-details strong {
    overflow-wrap: anywhere;
    color: var(--hm-heading);
    font-size: 1.05rem;
    font-weight: 900;
}

.stats-card .profile-stats {
    grid-template-columns: repeat(2, minmax(0, 1fr));
}

.profile-stats div {
    position: relative;
    overflow: hidden;
    min-height: 124px;
    padding: 1rem;
    border: 1px solid var(--hm-border);
    border-radius: var(--hm-radius-sm);
    background:
        radial-gradient(circle at 100% 0%, rgba(255, 77, 77, 0.16), transparent 44%),
        rgba(255, 255, 255, 0.055);
}

.profile-stats span,
.profile-stats strong {
    display: block;
}

.profile-stats span {
    color: var(--hm-text-muted);
    font-size: 0.74rem;
    font-weight: 850;
    letter-spacing: 0.08em;
    text-transform: uppercase;
}

.profile-stats strong {
    margin-top: 0.45rem;
    color: var(--hm-heading);
    font-size: clamp(1.65rem, 5vw, 2.35rem);
    font-weight: 950;
    line-height: 1;
}

.profile-stats div:first-child {
    grid-column: span 2;
    min-height: 136px;
}

.profile-stats div:first-child strong {
    color: var(--hm-accent);
    font-size: clamp(2.2rem, 7vw, 3.6rem);
}

:global(body[theme="custom-light"]) .account-details div,
:global(body[theme="custom-light"]) .profile-stats div {
    background:
        linear-gradient(90deg, rgba(255, 77, 77, 0.10), transparent 38%),
        rgba(255, 255, 255, 0.62);
}

a {
    cursor: pointer;
}

@media (max-width: 575.98px) {
    .account-details div {
        grid-template-columns: 1fr;
        gap: 0.2rem;
    }

    .stats-card .profile-stats {
        grid-template-columns: 1fr;
    }

    .profile-stats div:first-child {
        grid-column: auto;
    }
}
</style>
