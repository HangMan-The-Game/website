<script>
import { collection, getDocs, updateDoc, doc, onSnapshot } from 'firebase/firestore';
import { ref, onMounted, onUnmounted } from 'vue';
import { db } from '@/firebase.js';

export default {
    setup() {
        const users = ref([]);

        const fetchUsers = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'users'));
                users.value = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
            } catch (error) {
                console.error('Errore durante il recupero degli utenti:', error);
            }
        };

        const incrementPoints = async (userId) => {
            const userDoc = doc(db, 'users', userId);
            await updateDoc(userDoc, {
                points: users.value.find((user) => user.id === userId).points + 1,
            });
        };

        const decrementPoints = async (userId) => {
            const userDoc = doc(db, 'users', userId);
            await updateDoc(userDoc, {
                points: users.value.find((user) => user.id === userId).points - 1,
            });
        };

        onMounted(() => {
            fetchUsers();

            // Aggiorna i dati degli utenti in tempo reale
            const usersCollection = collection(db, 'users');
            const unsubscribe = onSnapshot(usersCollection, (snapshot) => {
                users.value = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
            });

            // Cleanup della sottoscrizione quando il componente viene distrutto
            onUnmounted(() => {
                unsubscribe();
            });
        });

        return {
            users,
            incrementPoints,
            decrementPoints,
        };
    },
};

</script>

<template>
    <div class="container w-75">
        <h1 class="mt-4">Gestisci Punti</h1>
        <table class="rounded shadow mx-auto table table-hover">
            <thead>
                <tr>
                    <th class="t-lead" scope="col">ID Utente</th>
                    <th class="t-lead" scope="col">Nome Utente</th>
                    <th class="t-lead" scope="col">Punti</th>
                    <th class="t-lead" scope="col">Azioni</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in users" :key="user.id">
                    <td class="t-lead">{{ user.id }}</td>
                    <td class="t-lead">{{ user.name }}</td>
                    <td class="t-lead">{{ user.points }}</td>
                    <td>
                        <button class="btn btn-primary me-2" @click="incrementPoints(user.id)">+</button>
                        <button class="btn btn-danger" @click="decrementPoints(user.id)">-</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>
table {
    border: 1.5px solid #FF4D4D;
    border-radius: 10px;
    border-collapse: separate !important;
}

td {
    border: none;
}
</style>