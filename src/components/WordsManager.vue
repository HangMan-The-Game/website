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

        const uppercaseWord = newWord.value.toUpperCase();
        await addWordToDocument(uppercaseWord, newWordId.toString(), collectionName);
        console.log('Parola aggiunta con successo!');
        newWord.value = '';
        fetchWords();

        nextWordId.value = newWordId + 1;

        // Ordina le parole in base all'ID
        existingWords.push({ id: newWordId, word: uppercaseWord });
        existingWords.sort((a, b) => a.id - b.id);
        words.value = existingWords;
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

const wordsEasy = [
    "ACQUA", "AUTO", "ASTUCCIO", "ASPIRAPOLVERE", "APE", "BICICLETTA", "BORSA", "BOTTIGLIA", "BATTERIA", "BIGLIETTO",
    "PORTAFOGLIO", "CUFFIE", "CANE", "CAMICIA", "CHIAVE", "CANDELA", "DETERSIVO", "DIARIO", "DOLCI", "ERRORE",
    "FRIGORIFERO", "FELPA", "FIORE", "FORNO", "FOTO", "GATTO", "GIORNALE", "GOMMA", "GELATO", "GIOIELLO", "HOTDOG",
    "HOTEL", "IPPOPOTAMO", "IMBUTO", "JEANS", "KETCHUP", "MAIONESE", "LIBRO", "LETTO", "LATTINA", "FOTOCAMERA",
    "MAGLIETTA", "CANOTTIERA", "BARCA", "MATITA", "MOUSE", "MELA", "MACCHINA", "NASTRO", "NUVOLA", "NAVE", "OROLOGIO",
    "OMBRELLO", "OLIO", "MOTO", "OCCHIALI", "PALLA", "ORECCHIO", "BOCCA", "NASO", "OCCHI", "DENTI", "BRACCIO",
    "POLSO", "MANO", "CAPELLI"
];

const wordsMedium = [
    "PROFESSORE", "OPERAIO", "CASALINGA", "MAMMA", "PAPA", "NONNO", "NONNA", "ZIO", "ZIA", "CUGINA", "CUGINO", "NIPOTE",
    "GEMELLI", "PRETE", "TELEVISIONE", "TELECOMANDO", "SPAZZATURA", "BIDONE", "LAVANDINO", "CESTINO", "CIELO", "STELLE",
    "FIORE", "MARGHERITA", "PATATINE", "PANINO", "PASTA", "PENNA", "MATITA", "SPECCHIO", "CASCO", "AEREO", "ELICOTTERO",
    "OSPEDALE", "MUNICIPIO", "BAR", "CARABINIERE", "VIGILE", "POMPIERE", "MEDICO", "CUOCO", "AVVOCATO", "GIUDICE", "CHIESA",
    "VULCANO", "PARCO", "VILLA", "BAMBOLA", "CASTELLO", "SABBIA", "ARMADIO", "SCUOLA", "VASO", "FONTANA", "BALCONE", "CASA",
    "CAFFE’", "GRATTACIELO", "GIRAFFA", "GIACCA"
]

const wordsHard = [
    "CAPPELLO", "PIEDE", "PANCIA", "DITO", "PANTALONI", "PASSEGGINO", "PIUMONE", "QUADERNO", "QUADRO", "QUOTIDIANO", "RASOIO",
    "RADIO", "SMARTPHONE", "CALZE", "SCARPE", "SEDIA", "SAPONE", "SPAZZOLINO", "TASTIERA", "TELEFONO", "TOVAGLIA", "TAZZA",
    "TAPPETO", "UOVO", "UVA", "UCCELLO", "VALIGIA", "VETRO", "VASSOIO", "VINO", "VIDEOCAMERA", "XBOX", "YACHT", "ZAINO",
    "ZUCCHERO", "ZAMPA", "ALLIGATORE", "ELEFANTE", "GATTO", "LEONE", "MUCCA", "SCIMMIE", "SERPENTE", "TIGRE", "VIPERA",
    "BANANA", "DADO", "INVERNO", "LUNA", "MARE", "OMBRELLO", "SOLE", "TAVOLO", "FRAGOLA", "LIMONE", "ROSSO", "VERDE",
    "ALBERO", "PIZZA", "CARBONARA", "DOLCE", "SALATO", "ANTIPASTO", "COLAZIONE", "CENA", "SPINACI", "ROMA",
    "GIUBBOTTO", "ANELLO", "COLLANA", "BRACCIALE", "ORECCHINI", "ARGENTO", "POMODORO"
]

async function importWords(words, collectionName) {

    const uppercaseWord = newWord.value.toUpperCase();
    for (let i = 0; i < words.length; i++) {
        await addWordToDocument(words[i], i + 1, collectionName);
    }
    console.log('Importazione completata con successo!');
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

const showModal = ref(false);

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
        showModal.value = false;
        fetchWords();
    } catch (error) {
        console.error('Errore durante la rimozione delle parole:', error);
    }
}

// onMounted(fetchWords, importWords(wordsHard, "Difficile"));
onMounted(fetchWords);
</script>

<template>
    <div class="container w-75">
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
        <button v-if="words.length > 0" @click="showModal = true" class="btn btn-danger my-3" data-bs-toggle="modal"
            data-bs-target="#confirmDeleteModal">Rimuovi
            Tutto</button>

        <div class="modal fade" id="confirmDeleteModal" tabindex="-1" aria-labelledby="confirmDeleteModalLabel"
            aria-hidden="true" :class="{ 'show': showModal }">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="confirmDeleteModalLabel">Conferma Rimozione Parole</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        Sei sicuro di voler rimuovere tutte le parole?
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annulla</button>
                        <button type="button" class="btn btn-primary" @click="removeAllWords" data-bs-dismiss="modal">Si,
                            sono sicuro</button>
                    </div>
                </div>
            </div>
        </div>

        <ul class="list-group mb-4">
            <li v-for="word in words" :key="word.id"
                class="list-group-item d-flex justify-content-between align-items-center">
                {{ word.word }} ({{ word.id }})
                <button @click="removeWord(word.id.toString())" class="btn btn-danger">Rimuovi</button>
            </li>
        </ul>
    </div>
</template>
  
