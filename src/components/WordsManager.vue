<script setup>
import { db } from '@/firebase.js';
import { collection, addDoc, getDocs, doc, deleteDoc, setDoc } from 'firebase/firestore';
import { ref, onMounted } from 'vue';
import { watch } from 'vue';

const newWord = ref('');
const words = ref([]);
const selectedCollection = ref('Facile');


watch(selectedCollection, () => {
    fetchWords();
});

const nextWordId = ref("1");

async function addWord() {
    try {
        const collectionName = selectedCollection.value;
        const documentId = nextWordId.value;

        await addWordToDocument(newWord.value, documentId, collectionName);
        console.log('Parola aggiunta con successo!');
        newWord.value = '';
        fetchWords();

        nextWordId.value++;
    } catch (error) {
        console.error('Errore durante l\'aggiunta della parola:', error);
    }
}

async function addWordToDocument(word, documentId, collectionName) {
    try {
        const wordDocRef = doc(db, collectionName, documentId.toString());
        await setDoc(wordDocRef, { word: word });

    } catch (error) {
        console.error('Errore durante l\'aggiunta della parola:', error);
    }
}

async function fetchWords() {
    try {
        const wordsCollectionRef = collection(db, selectedCollection.value);
        const querySnapshot = await getDocs(wordsCollectionRef);

        if (querySnapshot.empty) {
            console.log('Nessuna parola trovata nella collezione selezionata.');
            nextWordId.value = 1;
            words.value = [];
        } else {
            words.value = querySnapshot.docs
                .map((doc) => ({
                    id: parseInt(doc.id),
                    ...doc.data()
                }))
                .sort((a, b) => a.id - b.id);


            console.log('Parole recuperate:', words.value);

            if (words.value.length > 0) {
                const lastWord = words.value.reduce((prev, current) => (prev.id > current.id) ? prev : current);
                nextWordId.value = lastWord.id + 1;
            } else {
                nextWordId.value = 1;
            }
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
        fetchWords();
    } catch (error) {
        console.error('Errore durante la rimozione della parola:', error);
    }
}

onMounted(fetchWords);
</script>

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
                <button @click="removeWord(word.id.toString())" class="btn btn-danger">Rimuovi</button>
            </li>
        </ul>
    </div>
</template>
