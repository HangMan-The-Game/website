<template>
    <div class="container">
        <h1 class="mt-4">Gestione Parole</h1>
        <form @submit.prevent="addWord" class="mb-4">
            <div class="input-group">
                <input type="text" class="form-control" v-model="newWord" placeholder="Nuova parola" required>
                <select class="form-control" v-model="selectedCollection">
                    <option value="Facile">Facile</option>
                    <option value="Medio">Medio</option>
                    <option value="Difficile">Difficile</option>
                </select>
                <button type="submit" class="btn btn-primary">Aggiungi parola</button>
            </div>
        </form>

        <ul class="list-group">
            <li v-for="word in words" :key="word.id"
                class="list-group-item d-flex justify-content-between align-items-center">
                {{ word.word }} ({{ word.id }})
                <button @click="removeWord(word.id)" class="btn btn-danger">Rimuovi</button>
            </li>
        </ul>
    </div>
</template>
  
<script setup>
import { db } from '@/firebase.js';
import { collection, addDoc, getDocs, doc, deleteDoc, setDoc } from 'firebase/firestore';
import { ref, onMounted } from 'vue';

const newWord = ref('');
const words = ref([]);
const selectedCollection = ref('Facile');

const nextWordId = ref(1);

async function addWord() {
    try {
        const collectionName = selectedCollection.value; // Nome della collezione
        const documentId = nextWordId.value.toString();

        await addWordToDocument(newWord.value, documentId, collectionName);
        console.log('Parola aggiunta con successo!');
        newWord.value = ''; // Reset del campo di input
        fetchWords(); // Aggiorna l'elenco delle parole

        nextWordId.value++;
    } catch (error) {
        console.error('Errore durante l\'aggiunta della parola:', error);
    }
}

async function addWordToDocument(word, documentId, collectionName) {
    try {
        const wordDocRef = doc(db, collectionName, documentId);
        await setDoc(wordDocRef, { word: word });

        console.log('Parola aggiunta con successo al documento', documentId);
    } catch (error) {
        console.error('Errore durante l\'aggiunta della parola:', error);
    }
}

async function fetchWords() {
    try {
        const wordsCollectionRef = collection(db, selectedCollection.value);
        const querySnapshot = await getDocs(wordsCollectionRef);

        if (querySnapshot.size === 0) {
            console.log('Nessuna parola trovata nella collezione selezionata.');
            nextWordId.value = 1; // Imposta il valore di nextWordId a 1
            return;
        }

        words.value = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }));

        console.log('Parole recuperate:', words.value);

        if (words.value.length > 0) {
            // Recupera l'ultimo ID di parola e incrementa il valore
            const lastWord = words.value[words.value.length - 1];
            nextWordId.value = parseInt(lastWord.id) + 1;
        } else {
            // Non ci sono parole, reimposta il valore di nextWordId a 1
            nextWordId.value = 1;
        }
    } catch (error) {
        console.error('Errore durante il recupero delle parole:', error);
    }
}


async function removeWord(wordId) {
    try {
        const collectionName = selectedCollection.value;
        const wordDocRef = doc(db, collectionName, wordId);
        await deleteDoc(wordDocRef);
        console.log('Parola rimossa con successo!');
        fetchWords(); // Aggiorna l'elenco delle parole
    } catch (error) {
        console.error('Errore durante la rimozione della parola:', error);
    }
}

onMounted(fetchWords); // Recupera le parole all'avvio del componente
</script>
