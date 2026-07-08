<script setup>
import { auth } from '@/firebase.js'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile, sendPasswordResetEmail, sendEmailVerification, getAuth } from 'firebase/auth'
import { getDocs, collection, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/firebase.js';
import { ref, reactive, computed, getCurrentInstance } from 'vue';
import router from '../router';

const data = ref({
    password: '',
    role: ''
})

const email = reactive({
    value: '',
})

const username = reactive({
    value: '',
})

const usernameRef = ref(username.value);
const emailRef = ref(email.value);

const mode = ref('login');

const user = ref(null);
const errMsg = ref();
const usernameError = ref('');
const emailError = ref('');
const acceptedLegal = ref(false);
const instance = getCurrentInstance();

function toggleMode(val) {
    mode.value = val
}

/* async function login(emailOrUsername, password) {
    // Controlla se l'input è una email o un username
    const isEmail = /\S+@\S+\.\S+/.test(emailOrUsername);
    let userCredential;

    if (isEmail) {
        // Effettua il login tramite email e password
        userCredential = await signInWithEmailAndPassword(auth, emailOrUsername, password);
    } else {
        // Effettua il login tramite username
        const querySnapshot = await getDocs(collection(db, 'users'));
        const users = querySnapshot.docs.map(doc => doc.data());
        const user = users.find(u => u.name.toLowerCase() === emailOrUsername.toLowerCase());

        if (user) {
            // Trovato l'utente con l'username fornito, effettua il login con la sua email e password
            userCredential = await signInWithEmailAndPassword(auth, user.email, password);
        } else {
            // Nessun utente trovato con l'username fornito
            errMsg.value = 'Username non valido';
            return;
        }
    }

    // Login effettuato con successo, userCredential contiene le informazioni dell'utente loggato
    router.push('/profile');
    console.log(userCredential);
} */



async function login(email, password) {
    await signInWithEmailAndPassword(auth, email, password).then((result) => {
        /*         const user = getAuth().currentUser;
                if (user && user.emailVerified) {
                    console.log("email verificata")
                } else {
                    console.log("email non verificata")
                } */
        router.push('/profile')
        console.log(result)
    }).catch((error) => {
        console.log(error)
        switch (error.code) {
            case 'auth/invalid-email':
                errMsg.value = 'Email non valida'
                break
            case 'auth/user-not-found':
                errMsg.value = 'Utente non trovato'
                break
            case 'auth/wrong-password':
                errMsg.value = 'Password errata'
                break
            default:
                errMsg.value = 'Email o Password errati'
                break
        }
    })
}

async function register(email, password, username, role) {
    if (password.length < 6) {
        errMsg.value = 'La password deve essere di almeno 6 caratteri';
        return;
    }

    await checkUsername();

    if (usernameError.value) {
        return;
    }

    await createUserWithEmailAndPassword(auth, email, password).then(async (result) => {
        await updateProfileWithUsername(result.user, username);
        // await sendEmailVerification(result.user);
        await updateProfile(result.user, { role });
        await setDoc(doc(db, 'users', result.user.uid), {
            role: 'user',
            mail: email,
            name: username,
            points: 0,
            vittorie: 0,
            gamesPlayed: 0,
            bestGameScore: 0,
            currentStreak: 0,
            bestStreak: 0,
            legalAcceptedAt: serverTimestamp(),
            termsVersion: '2026-07-08',
            privacyVersion: '2026-07-08',
        }, { merge: true });
        router.push('/profile');
        console.log(result);
    }).catch((error) => {
        console.log(error);
    });
}

async function updateProfileWithUsername(user, username) {
    await updateProfile(user, {
        displayName: username,
        role: data.value.role
    });
}

function submit() {
    let password = data.value.password
    if (mode.value === 'login') {
        login(emailRef.value, password)
    } else {
        if (!acceptedLegal.value) {
            errMsg.value = instance?.proxy?.$i18n?.locale === 'Italiano'
                ? 'Per registrarti devi accettare i Termini e confermare di aver letto la Privacy Policy.'
                : 'To register, you must accept the Terms and confirm that you have read the Privacy Policy.';
            return;
        }
        register(emailRef.value, password, usernameRef.value)
    }
}

async function checkUsername() {
    const usernameRegex = /^[a-zA-Z0-9_-]{3,16}$/;
    if (!usernameRegex.test(usernameRef.value)) {
        usernameError.value = 'L\'username deve contenere solo lettere, numeri, trattini e underscore e deve essere lungo tra 3 e 16 caratteri.';
    } else {
        const querySnapshot = await getDocs(collection(db, 'users'));
        const users = querySnapshot.docs.map(doc => doc.data());

        const usernameExists = users.some(user => user.name.toLowerCase() === usernameRef.value.toLowerCase());

        if (usernameExists) {
            usernameError.value = 'L\'username è già occupato. Scegli un altro username.';
        } else {
            usernameError.value = null;
        }
    }
};

async function checkEmail() {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(emailRef.value)) {
        emailError.value = 'L\'indirizzo email non è valido.';
    } else {
        const querySnapshot = await getDocs(collection(db, 'users'));
        const users = querySnapshot.docs.map(doc => doc.data());

        const emailExists = users.some(user => user.mail.toLowerCase() === emailRef.value.toLowerCase());

        if (emailExists) {
            emailError.value = 'L\'indirizzo email è già in uso. Scegli un altro indirizzo email.';
        } else {
            emailError.value = null;
        }
    }
};

/* function checkPasswordStrength(password) {
    const minPasswordLength = 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChars = /[!@#$%^&*()_+[\]{};':"\\|,.<>?]/.test(password);

    let score = 0;
    if (password.length >= minPasswordLength) score += 2;
    if (hasUppercase) score += 1;
    if (hasLowercase) score += 1;
    if (hasNumbers) score += 1;
    if (hasSpecialChars) score += 1;

    if (score >= 5) {
        return 'strong';
    } else if (score >= 3) {
        return 'moderate';
    } else {
        return 'weak';
    }
}


function getPasswordStrengthMessage(password) {
    const strength = checkPasswordStrength(password);
    if (strength === 'strong') {
        return 'Password forte';
    } else if (strength === 'moderate') {
        return 'Password moderata';
    } else {
        return 'Password debole';
    }
}

const passwordStrengthMessage = computed(() => getPasswordStrengthMessage(data.password)); */

async function signout() {
    await signOut(auth).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })
}

/* async function forgotPassword(email) {
    try {
        await sendPasswordResetEmail(auth, email);
        editMsg.value = 'Email inviata con successo';
        closeModal(); // Chiude il modal dopo l'invio dell'email
    } catch (error) {
        console.error('Errore durante l\'invio dell\'email di reset password:', error);
        editMsg.value = 'Errore durante l\'invio dell\'email di reset password';
    }
}
 */


async function forgotPassword(emailForgot) {
    try {
        await sendPasswordResetEmail(auth, emailForgot);
        // editMsg.value = 'Email inviata con successo';
        closeModal();
    } catch (error) {
        console.error('Errore durante l\'invio dell\'email di reset password:', error);
        // editMsg.value = 'Errore durante l\'invio dell\'email di reset password';
    }
}

onAuthStateChanged(auth, currentUser => {
    user.value = currentUser
})
</script>

<template>
    <section class="auth-page">
        <div class="auth-panel">
            <div class="auth-copy">
                <span class="section-kicker"><i class="bi bi-person-lock"></i> Player access</span>
                <h1>{{ mode === 'login' ? 'Login' : 'Register' }}</h1>
                <p>Enter the word arena, save your progress and keep your place on the leaderboard.</p>
                <div class="auth-word" aria-hidden="true"><span>L</span><span>O</span><span>G</span><span>_</span><span>N</span></div>
            </div>
            <div class="auth-card">
                <div class="card">
                    <div class="card-body">
                        <h3 class="card-title text-center mb-4">{{ mode === 'login' ? 'Login' : 'Register' }}</h3>
                        <form @submit.prevent="submit">
                            <div v-if="mode === 'register'" class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">{{ $t("logreg.email") }}</label>
                                <input type="email" class="form-control" id="exampleInputEmail1"
                                    aria-describedby="emailHelp" v-model="emailRef" required @input="checkEmail">
                                <div v-if="emailError && emailError.length > 0" class="text-danger">{{ emailError
                                }}</div>
                            </div>
                            <div v-else class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">{{ $t("logreg.email") }}</label>
                                <input class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                                    v-model="emailRef" autocomplete="email">
                            </div>
                            <div v-if="mode === 'register'" class="mb-3">
                                <label for="exampleInputUsername" class="form-label">Username</label>
                                <input type="text" class="form-control" id="exampleInputUsername" v-model="usernameRef"
                                    required @input="checkUsername">
                                <div v-if="usernameError && usernameRef.length > 0" class="text-danger">{{ usernameError
                                }}</div>
                            </div>
                            <div v-if="mode === 'register'" class="mb-3">
                                <label for="exampleInputPassword1" class="form-label">Password</label>
                                <input type="password" class="form-control" id="exampleInputPassword1"
                                    v-model="data.password">
                            </div>
                            <div v-else class="mb-3">
                                <label for="exampleInputPassword1" class="form-label">Password</label>
                                <input type="password" class="form-control" id="exampleInputPassword1"
                                    v-model="data.password">
                            </div>
                            <div v-if="mode === 'register'" class="form-check legal-consent mb-3">
                                <input id="legal-consent" v-model="acceptedLegal" class="form-check-input" type="checkbox" required>
                                <label v-if="$i18n.locale === 'Italiano'" class="form-check-label" for="legal-consent">
                                    Ho almeno 14 anni oppure utilizzo il servizio con l'autorizzazione di un genitore o tutore.
                                    Accetto i <RouterLink to="/terms" @click.stop>Termini</RouterLink> e dichiaro di aver letto la
                                    <RouterLink to="/privacy-policy" @click.stop>Privacy Policy</RouterLink>.
                                </label>
                                <label v-else class="form-check-label" for="legal-consent">
                                    I am at least 14 years old, or I use the service with permission from a parent or guardian.
                                    I accept the <RouterLink to="/terms" @click.stop>Terms</RouterLink> and confirm that I have read the
                                    <RouterLink to="/privacy-policy" @click.stop>Privacy Policy</RouterLink>.
                                </label>
                            </div>
                            <button type="submit" class="btn btn-danger w-100">{{
                                mode === 'login' ? 'Login' : 'Register'
                            }}</button>
                            <p class="text-warning text-center fw-bold my-3" v-if="errMsg">{{ errMsg }}</p>
                            <div>

                                <a v-if="mode === 'login'" type="button"
                                    class="text-decoration-none mx-auto d-flex justify-content-center mt-2"
                                    data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@fat">
                                    {{ $t("logreg.forgpsw") }}
                                </a>
                                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                                    aria-hidden="true">
                                    <div class="modal-dialog">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h1 class="modal-title fs-5" id="exampleModalLabel">{{ $t("logreg.respsw")
                                                }}</h1>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                    aria-label="Close"></button>
                                            </div>
                                            <div class="modal-body">
                                                <div class="mb-3">
                                                    <label for="recipient-name" class="col-form-label">{{
                                                        $t("logreg.forgemail") }}</label>
                                                    <input type="email" id="email" v-model="data.email"
                                                        class="form-control">
                                                </div>
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">{{
                                                    $t("logreg.close") }}</button>
                                                <button type="button" class="btn btn-primary"
                                                    @click="forgotPassword(data.email)">{{ $t("logreg.submit") }}</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <p class="text-center mb-0">
                                {{ $t(mode === 'login' ? 'logreg.notalr' : 'logreg.already') }}
                                <!-- {{ mode === 'login' ? 'Not registered yet?' : 'Already registered?' }} -->
                                <a class="text-decoration-none fw-bold"
                                    @click="toggleMode(mode === 'login' ? 'register' : 'login')">
                                    {{ $t(mode === 'login' ? 'logreg.reghere' : 'logreg.loghere') }}
                                    <!-- {{ mode === 'login' ? 'Register here' : 'Login here' }} -->
                                </a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>


<style scoped>
.auth-page {
    display: grid;
    min-height: calc(100vh - 170px);
    place-items: center;
    padding: clamp(2rem, 6vw, 5rem) 1rem;
}

.auth-panel {
    display: grid;
    grid-template-columns: minmax(0, 0.9fr) minmax(320px, 0.8fr);
    gap: clamp(1rem, 4vw, 3rem);
    width: min(100%, 1040px);
    align-items: center;
}

.auth-copy h1 {
    color: var(--hm-heading);
    font-size: clamp(3rem, 8vw, 5.6rem);
    font-weight: 950;
    line-height: 0.95;
}

.auth-copy p {
    max-width: 520px;
    color: var(--hm-text-muted);
    font-size: 1.12rem;
}

.auth-word {
    display: flex;
    gap: 0.5rem;
    margin-top: 1.5rem;
}

.auth-word span {
    display: grid;
    width: 3rem;
    aspect-ratio: 1;
    place-items: center;
    color: var(--hm-accent);
    border: 1px solid var(--hm-border);
    border-bottom: 3px solid var(--hm-accent);
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.07);
    font-weight: 950;
}

.auth-card .card {
    backdrop-filter: blur(18px);
}

a {
    color: var(--hm-accent);
    cursor: pointer;
}

a:hover {
    color: var(--hm-success);
}

.legal-consent {
    display: grid;
    grid-template-columns: 20px minmax(0, 1fr);
    gap: 0.7rem;
    padding: 0.9rem;
    color: var(--hm-text-muted);
    border: 1px solid var(--hm-border);
    border-radius: var(--hm-radius-xs);
    background: rgba(255, 255, 255, 0.045);
    font-size: 0.82rem;
    line-height: 1.45;
}

.legal-consent .form-check-input {
    width: 18px;
    height: 18px;
    margin: 0.15rem 0 0;
    border-color: var(--hm-border);
    background-color: rgba(255, 255, 255, 0.08);
}

.legal-consent .form-check-input:checked {
    border-color: var(--hm-accent);
    background-color: var(--hm-accent);
}

.legal-consent .form-check-input:focus {
    box-shadow: 0 0 0 0.2rem rgba(255, 77, 77, 0.16);
}

.legal-consent a {
    font-weight: 850;
}

@media (max-width: 899.98px) {
    .auth-panel {
        grid-template-columns: 1fr;
    }
}
</style>  
