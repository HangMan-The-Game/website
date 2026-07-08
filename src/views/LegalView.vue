<script setup>
import { computed, watch } from "vue";

const props = defineProps({
  documentType: {
    type: String,
    required: true,
  },
  locale: {
    type: String,
    default: "English",
  },
});

const locale = computed(() => props.locale);
const isItalian = computed(() => locale.value === "Italiano");

const documents = {
  Italiano: {
    privacy: {
      icon: "bi-shield-lock",
      kicker: "Dati personali",
      title: "Privacy Policy",
      lead: "Come HangMan - The Game tratta i dati necessari per account, partita, statistiche e classifica.",
    },
    cookies: {
      icon: "bi-pie-chart-fill",
      kicker: "Tecnologie locali",
      title: "Cookie Policy",
      lead: "Quali memorie tecniche usa il sito e quando può essere attivata la misurazione con Firebase Analytics.",
    },
    terms: {
      icon: "bi-file-earmark-text",
      kicker: "Regole del servizio",
      title: "Termini e condizioni",
      lead: "Le condizioni per usare il sito, creare un account e partecipare alla classifica di HangMan.",
    },
  },
  English: {
    privacy: {
      icon: "bi-shield-lock",
      kicker: "Personal data",
      title: "Privacy Policy",
      lead: "How HangMan - The Game handles the data needed for accounts, gameplay, statistics and rankings.",
    },
    cookies: {
      icon: "bi-pie-chart-fill",
      kicker: "Local technologies",
      title: "Cookie Policy",
      lead: "Which technical storage the site uses and when Firebase Analytics measurement may be enabled.",
    },
    terms: {
      icon: "bi-file-earmark-text",
      kicker: "Service rules",
      title: "Terms and conditions",
      lead: "The rules for using the site, creating an account and joining the HangMan leaderboard.",
    },
  },
};

const ui = computed(() => isItalian.value
  ? {
      updated: "Ultimo aggiornamento: 8 luglio 2026",
      navLabel: "Documenti legali",
      navTitle: "Centro legale",
      terms: "Termini",
      specific: "Specifico per HangMan",
      readable: "Linguaggio chiaro",
      available: "Sempre consultabile",
    }
  : {
      updated: "Last updated: July 8, 2026",
      navLabel: "Legal documents",
      navTitle: "Legal center",
      terms: "Terms",
      specific: "Built for HangMan",
      readable: "Plain language",
      available: "Always available",
    });

const currentDocument = computed(() => {
  const localizedDocuments = documents[locale.value] || documents.English;
  return localizedDocuments[props.documentType] || localizedDocuments.privacy;
});

watch(currentDocument, (documentCopy) => {
  document.title = `${documentCopy.title} | HangMan - The Game`;
  const description = document.querySelector('meta[name="description"]');

  if (description) {
    description.setAttribute("content", documentCopy.lead);
  }
}, { immediate: true });

const openCookieSettings = () => {
  window.dispatchEvent(new CustomEvent("hm:open-cookie-settings"));
};
</script>

<template>
  <main class="legal-page">
    <header class="legal-hero">
      <div class="container">
        <div class="legal-hero-icon" aria-hidden="true"><i class="bi" :class="currentDocument.icon"></i></div>
        <span class="section-kicker">{{ currentDocument.kicker }}</span>
        <h1>{{ currentDocument.title }}</h1>
        <p>{{ currentDocument.lead }}</p>
        <span class="legal-date"><i class="bi bi-clock-history"></i> {{ ui.updated }}</span>
        <div class="legal-highlights" aria-hidden="true">
          <span><i class="bi bi-controller"></i> {{ ui.specific }}</span>
          <span><i class="bi bi-chat-left-text"></i> {{ ui.readable }}</span>
          <span><i class="bi bi-link-45deg"></i> {{ ui.available }}</span>
        </div>
      </div>
    </header>

    <div class="container legal-layout">
      <nav class="legal-nav" :aria-label="ui.navLabel">
        <span class="legal-nav-title">{{ ui.navTitle }}</span>
        <RouterLink to="/privacy-policy"><span class="legal-nav-icon"><i class="bi bi-shield-lock"></i></span> Privacy Policy</RouterLink>
        <RouterLink to="/cookie-policy"><span class="legal-nav-icon"><i class="bi bi-pie-chart-fill"></i></span> Cookie Policy</RouterLink>
        <RouterLink to="/terms"><span class="legal-nav-icon"><i class="bi bi-file-earmark-text"></i></span> {{ ui.terms }}</RouterLink>
      </nav>

      <template v-if="isItalian">
      <article v-if="documentType === 'privacy'" class="legal-content">
        <section>
          <span class="legal-number">01</span>
          <div>
            <h2>Chi siamo e cos'è HangMan</h2>
            <p>
              <strong>HangMan - The Game</strong> è un progetto didattico sviluppato da un gruppo di studenti
              dell'ITET Rapisardi - Da Vinci. Reinterpreta il gioco dell'impiccato attraverso una web app e un
              prototipo fisico: il giocatore prova a indovinare una parola e, a ogni errore, una parte di Hangy cade.
            </p>
            <p>
              Il trattamento dei dati del sito è gestito dal team del progetto HangMan - The Game. Per richieste
              relative alla privacy è disponibile il
              <a href="https://www.instagram.com/hangmanit_/" target="_blank" rel="noreferrer">profilo Instagram ufficiale</a>.
            </p>
          </div>
        </section>

        <section>
          <span class="legal-number">02</span>
          <div>
            <h2>Dati trattati</h2>
            <div class="legal-table-wrap">
              <table class="legal-table">
                <thead>
                  <tr><th>Categoria</th><th>Dati</th><th>Perché vengono usati</th></tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Account</td>
                    <td>Email, username, identificativo Firebase, stato di verifica e ruolo</td>
                    <td>Registrazione, accesso, sicurezza, recupero password e funzioni riservate</td>
                  </tr>
                  <tr>
                    <td>Gioco</td>
                    <td>Punti, vittorie, partite, miglior punteggio e streak</td>
                    <td>Salvare i progressi, mostrare le statistiche e costruire la classifica</td>
                  </tr>
                  <tr>
                    <td>Preferenze</td>
                    <td>Lingua, tema, difficoltà e scelta privacy</td>
                    <td>Ricordare le impostazioni richieste sul dispositivo</td>
                  </tr>
                  <tr>
                    <td>Tecnici</td>
                    <td>Indirizzo IP, browser, dispositivo, data e log di sicurezza</td>
                    <td>Fornire il sito, prevenire abusi e diagnosticare errori</td>
                  </tr>
                  <tr>
                    <td>Analytics opzionali</td>
                    <td>Identificatori, sessioni, interazioni, dispositivo e area geografica approssimativa</td>
                    <td>Misurare in forma statistica come viene usato il progetto, solo dopo consenso</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p class="legal-note">
              <i class="bi bi-eye"></i>
              La leaderboard può mostrare pubblicamente <strong>username, ruolo, punti, vittorie e posizione</strong>.
              Email e password non vengono mostrate nella classifica. Le password sono gestite da Firebase
              Authentication e non vengono salvate nei documenti pubblici del database del gioco.
            </p>
          </div>
        </section>

        <section>
          <span class="legal-number">03</span>
          <div>
            <h2>Finalità e basi giuridiche</h2>
            <ul>
              <li><strong>Esecuzione del servizio richiesto:</strong> creare e gestire l'account, avviare le partite, salvare progressi e mostrare la classifica.</li>
              <li><strong>Obblighi legali:</strong> rispondere a richieste legittime e adempiere agli obblighi applicabili.</li>
              <li><strong>Legittimo interesse:</strong> proteggere account, infrastruttura e database da abusi, frodi o accessi non autorizzati.</li>
              <li><strong>Consenso:</strong> attivare Google Analytics for Firebase. Il consenso è facoltativo e revocabile in ogni momento.</li>
            </ul>
          </div>
        </section>

        <section>
          <span class="legal-number">04</span>
          <div>
            <h2>Fornitori e trasferimenti</h2>
            <p>
              Il progetto utilizza <strong>Google Firebase</strong> per autenticazione, database Cloud Firestore e,
              solo previo consenso, Analytics. Google opera generalmente come responsabile del trattamento per i
              dati affidati dal progetto. Firebase Authentication è erogato anche attraverso infrastrutture negli
              Stati Uniti; altri servizi Firebase possono usare infrastrutture globali. I trasferimenti sono gestiti
              da Google tramite i meccanismi previsti dalla normativa applicabile, inclusi termini di trattamento e
              clausole contrattuali standard quando necessarie.
            </p>
            <p>
              Il provider che pubblica il sito può trattare log tecnici indispensabili. I link verso Instagram,
              GitHub, X/Twitter, LinkedIn o il sito scolastico portano a servizi esterni: i relativi fornitori trattano
              dati secondo le proprie informative quando l'utente decide di visitarli.
            </p>
            <div class="legal-links">
              <a href="https://firebase.google.com/support/privacy" target="_blank" rel="noreferrer">Privacy e sicurezza Firebase <i class="bi bi-box-arrow-up-right"></i></a>
              <a href="https://firebase.google.com/terms/data-processing-terms/" target="_blank" rel="noreferrer">Termini sul trattamento Firebase <i class="bi bi-box-arrow-up-right"></i></a>
            </div>
          </div>
        </section>

        <section>
          <span class="legal-number">05</span>
          <div>
            <h2>Conservazione</h2>
            <p>
              I dati dell'account e di gioco vengono conservati finché l'account rimane attivo o finché sono
              necessari per fornire le funzioni richieste. In caso di richiesta di cancellazione, i dati vengono
              rimossi o anonimizzati compatibilmente con obblighi legali, sicurezza e tempi tecnici di backup.
              Le preferenze locali restano sul dispositivo fino alla cancellazione da parte dell'utente; la scelta
              cookie viene richiesta nuovamente dopo sei mesi. I dati Analytics seguono i tempi configurati nel
              servizio e vengono conservati solo per il periodo necessario a produrre statistiche sul progetto.
            </p>
          </div>
        </section>

        <section>
          <span class="legal-number">06</span>
          <div>
            <h2>Diritti dell'utente</h2>
            <p>
              L'utente può chiedere accesso, rettifica, cancellazione, limitazione, portabilità e opposizione nei
              casi previsti dal GDPR. Può inoltre revocare il consenso Analytics senza conseguenze sulla possibilità
              di giocare. Per esercitare i diritti può contattare il team tramite il profilo ufficiale indicato sopra.
              È sempre possibile proporre reclamo al
              <a href="https://www.garanteprivacy.it/" target="_blank" rel="noreferrer">Garante per la protezione dei dati personali</a>.
            </p>
            <button class="btn btn-outline-primary" type="button" @click="openCookieSettings">
              <i class="bi bi-sliders"></i> Gestisci preferenze cookie
            </button>
          </div>
        </section>

        <section>
          <span class="legal-number">07</span>
          <div>
            <h2>Minori, sicurezza e aggiornamenti</h2>
            <p>
              Per gli utenti di età inferiore a 14 anni, l'uso delle funzioni che richiedono il trattamento basato
              sul consenso deve avvenire con l'autorizzazione di chi esercita la responsabilità genitoriale. Il team
              adotta misure ragionevoli per proteggere account e dati, ma nessun sistema online può garantire un
              rischio pari a zero. Questa informativa può essere aggiornata quando cambiano funzioni, fornitori o
              obblighi normativi; la data in alto identifica la versione corrente.
            </p>
          </div>
        </section>
      </article>

      <article v-else-if="documentType === 'cookies'" class="legal-content">
        <section>
          <span class="legal-number">01</span>
          <div>
            <h2>Cosa usa davvero il sito</h2>
            <p>
              HangMan utilizza cookie e tecnologie equivalenti, come <strong>localStorage</strong> e
              <strong>IndexedDB</strong>. Alcune sono necessarie per mantenere il login, ricordare lingua, tema,
              difficoltà e risultati locali. Non vengono usati cookie pubblicitari o sistemi di profilazione commerciale.
            </p>
            <p>
              La misurazione con Google Analytics for Firebase è opzionale: rimane bloccata prima della scelta e
              viene attivata soltanto selezionando “Accetta tutti” o abilitando la categoria Analytics.
            </p>
          </div>
        </section>

        <section>
          <span class="legal-number">02</span>
          <div>
            <h2>Strumenti tecnici necessari</h2>
            <div class="legal-table-wrap">
              <table class="legal-table">
                <thead><tr><th>Nome o area</th><th>Funzione</th><th>Durata indicativa</th></tr></thead>
                <tbody>
                  <tr><td><code>hm-cookie-consent</code></td><td>Memorizza la scelta privacy e la relativa versione</td><td>6 mesi</td></tr>
                  <tr><td><code>lang</code></td><td>Ricorda la lingua selezionata</td><td>Fino alla cancellazione</td></tr>
                  <tr><td><code>vueuse-color-scheme</code></td><td>Ricorda tema chiaro o scuro</td><td>Fino alla cancellazione</td></tr>
                  <tr><td><code>selectedMode</code></td><td>Ricorda la difficoltà di gioco</td><td>Fino alla cancellazione</td></tr>
                  <tr><td><code>punti</code>, <code>vittorie</code></td><td>Mantiene un riscontro locale dei risultati</td><td>Fino alla cancellazione o aggiornamento</td></tr>
                  <tr><td>Firebase Authentication</td><td>Mantiene la sessione dell'account e i token di sicurezza</td><td>Fino al logout, revoca o scadenza tecnica</td></tr>
                </tbody>
              </table>
            </div>
            <p>
              Questi strumenti non richiedono consenso perché servono a fornire funzionalità richieste dall'utente.
              È possibile cancellarli dalle impostazioni del browser, ma login e preferenze potrebbero andare persi.
            </p>
          </div>
        </section>

        <section>
          <span class="legal-number">03</span>
          <div>
            <h2>Analytics opzionali</h2>
            <div class="legal-table-wrap">
              <table class="legal-table">
                <thead><tr><th>Fornitore</th><th>Strumenti</th><th>Finalità</th><th>Durata indicativa</th></tr></thead>
                <tbody>
                  <tr>
                    <td>Google Analytics for Firebase</td>
                    <td><code>_ga</code>, <code>_ga_*</code> e identificatori equivalenti</td>
                    <td>Distinguere sessioni e produrre statistiche su visite, dispositivo e utilizzo</td>
                    <td>Fino a 2 anni, salvo configurazioni o cancellazione anticipata</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              Analytics non è necessario per giocare. Se viene revocato il consenso, la raccolta viene disabilitata
              e il sito tenta di eliminare i cookie Analytics accessibili dal dominio HangMan.
            </p>
            <div class="legal-links">
              <a href="https://support.google.com/analytics/answer/11593727" target="_blank" rel="noreferrer">Dati raccolti da Google Analytics <i class="bi bi-box-arrow-up-right"></i></a>
              <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">Privacy Google <i class="bi bi-box-arrow-up-right"></i></a>
            </div>
          </div>
        </section>

        <section>
          <span class="legal-number">04</span>
          <div>
            <h2>Come modificare la scelta</h2>
            <p>
              Puoi accettare, rifiutare o cambiare la categoria Analytics in qualsiasi momento. Il rifiuto ha la
              stessa facilità dell'accettazione e non limita le funzioni principali del gioco.
            </p>
            <button class="btn btn-primary" type="button" @click="openCookieSettings">
              <i class="bi bi-sliders"></i> Apri preferenze cookie
            </button>
          </div>
        </section>
      </article>

      <article v-else class="legal-content">
        <section>
          <span class="legal-number">01</span>
          <div>
            <h2>Oggetto del servizio</h2>
            <p>
              HangMan - The Game è un progetto scolastico e dimostrativo dedicato al classico gioco dell'impiccato.
              Il sito presenta il prototipo, permette di giocare online, salvare statistiche e confrontare i risultati
              nella leaderboard. Il servizio non è un prodotto finanziario, non offre scommesse, non vende beni o
              abbonamenti e non assegna premi in denaro.
            </p>
          </div>
        </section>

        <section>
          <span class="legal-number">02</span>
          <div>
            <h2>Account e requisiti</h2>
            <ul>
              <li>L'utente deve fornire un'email valida, scegliere un username consentito e custodire la password.</li>
              <li>Non è consentito usare identità altrui, username offensivi o dati personali di terzi senza autorizzazione.</li>
              <li>Gli utenti sotto i 14 anni devono utilizzare le funzioni con account sotto la supervisione e autorizzazione di un genitore o tutore.</li>
              <li>La verifica dell'email può essere richiesta per accedere alla modalità di gioco.</li>
            </ul>
            <p>
              Creando un account, l'utente accetta che il proprio username e i risultati di gioco possano apparire
              pubblicamente nella classifica. Email e password non sono pubblicate.
            </p>
          </div>
        </section>

        <section>
          <span class="legal-number">03</span>
          <div>
            <h2>Regole di utilizzo</h2>
            <p>L'utente si impegna a non:</p>
            <ul>
              <li>manomettere punteggi, leaderboard, account, database o meccanismi del gioco;</li>
              <li>usare bot, script o vulnerabilità per ottenere vantaggi o interrompere il servizio;</li>
              <li>tentare accessi non autorizzati o raccogliere dati degli altri giocatori;</li>
              <li>caricare o comunicare contenuti illeciti, offensivi o lesivi di diritti altrui.</li>
            </ul>
            <p>
              Il team può correggere punteggi anomali, limitare funzioni o sospendere account quando ciò sia
              ragionevolmente necessario per sicurezza, correttezza della classifica o violazioni dei presenti termini.
            </p>
          </div>
        </section>

        <section>
          <span class="legal-number">04</span>
          <div>
            <h2>Disponibilità e risultati</h2>
            <p>
              Il progetto è fornito a finalità didattiche e può essere aggiornato, sospeso o modificato. Non viene
              garantita l'assenza totale di errori, l'accesso continuo o la conservazione indefinita di punteggi e
              statistiche. I risultati hanno valore esclusivamente ludico e non sono convertibili in denaro, beni o premi.
            </p>
          </div>
        </section>

        <section>
          <span class="legal-number">05</span>
          <div>
            <h2>Proprietà intellettuale e servizi esterni</h2>
            <p>
              Grafica, testi, codice e materiali originali del progetto appartengono ai rispettivi autori, salvo le
              componenti open source e i marchi di terzi, che restano soggetti alle rispettive licenze. I collegamenti
              esterni sono forniti per utilità e non implicano controllo sui relativi servizi.
            </p>
          </div>
        </section>

        <section>
          <span class="legal-number">06</span>
          <div>
            <h2>Responsabilità, modifiche e contatti</h2>
            <p>
              Nei limiti consentiti dalla legge, il team non risponde di interruzioni, perdita di progressi o danni
              indiretti derivanti da uso improprio, problemi di rete o servizi di terzi. Restano ferme le responsabilità
              che non possono essere escluse per legge. I termini possono essere aggiornati quando cambia il progetto;
              l'uso successivo all'aggiornamento comporta l'applicazione della nuova versione, fatti salvi i diritti già maturati.
            </p>
            <p>
              Si applica la legge italiana. Per domande o richieste è disponibile il
              <a href="https://www.instagram.com/hangmanit_/" target="_blank" rel="noreferrer">profilo Instagram ufficiale di HangMan</a>.
            </p>
          </div>
        </section>
      </article>
      </template>

      <template v-else>
        <article v-if="documentType === 'privacy'" class="legal-content">
          <section>
            <span class="legal-number">01</span>
            <div>
              <h2>Who we are and what HangMan is</h2>
              <p>
                <strong>HangMan - The Game</strong> is an educational project developed by a group of students from
                ITET Rapisardi - Da Vinci. It reimagines the classic word game through a web app and a physical
                prototype: the player guesses a hidden word and one part of Hangy falls after every mistake.
              </p>
              <p>
                Data processing for this website is managed by the HangMan - The Game project team. Privacy requests
                can be sent through the
                <a href="https://www.instagram.com/hangmanit_/" target="_blank" rel="noreferrer">official Instagram profile</a>.
              </p>
            </div>
          </section>

          <section>
            <span class="legal-number">02</span>
            <div>
              <h2>Data we process</h2>
              <div class="legal-table-wrap">
                <table class="legal-table">
                  <thead><tr><th>Category</th><th>Data</th><th>Purpose</th></tr></thead>
                  <tbody>
                    <tr><td>Account</td><td>Email, username, Firebase ID, verification status and role</td><td>Registration, login, security, password recovery and restricted features</td></tr>
                    <tr><td>Gameplay</td><td>Points, wins, games played, best score and streaks</td><td>Save progress, display statistics and build the leaderboard</td></tr>
                    <tr><td>Preferences</td><td>Language, theme, difficulty and privacy choice</td><td>Remember settings requested on the device</td></tr>
                    <tr><td>Technical</td><td>IP address, browser, device, date and security logs</td><td>Deliver the site, prevent abuse and diagnose errors</td></tr>
                    <tr><td>Optional analytics</td><td>Identifiers, sessions, interactions, device and approximate location</td><td>Produce usage statistics only after consent</td></tr>
                  </tbody>
                </table>
              </div>
              <p class="legal-note">
                <i class="bi bi-eye"></i>
                The leaderboard may publicly display <strong>username, role, points, wins and ranking position</strong>.
                Email addresses and passwords are never displayed. Passwords are handled by Firebase Authentication
                and are not stored in the game's public database documents.
              </p>
            </div>
          </section>

          <section>
            <span class="legal-number">03</span>
            <div>
              <h2>Purposes and legal bases</h2>
              <ul>
                <li><strong>Providing the requested service:</strong> creating accounts, running games, saving progress and displaying rankings.</li>
                <li><strong>Legal obligations:</strong> responding to lawful requests and complying with applicable requirements.</li>
                <li><strong>Legitimate interest:</strong> protecting accounts, infrastructure and databases against abuse or unauthorized access.</li>
                <li><strong>Consent:</strong> enabling Google Analytics for Firebase. Consent is optional and can be withdrawn at any time.</li>
              </ul>
            </div>
          </section>

          <section>
            <span class="legal-number">04</span>
            <div>
              <h2>Providers and international transfers</h2>
              <p>
                The project uses <strong>Google Firebase</strong> for authentication, Cloud Firestore and, only with
                consent, Analytics. Google generally acts as a data processor for project data. Firebase
                Authentication also operates through infrastructure in the United States, while other Firebase
                services may use global infrastructure. Google manages transfers using the mechanisms required by
                applicable law, including data processing terms and standard contractual clauses where necessary.
              </p>
              <p>
                The hosting provider may process essential technical logs. Links to Instagram, GitHub, X/Twitter,
                LinkedIn or the school website lead to external services, which apply their own privacy policies when visited.
              </p>
              <div class="legal-links">
                <a href="https://firebase.google.com/support/privacy" target="_blank" rel="noreferrer">Firebase privacy and security <i class="bi bi-box-arrow-up-right"></i></a>
                <a href="https://firebase.google.com/terms/data-processing-terms/" target="_blank" rel="noreferrer">Firebase data processing terms <i class="bi bi-box-arrow-up-right"></i></a>
              </div>
            </div>
          </section>

          <section>
            <span class="legal-number">05</span>
            <div>
              <h2>Retention</h2>
              <p>
                Account and gameplay data are kept while the account remains active or while needed to provide the
                requested features. Following a deletion request, data are removed or anonymized subject to legal,
                security and backup requirements. Local preferences remain on the device until cleared; the cookie
                choice is requested again after six months. Analytics data follow the retention configured in the
                service and are kept only as long as needed to produce project statistics.
              </p>
            </div>
          </section>

          <section>
            <span class="legal-number">06</span>
            <div>
              <h2>Your rights</h2>
              <p>
                Where provided by the GDPR, users may request access, correction, deletion, restriction, portability
                or object to processing. Analytics consent may be withdrawn without affecting gameplay. Requests can
                be sent through the official profile above. Users may also lodge a complaint with the
                <a href="https://www.garanteprivacy.it/" target="_blank" rel="noreferrer">Italian Data Protection Authority</a>.
              </p>
              <button class="btn btn-outline-primary" type="button" @click="openCookieSettings">
                <i class="bi bi-sliders"></i> Manage cookie preferences
              </button>
            </div>
          </section>

          <section>
            <span class="legal-number">07</span>
            <div>
              <h2>Children, security and updates</h2>
              <p>
                Users under 14 must use consent-based features with authorization from a parent or guardian. The team
                applies reasonable safeguards to accounts and data, although no online system can guarantee zero risk.
                This policy may change when features, providers or legal duties change; the date above identifies the current version.
              </p>
            </div>
          </section>
        </article>

        <article v-else-if="documentType === 'cookies'" class="legal-content">
          <section>
            <span class="legal-number">01</span>
            <div>
              <h2>What the site actually uses</h2>
              <p>
                HangMan uses cookies and equivalent technologies such as <strong>localStorage</strong> and
                <strong>IndexedDB</strong>. Necessary storage keeps the login active and remembers language, theme,
                difficulty and local results. The project does not use advertising cookies or commercial profiling.
              </p>
              <p>
                Google Analytics for Firebase is optional: it remains blocked before a choice and is enabled only
                after selecting “Accept all” or switching on the Analytics category.
              </p>
            </div>
          </section>

          <section>
            <span class="legal-number">02</span>
            <div>
              <h2>Necessary technical storage</h2>
              <div class="legal-table-wrap">
                <table class="legal-table">
                  <thead><tr><th>Name or area</th><th>Function</th><th>Indicative duration</th></tr></thead>
                  <tbody>
                    <tr><td><code>hm-cookie-consent</code></td><td>Stores the privacy choice and policy version</td><td>6 months</td></tr>
                    <tr><td><code>lang</code></td><td>Remembers the selected language</td><td>Until deleted</td></tr>
                    <tr><td><code>vueuse-color-scheme</code></td><td>Remembers light or dark theme</td><td>Until deleted</td></tr>
                    <tr><td><code>selectedMode</code></td><td>Remembers game difficulty</td><td>Until deleted</td></tr>
                    <tr><td><code>punti</code>, <code>vittorie</code></td><td>Keeps a local copy of game results</td><td>Until deletion or update</td></tr>
                    <tr><td>Firebase Authentication</td><td>Maintains account sessions and security tokens</td><td>Until logout, revocation or technical expiry</td></tr>
                  </tbody>
                </table>
              </div>
              <p>
                These tools do not require consent because they provide features requested by the user. Clearing them
                in browser settings may remove login status and saved preferences.
              </p>
            </div>
          </section>

          <section>
            <span class="legal-number">03</span>
            <div>
              <h2>Optional analytics</h2>
              <div class="legal-table-wrap">
                <table class="legal-table">
                  <thead><tr><th>Provider</th><th>Tools</th><th>Purpose</th><th>Indicative duration</th></tr></thead>
                  <tbody>
                    <tr>
                      <td>Google Analytics for Firebase</td>
                      <td><code>_ga</code>, <code>_ga_*</code> and equivalent identifiers</td>
                      <td>Distinguish sessions and create statistics about visits, devices and usage</td>
                      <td>Up to 2 years, unless configured or deleted earlier</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p>
                Analytics is not needed to play. When consent is withdrawn, collection is disabled and the site
                attempts to remove Analytics cookies accessible from the HangMan domain.
              </p>
              <div class="legal-links">
                <a href="https://support.google.com/analytics/answer/11593727" target="_blank" rel="noreferrer">Data collected by Google Analytics <i class="bi bi-box-arrow-up-right"></i></a>
                <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">Google Privacy Policy <i class="bi bi-box-arrow-up-right"></i></a>
              </div>
            </div>
          </section>

          <section>
            <span class="legal-number">04</span>
            <div>
              <h2>Changing your choice</h2>
              <p>
                You can accept, reject or change Analytics at any time. Rejecting is as easy as accepting and does not
                limit the game's main features.
              </p>
              <button class="btn btn-primary" type="button" @click="openCookieSettings">
                <i class="bi bi-sliders"></i> Open cookie preferences
              </button>
            </div>
          </section>
        </article>

        <article v-else class="legal-content">
          <section>
            <span class="legal-number">01</span>
            <div>
              <h2>About the service</h2>
              <p>
                HangMan - The Game is an educational demonstration project based on the classic word game. The site
                presents the prototype, supports online gameplay, saves statistics and compares results in a
                leaderboard. It is not a financial product, does not offer gambling, sell goods or subscriptions, or award cash prizes.
              </p>
            </div>
          </section>

          <section>
            <span class="legal-number">02</span>
            <div>
              <h2>Accounts and requirements</h2>
              <ul>
                <li>Users must provide a valid email, choose an allowed username and keep their password secure.</li>
                <li>Impersonation, offensive usernames and unauthorized use of another person's data are prohibited.</li>
                <li>Users under 14 must use account features under the supervision and authorization of a parent or guardian.</li>
                <li>Email verification may be required to enter play mode.</li>
              </ul>
              <p>
                By creating an account, users accept that their username and gameplay results may appear publicly on
                the leaderboard. Email addresses and passwords are not published.
              </p>
            </div>
          </section>

          <section>
            <span class="legal-number">03</span>
            <div>
              <h2>Acceptable use</h2>
              <p>Users must not:</p>
              <ul>
                <li>tamper with scores, rankings, accounts, databases or game mechanics;</li>
                <li>use bots, scripts or vulnerabilities to gain an advantage or disrupt the service;</li>
                <li>attempt unauthorized access or collect other players' data;</li>
                <li>upload or communicate unlawful, offensive or rights-infringing content.</li>
              </ul>
              <p>
                The team may correct unusual scores, restrict features or suspend accounts where reasonably necessary
                for security, leaderboard integrity or violations of these terms.
              </p>
            </div>
          </section>

          <section>
            <span class="legal-number">04</span>
            <div>
              <h2>Availability and results</h2>
              <p>
                The educational project may be updated, suspended or changed. Error-free and uninterrupted access or
                indefinite preservation of scores and statistics is not guaranteed. Results are for entertainment only
                and cannot be exchanged for money, goods or prizes.
              </p>
            </div>
          </section>

          <section>
            <span class="legal-number">05</span>
            <div>
              <h2>Intellectual property and external services</h2>
              <p>
                Original graphics, text, code and project materials belong to their respective authors. Open-source
                components and third-party trademarks remain subject to their own licenses. External links are provided
                for convenience and do not imply control over those services.
              </p>
            </div>
          </section>

          <section>
            <span class="legal-number">06</span>
            <div>
              <h2>Liability, changes and contact</h2>
              <p>
                To the extent permitted by law, the team is not liable for interruptions, lost progress or indirect
                damage caused by misuse, network issues or third-party services. Liability that cannot legally be
                excluded remains unaffected. These terms may be updated as the project changes; the date above identifies the current version.
              </p>
              <p>
                Italian law applies. Questions and requests may be sent through the
                <a href="https://www.instagram.com/hangmanit_/" target="_blank" rel="noreferrer">official HangMan Instagram profile</a>.
              </p>
            </div>
          </section>
        </article>
      </template>
    </div>
  </main>
</template>

<style scoped>
.legal-page {
  padding-bottom: clamp(4rem, 8vw, 7rem);
}

.legal-hero {
  position: relative;
  overflow: hidden;
  padding: clamp(4rem, 9vw, 7rem) 0 clamp(3rem, 6vw, 5rem);
  border-bottom: 1px solid var(--hm-border);
  background:
    linear-gradient(135deg, var(--hm-accent-soft), transparent 48%),
    var(--hm-bg-soft);
}

.legal-hero::after {
  position: absolute;
  top: -7rem;
  right: -5rem;
  width: 26rem;
  height: 26rem;
  content: "A _ B _ C";
  color: rgba(255, 255, 255, 0.04);
  font-size: 6rem;
  font-weight: 950;
  line-height: 1;
  transform: rotate(-8deg);
}

:global(body[theme="custom-light"]) .legal-hero::after {
  color: rgba(179, 54, 54, 0.06);
}

.legal-hero .container {
  position: relative;
  z-index: 1;
}

.legal-hero-icon {
  display: grid;
  width: 58px;
  height: 58px;
  margin-bottom: 1.4rem;
  place-items: center;
  color: #fff;
  border-radius: var(--hm-radius-sm);
  background: linear-gradient(135deg, var(--hm-primary), var(--hm-primary-strong));
  box-shadow: 0 16px 34px rgba(255, 77, 77, 0.26);
  font-size: 1.55rem;
}

.legal-hero h1 {
  max-width: 850px;
  margin: 0;
  font-size: clamp(2.8rem, 8vw, 5.6rem);
  font-weight: 950;
  line-height: 0.98;
}

.legal-hero p {
  max-width: 760px;
  margin: 1.25rem 0;
  color: var(--hm-text-muted);
  font-size: clamp(1.05rem, 2vw, 1.25rem);
}

.legal-date {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  color: var(--hm-text-muted);
  font-size: 0.88rem;
  font-weight: 750;
}

.legal-highlights {
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem 1.2rem;
  margin-top: 1.15rem;
  color: var(--hm-text-muted);
  font-size: 0.82rem;
  font-weight: 800;
}

.legal-highlights span {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
}

.legal-highlights i {
  color: var(--hm-accent);
}

.legal-layout {
  display: grid;
  grid-template-columns: 250px minmax(0, 1fr);
  gap: clamp(2rem, 5vw, 5rem);
  padding-top: clamp(2rem, 5vw, 4rem);
}

.legal-nav {
  position: sticky;
  top: 110px;
  display: flex;
  align-self: start;
  flex-direction: column;
  gap: 0.4rem;
  padding: 0.85rem;
  border: 1px solid var(--hm-border);
  border-radius: var(--hm-radius-sm);
  background: var(--hm-surface);
  backdrop-filter: blur(16px);
  box-shadow: var(--hm-shadow-soft);
}

.legal-nav-title {
  padding: 0.35rem 0.65rem 0.55rem;
  color: var(--hm-text-muted);
  font-size: 0.7rem;
  font-weight: 900;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.legal-nav a {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  padding: 0.55rem 0.65rem;
  color: var(--hm-text-muted);
  border-radius: var(--hm-radius-xs);
  font-size: 0.9rem;
  font-weight: 800;
  text-decoration: none;
  transition: color 0.2s ease, background 0.2s ease, transform 0.2s ease;
}

.legal-nav a:hover,
.legal-nav a.router-link-active {
  color: var(--hm-heading);
  background: var(--hm-accent-soft);
}

.legal-nav a:hover {
  transform: translateX(2px);
}

.legal-nav-icon {
  display: grid;
  flex: 0 0 34px;
  width: 34px;
  height: 34px;
  place-items: center;
  color: var(--hm-text-muted);
  border: 1px solid var(--hm-border);
  border-radius: 9px;
  background: rgba(255, 255, 255, 0.055);
}

.legal-nav a.router-link-active .legal-nav-icon {
  color: var(--hm-accent);
  border-color: rgba(255, 77, 77, 0.34);
  background: rgba(255, 77, 77, 0.1);
}

.legal-content {
  min-width: 0;
  max-width: 900px;
}

.legal-content section {
  display: grid;
  grid-template-columns: 48px minmax(0, 1fr);
  gap: 1.15rem;
  padding: 0 0 clamp(2.7rem, 6vw, 4.5rem);
}

.legal-content section + section {
  padding-top: clamp(2rem, 4vw, 3rem);
  border-top: 1px solid var(--hm-border);
}

.legal-number {
  display: grid;
  width: 38px;
  height: 38px;
  place-items: center;
  color: var(--hm-accent);
  border: 1px solid rgba(255, 77, 77, 0.3);
  border-radius: 10px;
  background: var(--hm-accent-soft);
  font-size: 0.78rem;
  font-weight: 950;
  letter-spacing: 0.08em;
}

.legal-content h2 {
  margin: 0 0 1rem;
  font-size: clamp(1.55rem, 3vw, 2.2rem);
  line-height: 1.15;
}

.legal-content p,
.legal-content li {
  color: var(--hm-text-muted);
}

.legal-content li + li {
  margin-top: 0.55rem;
}

.legal-content li::marker {
  color: var(--hm-accent);
}

.legal-table-wrap {
  overflow-x: auto;
  margin: 1.25rem 0;
  border: 1px solid var(--hm-border);
  border-radius: var(--hm-radius-sm);
}

.legal-table {
  width: 100%;
  min-width: 660px;
  border-collapse: collapse;
  background: rgba(255, 255, 255, 0.035);
}

.legal-table th,
.legal-table td {
  padding: 0.95rem 1rem;
  text-align: left;
  vertical-align: top;
  border-bottom: 1px solid var(--hm-border);
}

.legal-table tr:last-child td {
  border-bottom: 0;
}

.legal-table tbody tr:nth-child(even) {
  background: rgba(255, 255, 255, 0.025);
}

.legal-table tbody tr:hover {
  background: var(--hm-accent-soft);
}

.legal-table th {
  color: var(--hm-heading);
  background: var(--hm-accent-soft);
  font-size: 0.78rem;
  font-weight: 900;
  text-transform: uppercase;
}

.legal-table td {
  color: var(--hm-text-muted);
  font-size: 0.9rem;
}

.legal-table td:first-child {
  color: var(--hm-heading);
  font-weight: 800;
}

.legal-table code {
  color: var(--hm-accent);
}

.legal-note {
  display: flex;
  gap: 0.75rem;
  padding: 1rem;
  border-left: 3px solid var(--hm-accent);
  border-radius: 0 var(--hm-radius-xs) var(--hm-radius-xs) 0;
  background: var(--hm-accent-soft);
}

.legal-note i {
  flex: 0 0 auto;
  color: var(--hm-accent);
  font-size: 1.2rem;
}

.legal-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem 1.2rem;
  margin-top: 1rem;
}

.legal-links a {
  font-size: 0.9rem;
  font-weight: 800;
}

@media (max-width: 991.98px) {
  .legal-layout {
    grid-template-columns: 1fr;
  }

  .legal-nav {
    position: static;
    flex-direction: row;
    overflow-x: auto;
  }

  .legal-nav-title {
    display: none;
  }

  .legal-nav a {
    flex: 0 0 auto;
  }
}

@media (max-width: 575.98px) {
  .legal-nav {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 0.35rem;
    overflow: visible;
    padding: 0.5rem;
  }

  .legal-nav a {
    flex-direction: column;
    gap: 0.25rem;
    min-width: 0;
    padding: 0.5rem 0.2rem;
    text-align: center;
    white-space: nowrap;
    font-size: 0.72rem;
  }

  .legal-nav a:hover {
    transform: none;
  }

  .legal-nav-icon {
    flex-basis: 30px;
    width: 30px;
    height: 30px;
  }

  .legal-content section {
    grid-template-columns: 40px minmax(0, 1fr);
    gap: 0.75rem;
  }

  .legal-number {
    width: 34px;
    height: 34px;
    font-size: 0.72rem;
  }

  .legal-highlights {
    gap: 0.45rem 0.9rem;
  }

  .legal-content h2 {
    font-size: 1.45rem;
  }
}
</style>
