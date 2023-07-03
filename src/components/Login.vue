<script setup>
import { auth } from '@/firebase.js'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile } from 'firebase/auth'
import { ref } from 'vue';
import router from '../router';

const data = ref({
    email: '',
    password: '',
    username: ''
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

async function register(email, password, username) {
    if (password.length < 6) {
        errMsg.value = 'La password deve essere di almeno 6 caratteri';
        return;
    }
    await createUserWithEmailAndPassword(auth, email, password).then(async (result) => {
        await updateProfileWithUsername(result.user, username);
        router.push('/profile')
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })
}

async function updateProfileWithUsername(user, username) {
    await updateProfile(user, {
        displayName: username
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
    <div class="container w-25 my-5">
        <div v-if="user">{{ user?.email }} <button @click="signout">Sign Out</button></div>
        <form @submit.prevent="submit">
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label d-block mb-2 fw-bold text-center">Email address</label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                    v-model="data.email">
            </div>
            <div v-if="mode === 'register'" class="mb-3">
                <label for="exampleInputUsername" class="form-label d-block mb-2 fw-bold text-center">Username</label>
                <input type="text" class="form-control" id="exampleInputUsername" v-model="data.username" required>
            </div>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label d-block mb-2 fw-bold text-center">Password</label>
                <input type="password" class="form-control" id="exampleInputPassword1" v-model="data.password">
            </div>
            <button type="submit" class="btn btn-primary d-block mx-auto">{{ mode === 'login' ? 'Login' :
                'Register' }}</button>
            <p class="text-danger text-center fw-bold fw-2 my-2" v-if="errMsg">{{ errMsg }}</p>
            <a class="text-center text-decoration-none d-block mx-auto"
                @click="toggleMode(mode === 'login' ? 'register' : 'login')">
                {{ mode === 'login' ? 'Not registered yet?' : 'Already registered ?' }}
            </a>
        </form>
    </div>
</template>
