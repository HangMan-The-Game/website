<template>
    <div class="container my-5">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card text-center">
                    <div class="card-body">
                        <h3 class="card-title">MakerFaire</h3>
                        <div class="mb-3">
                            <input v-model="nickname" class="form-control" placeholder="Inserisci il tuo nickname" />
                        </div>
                        <div class="mb-3">
                            <label for="pointsInput">Quanti punti desideri aggiungere?</label>
                            <input v-model="pointsToAdd" type="number" id="pointsInput" class="form-control" />
                        </div>
                        <button @click="addOnePoint" class="btn btn-primary me-2">+1</button>
                        <button @click="addThreePoints" class="btn btn-success">+3</button>
                        <p class="mt-3">Punti selezionati: {{ selectedPoints }}</p>
                        <p v-if="userExists" class="text-danger">Il nome utente esiste già. Il nuovo nome sarà: {{
                            newNickname }}</p>
                        <p v-if="isSameUsername && !submitted" class="text-danger">Il nome utente è lo stesso. Il nuovo nome
                            sarà: {{
                                newNicknameWithNumber }}</p>
                        <button @click="submitPoints" class="btn btn-primary btn-block">Aggiungi Punti</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import { doc, setDoc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase.js';

const nickname = ref('');
const pointsToAdd = ref(0);
const selectedPoints = ref(0);
const userExists = ref(false);
const newNickname = ref('');
const isSameUsername = ref(false);
const newNicknameWithNumber = ref('');
const submitted = ref(false);

const addOnePoint = () => {
    pointsToAdd.value += 1;
    selectedPoints.value = pointsToAdd.value;
};

const addThreePoints = () => {
    pointsToAdd.value += 3;
    selectedPoints.value = pointsToAdd.value;
};


const checkUserExists = async () => {
    const userDocPath = `MakerBoard/${nickname.value}`;
    const userDocRef = doc(db, userDocPath);

    try {
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
            userExists.value = true;
            let count = 1;
            while (userExists.value) {
                const newNicknameAttempt = `${nickname.value}${count}`;
                const newDocPath = `MakerBoard/${newNicknameAttempt}`;
                const newDocRef = doc(db, newDocPath);
                const newDocSnapshot = await getDoc(newDocRef);
                if (!newDocSnapshot.exists()) {
                    userExists.value = false;
                    newNickname.value = newNicknameAttempt;
                } else {
                    count++;
                }
            }
        } else {
            userExists.value = false;
            newNickname.value = nickname.value;
        }
    } catch (error) {
        console.error('Errore nel recupero dell\'utente:', error);
    }
};

watchEffect(() => {
    checkUserExists();
});


const submitPoints = async () => {
    const userDocPath = `MakerBoard/${newNickname.value}`;
    const userDocRef = doc(db, userDocPath);

    try {
        if (userExists.value) {
            if (newNickname.value !== nickname.value) {
                await updateDoc(userDocRef, {
                    punti: pointsToAdd.value,
                });
                console.log('Utente esistente: Punti aggiornati con successo!');
                isSameUsername.value = false;
                submitted.value = true;
            } else {
                console.log('Il nome utente è lo stesso. Non è necessario aggiornare i punti.');
                isSameUsername.value = true;
                newNicknameWithNumber.value = `${newNickname.value}${pointsToAdd.value}`;
            }
        } else {
            await setDoc(userDocRef, {
                punti: pointsToAdd.value,
            });
            console.log('Nuovo utente creato con punti!');
            isSameUsername.value = false;
            newNicknameWithNumber.value = newNickname.value;
            submitted.value = true;
        }
    } catch (error) {
        console.error('Errore nell\'aggiornamento dei punti:', error);
    }

    nickname.value = '';
    pointsToAdd.value = 0;
    selectedPoints.value = 0;
};
</script>