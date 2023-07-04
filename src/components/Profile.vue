<script setup>
import { onMounted, ref } from 'vue';
import { getAuth, onAuthStateChanged, signOut, updateProfile, updateEmail, updatePassword } from 'firebase/auth';
import { collection, addDoc, getDocs, doc, deleteDoc, setDoc, getDoc } from 'firebase/firestore';
import router from '../router';

import { db } from '@/firebase.js';

import { computed } from 'vue';

const isLoggedIn = ref(false);
const username = ref('');
const email = ref('');
const role = ref('');
const newPassword = ref('');
const editMsg = ref('');

const isUsernameEditable = ref(false);
const isEmailEditable = ref(false);

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
                role.value = userData.role;
            } else {
                await setDoc(userDoc, { role: 'user' });
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

const handleSignOut = () => {
    signOut(auth).then(() => {
        router.push('/login');
    });
};

const toggleUsernameEditable = () => {
    isUsernameEditable.value = !isUsernameEditable.value;
};

const toggleEmailEditable = () => {
    isEmailEditable.value = !isEmailEditable.value;
};

async function updateAccount() {
    const user = auth.currentUser;

    try {
        if (username.value !== user.displayName) {
            await updateProfile(user, {
                displayName: username.value,
            });
        }

        if (email.value !== user.email) {
            await updateEmail(user, email.value);
        }

        if (newPassword.value !== '') {
            await updatePassword(user, newPassword.value);
        }

        editMsg.value = 'Modifiche salvate con successo';
    } catch (error) {
        console.error(error);
    }
}
</script>

<template>
    <div class="container w-50 py-5">
        <div class="card shadow">
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
                            <input type="email" class="form-control" id="email" v-model="email" required
                                :disabled="!isEmailEditable">
                            <button class="btn btn-outline-primary" type="button" @click="toggleEmailEditable">
                                <i class="bi bi-pencil-fill"></i>
                            </button>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="newPassword" class="form-label">Nuova password:</label>
                        <input type="password" class="form-control" id="newPassword" v-model="newPassword">
                    </div>
                    <button type="submit" class="btn btn-primary">Salva modifiche</button>
                </form>
            </div>
        </div>
        <div class="card mt-4 shadow">
            <div class="card-body">
                <h3 class="card-title text-center mb-4">Benvenuto</h3>
                <h4 class="card-text text-center">
                    Email: <span class="text-primary">{{ email }}</span>
                    <br>Username: <span class="fw-bold text-danger">{{ username }}</span>
                    <br>Ruolo: <span class="text-info">{{ roleLabel }}</span>
                </h4>
                <button class="btn btn-danger d-block mx-auto mt-5" @click="handleSignOut" v-if="isLoggedIn">Esci</button>
                <p class="text-danger text-center fw-bold mt-2" v-if="editMsg">{{ editMsg }}</p>
            </div>
            <RouterLink to="/words" class="card-footer text-center mt-4">Gestisci Parole</RouterLink>
        </div>
    </div>
</template>