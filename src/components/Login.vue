<script setup>
import { auth } from '@/firebase.js'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile, sendPasswordResetEmail } from 'firebase/auth'
import { ref } from 'vue';
import router from '../router';

const data = ref({
    email: '',
    password: '',
    username: '',
    role: ''
})

const mode = ref('login')

const user = ref(null)
const errMsg = ref()

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
    let email = data.value.email
    let password = data.value.password
    let username = data.value.username
    if (mode.value === 'login') {
        login(email, password)
    } else {
        register(email, password, username)
    }
}

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
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Email address</label>
                                <input type="email" class="form-control" id="exampleInputEmail1"
                                    aria-describedby="emailHelp" v-model="data.email">
                            </div>
                            <div v-if="mode === 'register'" class="mb-3">
                                <label for="exampleInputUsername" class="form-label">Username</label>
                                <input type="text" class="form-control" id="exampleInputUsername" v-model="data.username"
                                    required>
                            </div>
                            <div class="mb-3">
                                <label for="exampleInputPassword1" class="form-label">Password</label>
                                <input type="password" class="form-control" id="exampleInputPassword1"
                                    v-model="data.password">
                            </div>
                            <button type="submit" class="btn btn-danger w-100">{{ mode === 'login' ? 'Login' : 'Register'
                            }}</button>
                            <p class="text-warning text-center fw-bold my-3" v-if="errMsg">{{ errMsg }}</p>
                            <div>

                                <button type="button" class="btn btn-primary mx-auto d-flex justify-content-center mt-2"
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