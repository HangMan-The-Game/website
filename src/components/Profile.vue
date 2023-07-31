<script setup>
import { onMounted, ref } from 'vue';
import { getAuth, onAuthStateChanged, signOut, updateProfile, updatePassword, sendEmailVerification, /* EmailAuthProvider, reauthenticateWithCredential */ } from 'firebase/auth';
import { collection, addDoc, getDocs, doc, deleteDoc, setDoc, getDoc } from 'firebase/firestore';
import router from '../router';
import { db } from '@/firebase.js';
import { computed } from 'vue';

const isLoggedIn = ref(false);

const username = ref('');
const email = ref('');
const role = ref('');
const punti = ref('');
const vittorie = ref(0)

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
                await setDoc(userDoc, { role: userData.role, mail: email.value, name: username.value, points: userData.points, vittorie: userData.vittorie });
                role.value = userData.role;
                vittorie.value = userData.vittorie;
                punti.value = userData.points;
            } else {
                await setDoc(userDoc, { role: 'user', mail: email.value, name: username.value, points: 0, vittorie: 0 });
                punti.value = 0;
                vittorie.value = 0;
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
    <div class="container w-50 py-5">
        <div class="card mt-4 shadow">
            <div class="card-body">
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
                <h4 class="card-text text-center">
                    Email: <span class="text-primary">{{ email }}</span>
                    <br>Username: <span class="fw-bold text-danger">{{ username }}</span>
                    <br>{{ $t("profile.role") }}: <span class="text-info">{{ roleLabel }}</span>
                    <br>{{ $t("profile.points") }}: <span class="text-success">{{ punti }}</span>
                    <br>{{ $t("profile.wins") }}: <span class="text-success">{{ vittorie }}</span>
                </h4>
                <button class="btn btn-danger d-block mx-auto mt-5" @click="handleSignOut" v-if="isLoggedIn">{{
                    $t("profile.logout") }}</button>
            </div>
            <RouterLink v-if="role === 'admin'" to="/words" class="card-footer text-center mt-4 text-decoration-none">
                {{ $t("profile.manwords") }}
            </RouterLink>
            <RouterLink v-if="role === 'admin'" to="/points" class="card-footer text-center text-decoration-none">{{
                $t("profile.points") }}
            </RouterLink>
            <RouterLink v-if="role === 'admin'" to="/users" class="card-footer text-center text-decoration-none">{{
                $t("profile.manusers") }}
            </RouterLink>
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
</template>

<style scoped>
a {
    cursor: pointer;
}
</style>