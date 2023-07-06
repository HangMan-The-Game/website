<script setup>
import { db } from '@/firebase.js';
import { collection, addDoc, getDocs, doc, deleteDoc, setDoc, writeBatch } from 'firebase/firestore';
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
        const wordsCollectionRef = collection(db, collectionName);

        const querySnapshot = await getDocs(wordsCollectionRef);
        const existingWords = querySnapshot.docs.map((doc) => ({
            id: parseInt(doc.id),
            word: doc.data().word
        }));

        let newWordId = 1;
        while (existingWords.some((word) => word.id === newWordId)) {
            newWordId++;
        }

        const lastWord = existingWords.reduce((prev, current) => (prev.id > current.id) ? prev : current);
        if (newWordId > lastWord.id + 1) {
            newWordId = lastWord.id + 1;
        }

        await addWordToDocument(newWord.value, newWordId.toString(), collectionName);
        console.log('Parola aggiunta con successo!');
        newWord.value = '';
        fetchWords();

        nextWordId.value = newWordId + 1;
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

/* const wordsToImport = [
    "ACQUA", "AUTO", "ASTUCCIO", "ASPIRAPOLVERE", "APE", "BICICLETTA", "BORSA", "BOTTIGLIA", "BATTERIA", "BIGLIETTO",
    "PORTAFOGLIO", "CUFFIE", "CANE", "CAMICIA", "CHIAVE", "CANDELA", "DETERSIVO", "DIARIO", "DOLCI", "ERRORE",
    "FRIGORIFERO", "FELPA", "FIORE", "FORNO", "FOTO", "GATTO", "GIORNALE", "GOMMA", "GELATO", "GIOIELLO", "HOTDOG",
    "HOTEL", "IPPOPOTAMO", "IMBUTO", "JEANS", "KETCHUP", "MAIONESE", "LIBRO", "LETTO", "LATTINA", "FOTOCAMERA",
    "MAGLIETTA", "CANOTTIERA", "BARCA", "MATITA", "MOUSE", "MELA", "MACCHINA", "NASTRO", "NUVOLA", "NAVE", "OROLOGIO",
    "OMBRELLO", "OLIO", "MOTO", "OCCHIALI", "PALLA", "ORECCHIO", "BOCCA", "NASO", "OCCHI", "DENTI", "BRACCIO",
    "POLSO", "MANO", "CAPELLI"
]; */

/* async function importWords(words, collectionName) {
    const batch = writeBatch(db);

    for (let i = 0; i < words.length; i++) {
        const word = words[i];
        const wordDocRef = doc(collection(db, collectionName), i.toString());
        const wordData = {
            id: i + 1,
            word: word
        };

        batch.set(wordDocRef, wordData);
    }

    await batch.commit();
    console.log('Importazione completata con successo!');
} */

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

async function removeAllWords() {
    try {
        const collectionName = selectedCollection.value;
        const wordsCollectionRef = collection(db, collectionName);

        const querySnapshot = await getDocs(wordsCollectionRef);

        const batch = writeBatch(db);
        querySnapshot.forEach((docs) => {
            const wordDocRef = doc(db, collectionName, docs.id);
            batch.delete(wordDocRef);
        });

        await batch.commit();
        console.log('Tutte le parole sono state rimosse con successo!');
        fetchWords();
    } catch (error) {
        console.error('Errore durante la rimozione delle parole:', error);
    }
}


// onMounted(fetchWords, importWords(wordsToImport, "Facile"));
onMounted(fetchWords);
</script>

<template>
    <div class="container w-50">
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

        <p v-if="words.length === 0">Nessuna parola trovata.</p>
        <p v-else>Numero di parole: {{ words.length }}</p>
        <button @click="removeAllWords" class="btn btn-danger my-3">Rimuovi Tutto</button>

        <ul class="list-group mb-4">
            <li v-for="word in words" :key="word.id"
                class="list-group-item d-flex justify-content-between align-items-center">
                {{ word.word }} ({{ word.id }})
                <button @click="removeWord(word.id.toString())" class="btn btn-danger">Rimuovi</button>
            </li>
        </ul>
    </div>
</template>
  
