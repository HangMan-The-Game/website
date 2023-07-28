<script setup>
import { auth } from '@/firebase.js'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile, sendPasswordResetEmail } from 'firebase/auth'
import { getDocs, collection } from 'firebase/firestore';
import { db } from '@/firebase.js';
import { ref, reactive, computed } from 'vue';
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

function toggleMode(val) {
    mode.value = val
}

async function login(email, password) {
    await signInWithEmailAndPassword(auth, email, password).then((result) => {
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
        await updateProfile(result.user, { role });
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

async function forgotPassword() {
    try {
        // await sendPasswordResetEmail(auth, email.value);
        editMsg.value = 'Email inviata con successo';
        closeModal();
    } catch (error) {
        console.error('Errore durante l\'invio dell\'email di reset password:', error);
        editMsg.value = 'Errore durante l\'invio dell\'email di reset password';
    }
}

onAuthStateChanged(auth, currentUser => {
    user.value = currentUser
})
</script>

<template>
    <div class="container w-50 my-5">
        <div class="row justify-content-center">
            <div class="col-lg-6">
                <div class="card shadow">
                    <div class="card-body">
                        <h3 class="card-title text-center mb-4">{{ mode === 'login' ? 'Login' : 'Register' }}</h3>
                        <form @submit.prevent="submit">
                            <div v-if="mode === 'register'" class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Email address</label>
                                <input type="email" class="form-control" id="exampleInputEmail1"
                                    aria-describedby="emailHelp" v-model="emailRef" required @input="checkEmail">
                                <div v-if="emailError && emailError.length > 0" class="text-danger">{{ emailError
                                }}</div>
                            </div>
                            <div v-else class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Email address</label>
                                <input type="email" class="form-control" id="exampleInputEmail1"
                                    aria-describedby="emailHelp" v-model="emailRef">
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
                            <button type="submit" class="btn btn-danger w-100">{{ mode === 'login' ? 'Login' : 'Register'
                            }}</button>
                            <p class="text-warning text-center fw-bold my-3" v-if="errMsg">{{ errMsg }}</p>
                            <div>

                                <button v-if="mode === 'login'" type="button"
                                    class="btn btn-primary mx-auto d-flex justify-content-center mt-2"
                                    data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@fat">
                                    test
                                </button>
                                <div class=" modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                                    aria-hidden="true">
                                    <div class="modal-dialog">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                    aria-label="Close"></button>
                                            </div>
                                            <div class="modal-body">
                                                <div class="mb-3">
                                                    <label for="recipient-name" class="col-form-label">Recipient:</label>
                                                    <input type="email" id="email" v-model="data.email"
                                                        class="form-control">
                                                </div>
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary"
                                                    data-bs-dismiss="modal">Close</button>
                                                <button type="button" class="btn btn-primary">Save changes</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- <a class="text-decoration-none fw-bold text-center d-flex justify-content-center"
                                v-if="errMsg === 'Password errata'" @click="openModal">Forgot the
                                Password?</a> -->
                            <p class="text-center mb-0">
                                {{ mode === 'login' ? 'Not registered yet?' : 'Already registered?' }}
                                <a class="text-decoration-none fw-bold"
                                    @click="toggleMode(mode === 'login' ? 'register' : 'login')">
                                    {{ mode === 'login' ? 'Register here' : 'Login here' }}
                                </a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<style scoped> a {
     color: #FF4D4D;
     cursor: pointer;
 }

 a:hover {
     color: #b33636;
 }
</style>  