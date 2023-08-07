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
    "ACQUA", "AUTO", "ASTUCCIO", "ASPIRAPOLVERE", "APE", "BICICLETTA", "BORSA", "BOTTIGLIA", "BATTERIA", "BIGLIETTO", "BORSELLINO", "COMPUTER",
    "CUFFIE", "CANE", "CAMICIA", "CHIAVE", "CANDELA", "DIVANO", "DOCUMENTO", "DIPINTO", " DETERSIVO", "DIARIO", "DOLCI", "ERBA", "EDIFICIO", "ERRORE",
    "FRIGORIFERO", "FELPA", "FIORE", "FORNO", "FUMETTO", "FOTO", "GATTO", "GIORNALE", "GOMMA", "GIACCA", "GELATO", "GIOIELLO", "HOTDOG", "HOTEL",
    "INDUMENTI", "IGIENE", "IPPOPOTAMO", "IMBUTO", "JEANS", "KETCHUP", "LIBRO", "LAMPADA", "LETTO", "LATTINA", "LUCCHETTO", "FOTOCAMERA", "MAGLIETTA",
    "CANOTTIERA", "BARCA", "MATITA", "MOUSE", "MELA", "MACCHINA", "NASTRO", "NIDO", "MOTORINO", "NUVOLA", "NAVE", "OROLOGIO", "OMBRELLO", "OLIO",
    "ORECCHINI", "MOTO", "OCCHIALI", "PENNA", "PALLA", "ORECCHIO", "BOCCA", "NASO", "OCCHI", "DENTI", "BRACCIO", "POLSO", "MANO", "CAPELLI",
    "CAPPELLI", "PIEDE", "GINOCCHIO", "GAMB∑", "PETTO", "PANCIA", "DITO", "PANTALONI", "PASSEGGINO", "PIUMONE", "PORTAFOGLIO", "QUADERNO",
    "QUADRO", "QUOTIDIANO", "QUAD", "RASOIO", "RADIO", "RETE", "RACCOGLITORE", "RITRATTO", "RIVISTA", "SMARTPHONE", "CALZE", "SCARPE",
    "SEDIA", "STIVALI", "SAPONE", "SPAZZOLINO", "TASTIERA", "TELEFONO", "TOVAGLIA", "TAZZA", "TAPPETO", "TACCUINO", "UOVO", "UVA", "UCCELLO",
    "UNICORNO", "VESTITO", "VALIGIA", "VETRO", "VASSOIO", "VINO", "VIDEOCAMERA", "WAFFLE", "XILOFONO", "XBOX", "YACHT", "ZAINO", "ZUCCHERO",
    "ZAMPA", "ZANZARIERA", "ZUCCHERIERA", "ALLIGATORE", "BALENA", "CAPRA", "DELFINO", "ELEFANTE", "FOCA", "GATTO", "IENA", "KOALA", "LEONE",
    "MOSCA", "MUCCA", "ORSO", "PUMA", "RANA", "SCIMMIA", "SERPENTE", "TIGRE", "UCCELLO", "VIPERA", "AMORE", "BANANA", "DADO", "FARFALLA",
    "INVERNO", "JOLLY", "KIWI", "LUNA", "MARE", "OMBRELLO", "PANE", "QUOTA", "SOLE", "TAVOLO", "VENTO", "ZUCCA", "ALBICOCCA", "FRAGOLA", "LIMONE",
    "PERE", "ARANCIA", "MELONE", "CILIEGIA", "ANGURIA", "MANDARINO", "BLU", "FUCSIA", "GIALLO", "NERO", "ORO", "LAVANDA", "MAGENTA", "ROSSO",
    "VERDE", "VIOLA", "ZAFFERANO", "ALBERO", "RISO", "HAMBURGER", "ZUPPA", "SPAGHETTI", "LASAGNE", "MINESTRA", "GNOCCHI", "INSALATA", "PIZZA",
    "CARBONARA", "DOLCE", "SALATO", "CREPES", "VERDURE", "ANTIPASTO", "PRANZO", "CENA", "MERENDA", "SPINACI", "BARCELLONA", "FIRENZE",
    "MADRID", "NAPOLI", "ROMA", "SYDNEY", "TOKYO", "VENEZIA", "NEWYORK", "LONDRA", "MILANO", "TORINO", "PALERMO", "CATANIA", "OCCHIALI",
    "CATENA", "GIUBBOTTO", "ANELLO", "COLLANA", "BRACCIALE", "ORECCHINI", "ORO", "ARGENTO", "POMODORO", "PROFESSORE", "OPERAIO",
    "CASALINGA", "MAMMA", "PAPA", "NONNO", "NONNA", "ZIO", "ZIA", "CUGINA", "CUGINO", "NIPOTE", "FRATELLO", "SORELLA", "GEMELLI",
    "FIGLIO", "FIGLIA", "MADRINA", "PADRINO", "PRETE", "TELEVISIONE", "TELECOMANDO", "MONITOR", "SPAZZATURA", "BIDONE", "LAVANDINO",
    "CESTINO", "CIELO", "STELLE", "PIANETA", "TERRA", "MARTE", "SATURNO", "VENERE", "GIOVE", "PRATO", "FIORE", "ROSA", "MARGHERITA",
    "PATATINE", "PANINO", "PASTA", "PENNA", "MATITA", "GOMMA", "POSTER", "INSTAGRAM", "FACEBOOK", "YOUTUBE", "SNAPCHAT", "WHATSAPP",
    "SPECCHIO", "CASCO", "ZAINO", "AEREO", "ELICOTTERO", "OSPEDALE", "MUNICIPIO", "BAR", "POLIZIA", "CARABINIERE", "VIGILE", "POMPIERE",
    "MEDICO", "CUOCO", "MURATORE", "AVVOCATO", "GIUDICE", "CHIESA", "VULCANO", "PARCO", "VILLA", "BAMBOLA", "CASTELLO", "SABBIA", "ARMADIO",
    "SCUOLA", "VASO", "FONTANA", "BALCONE", "CASA", "TIKTOK", "CAFFE", "GRATTACIELO", "GIRAFFA"
];

const wordsMedium = [
    "ACCADEMIA", "ANTARTIDE", "ABBIGLIAMENTO", "ANOMALIA", "ABITAZIONE", "ATROCE", "BIBLIOTECA", "BAMBINO", "BATTAGLIA", "BRAVURA", "BENIGNO",
    "CONOSCENZA", "COLLABORAZIONE", "CULTURA", "CORAGGIO", "COLLOQUIO", "CREDENZA", "DESTINAZIONE", "DEMOCRAZIA", "DILEMMA", "EREDITA", "ENERGIA",
    "FANTASIA", "FRUSTRAZIONE", "FISICA", "FASCINO", "GRAVITA", "GENTILEZZA", "GROTTA", "GRAZIA", "GIUSTIZIA", "HABITAT", "HORROR", "IDENTITA",
    "INNOVAZIONE", "IMMAGINAZIONE", "INCUBO", "INFLUENZA", "INGIUSTIZIA", "DOCUMENTO", "FILM", "KARAOKE", "KARMA", "LIBERTA", "LUMINOSITA",
    "LEGGENDA", "LUSSURIA", "LAVORATORE", "LUCE", "MERAVIGLIA", "MENTE", "MATERIA", "MEMORIA", "MALATTIA", "MISTERO", "NATURA", "NOSTALGIA",
    "NORMALE", "NOTTE", "NECESSITA", "NOVITA", "SERIE", "OCCASIONE", "OPPORTUNITA", "OSSERVAZIONE", "ONESTA", "ORIGINE", "OSPITALITA", "PASSIONE",
    "PAZIENZA", "POTENZA", "PROBLEMA", "PERICOLO", "PREOCCUPAZIONE", "QUALITA", "RISPETTO", "RELAZIONE", "RICCHEZZA", "RICERCA", "RIFLESSIONE",
    "SAGGEZZA", "SIMPATIA", "SPERANZA", "SALUTE", "OSTENIBILITA", "TOLLERANZA", "TRASPARENZA", "TEMPO", "TECNOLOGIA", "TENSIONE", "TRISTEZZA",
    "UNIVERSITA", "UNIONE", "UMILTA", "UFFICIO", "UMANITA", "UGUAGLIANZA", "VALORE", "VISIONE", "VIAGGIO", "VIBRANTE", "WEB", "WEEKEND", "YOGA",
    "YACHT", "YELLOW", "ZEN", "ZAFFIRO", "ZONA", "ZERO", "ZEBRA", "INDACO", "ULIVO", "MAGENTA", "QUERCIA", "CAMMELLO", "CUSCINO", "DIZIONARIO",
    "PIANOFORTE", "CUSCINO", "SCOPA", "NAVIGATORE", "APPLE", "GOOGLE", "SAMSUNG", "VOLPE", "TARTARUGA", "RINOCERONTE", "QUAGLIA", "COCCODRILLO",
    "GAZZELLA", "GIAGUARO", "KANGURO", "ANANAS", "DATTERO", "OLIVA", "VANIGLIA", "ZENZERO", "PAPRIKA", "FICO", "AMSTERDAM", "GINEVRA", "NEWCASTLE",
    "QUEBEC", "VALENCIA", "YORK", "FRANCOFORTE", "DUBLINO", "EDIMBURGO", "HELSINKI", "COSTARICA", "GIORDANIA", "QATAR", "UGANDA", "NIGERIA",
    "LETTONIA", "ITALIA", "INDONESIA", "DANIMARCA", "GRECIA", "TUNISIA", "VENENZUELA", "ITALIA", "VANCOUVER", "HOLLYWOOD", "BIGLIARDO", "DOMINO",
    "MONOPOLY", "SCACCHI", "POKER", "SPIAGGIA", "ABITUDINE", "UNIVERSALE", "LAVORATORE", "MAGAZINO", "DOMESTICO", "CALCOLATRICE", "LAVAGNA",
    "TAGLIERINO", "SCRIVANI", "TRIBUNALE", "FARMACIA", "SUPERMERCATO", "ZOO", "MUSEO", "PISCINA", "TEATRO", "CINEMA", "DISCOTECA", "REPARTO",
    "CIMITERO", "SEGNALE", "ROUTER", "WIFI", "CHIMICA", "AULA", "GEOMETRIA", "ORIENTAMENTO", "VALUTAZIONE", "RICERCA", "MATEMATICA", "BIOLOGIA",
    "ESAME", "FORMAZIONE", "LABORATORIO", "BELLO", "BRUTT", "INDIRIZZO", "ANIMA", "PROFILO", "ESPRESSIONE", "PARTY", "SERRANDA", "SOGGIORNO",
    "BLATERARE", "OTTUSO", "PROCRASTINARE", "LAPTOP", "WEBCAM", "MONITO", "BILANCIA", "CANOA", "CENERENTOLA", "PAZIENTE", "RICOVERO", "PRONTO",
    "CAFFETTIERA", "MICROONDE", "TOSTAPANE", "LAVASTOVIGLIE", "FINESTRA"
]


const wordsHard = [
    "ACULEO", "LAPSUS", "ALLUVIONE", "BISBIGLIO", "BLASFEMO", "CAMALEONTE", "CAMUFFARE", "CANAGLIA", "CANCELLARE", "SCRUTINIO", "CAPILLARE",
    "CAPRICCIOSO", "BACKUP", "DEGLUTIRE", "DEGRADARE", "DEPRECARE", "DERIVA", "DESOLANTE", "PASSWORD", "UGUAGLIANZA", "DOLOSO", "DOMARE",
    "ECO", "EDUCARE", "EFFERVESCENTE", "EGOISMO", "ELEGANTE", "ELOGIO", "EMBRIONE", "EMPATIA", "ENCEFALO", "ENIGMA", "DISTINTIVO", "LEGGENDA",
    "MIRACOLOSO", "PASSWORD", "MISTICO", "TRASCENDENTE", "UMANITA", "RASTRELLO", "INTERFONO", "MUTUO", "DISPENSER", "PROFETA", "RIDONDANTE",
    "TRAMORTIRE", "MONARCA", "MONETIZZARE", "SISTEMATICO", "DISTILLATORE"
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
  
