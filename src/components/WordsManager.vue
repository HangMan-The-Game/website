<template>
    <div class="container">
        <h1 class="mt-4">Gestione Parole</h1>
        <form @submit.prevent="addWord" class="mb-4">
            <div class="input-group">
                <input type="text" class="form-control" v-model="newWord" placeholder="Nuova parola" required>
                <button type="submit" class="btn btn-primary">Aggiungi parola</button>
            </div>
        </form>

        <ul class="list-group">
            <li v-for="word in words" :key="word.id"
                class="list-group-item d-flex justify-content-between align-items-center">
                {{ word.word }}
                <button @click="removeWord(word.id)" class="btn btn-danger">Rimuovi</button>
            </li>
        </ul>
    </div>
</template>
  
<script setup>
import { db } from '@/firebase.js';
import { collection, addDoc, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { ref, onMounted } from 'vue';

const newWord = ref('');
const words = ref([]);

async function addWord() {
    try {
        const wordsCollectionRef = collection(db, 'words');
        await addDoc(wordsCollectionRef, { word: newWord.value });
        console.log('Parola aggiunta con successo!');
        newWord.value = ''; // Reset del campo di input
        fetchWords(); // Aggiorna l'elenco delle parole
    } catch (error) {
        console.error('Errore durante l\'aggiunta della parola:', error);
    }
}

async function fetchWords() {
    try {
        const wordsCollectionRef = collection(db, 'words');
        const querySnapshot = await getDocs(wordsCollectionRef);

        words.value = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }));

        console.log('Parole recuperate:', words.value);
    } catch (error) {
        console.error('Errore durante il recupero delle parole:', error);
    }
}

async function removeWord(wordId) {
    try {
        const wordDocRef = doc(db, 'words', wordId);
        await deleteDoc(wordDocRef);
        console.log('Parola rimossa con successo!');
        fetchWords(); // Aggiorna l'elenco delle parole
    } catch (error) {
        console.error('Errore durante la rimozione della parola:', error);
    }
}

onMounted(fetchWords); // Recupera le parole all'avvio del componente
</script>
  