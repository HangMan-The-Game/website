<script>
import { collection, getDocs, doc, updateDoc, onSnapshot } from 'firebase/firestore';
import { ref, onMounted, onUnmounted } from 'vue';
import { db, auth } from '@/firebase.js';

export default {
    setup() {
        const users = ref([]);

        const fetchUsers = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'users'));
                users.value = querySnapshot.docs.map((doc) => ({
                    uid: doc.id,
                    ...doc.data(),
                }));
            } catch (error) {
                console.error('Errore durante il recupero degli utenti:', error);
            }
        };

        onMounted(() => {
            fetchUsers();

            const usersCollection = collection(db, 'users');
            const unsubscribe = onSnapshot(usersCollection, (snapshot) => {
                users.value = snapshot.docs.map((doc) => ({
                    uid: doc.id,
                    ...doc.data(),
                }));
            });

            onUnmounted(unsubscribe);
        });

        const updateUserRole = async (userId, role) => {
            const userDoc = doc(db, 'users', userId);
            await updateDoc(userDoc, {
                role,
            });
        };

        return {
            users,
            updateUserRole,
        };
    },
};
</script>

<template>
    <div class="container w-75">
        <h1 class="mt-4">Gestione Utenti</h1>
        <table class="rounded shadow mx-auto table table-hover">
            <thead>
                <tr>
                    <th class="t-lead" scope="col">UID</th>
                    <th class="t-lead" scope="col">Email</th>
                    <th class="t-lead" scope="col">Nickname</th>
                    <th class="t-lead" scope="col">Ruolo</th>
                    <th class="t-lead" scope="col">Azioni</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in users" :key="user.uid">
                    <td class="t-lead">{{ user.uid }}</td>
                    <td class="t-lead">{{ user.mail }}</td>
                    <td class="t-lead">{{ user.name }}</td>
                    <td class="t-lead">
                        <span v-if="user.role === 'admin'">Admin</span>
                        <span v-else-if="user.role === 'user'">Utente</span>
                        <span v-else>{{ user.role }}</span>
                    </td>
                    <td class="t-lead">
                        <button class=" btn btn-primary" @click="updateUserRole(user.uid, 'admin')"
                            v-if="user.role === 'user'">
                            Promuovi ad Admin
                        </button>
                        <button class=" btn btn-secondary" @click="updateUserRole(user.uid, 'user')"
                            v-else-if="user.role === 'admin'">
                            Rimuovi Admin
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>