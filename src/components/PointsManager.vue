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

            const usersCollection = collection(db, 'users');
            const unsubscribe = onSnapshot(usersCollection, (snapshot) => {
                users.value = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
            });

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
    <div class="admin-page">
        <span class="section-kicker"><i class="bi bi-plus-slash-minus"></i> Admin</span>
        <h1 class="mt-2 mb-3">Gestisci Punti</h1>
        <div class="table-responsive">
        <table class="table table-hover">
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
    </div>
</template>

<style scoped></style>
