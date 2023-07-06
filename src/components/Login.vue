<script setup>
import { auth } from '@/firebase.js'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile } from 'firebase/auth'
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