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
    <div class="container">
        <h1>Gestisci Punti</h1>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">ID Utente</th>
                    <th scope="col">Nome Utente</th>
                    <th scope="col">Punti</th>
                    <th scope="col">Azioni</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in users" :key="user.id">
                    <td>{{ user.id }}</td>
                    <td>{{ user.name }}</td>
                    <td>{{ user.points }}</td>
                    <td>
                        <button class="btn btn-primary me-2" @click="incrementPoints(user.id)">Incrementa</button>
                        <button class="btn btn-danger" @click="decrementPoints(user.id)">Decrementa</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
  
  
<style scoped>
table {
    width: 100%;
    border-collapse: collapse;
}

th,
td {
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid #ddd;
}

th {
    background-color: #f2f2f2;
}
</style>
  