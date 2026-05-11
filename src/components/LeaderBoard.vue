<!-- <script setup></script>

<template>
    <h1 class="text-center my-3 fw-bold">{{ $t("leaderboard.title") }} <i class="bi bi-trophy-fill text-danger"></i></h1>
    <h4 class="text-center my-3">{{ $t("leaderboard.description") }}</h4>
    <h5 class="text-center my-3 fst-italic">{{ $t("leaderboard.reachTheTop") }}</h5>
    <div class="container">
        <table class="rounded w-25 shadow mx-auto table table-hover">
            <thead>
                <tr>
                    <th class="fw-bold h3 t-lead" scope="col">#</th>
                    <th class="fw-bold h3 t-lead" scope="col">Nickname</th>
                    <th class="fw-bold h3 t-lead" scope="col">{{ $t("leaderboard.points") }}</th>
                </tr>
            </thead>
            <tbody class="table-group-divider">
                <tr>
                    <th scope="row"><i class="bi bi-1-circle-fill text-warning"></i></th>
                    <td class="t-lead"><country-flag country='it' size='small' /> Mich2400</td>
                    <td class="t-lead">45</td>
                </tr>
                <tr>
                    <th scope="row"><i class="bi bi-2-circle-fill text-secondary"></i></th>
                    <td class="t-lead"><country-flag country='it' size='small' /> alerunza</td>
                    <td class="t-lead">39</td>
                </tr>
                <tr>
                    <th scope="row"><i class="bi bi-3-circle-fill text-primary"></i></th>
                    <td class="t-lead"><country-flag country='it' size='small' /> zGandy</td>
                    <td class="t-lead">24</td>
                </tr>
                <tr>
                    <th class="t-lead" scope="row">4</th>
                    <td class="t-lead"><country-flag country='it' size='small' /> D3fAul7</td>
                    <td class="t-lead">19</td>
                </tr>
                <tr>
                    <th class="t-lead" scope="row">5</th>
                    <td class="t-lead"><country-flag country='it' size='small' /> emadol</td>
                    <td class="t-lead">18</td>
                </tr>
                <tr>
                    <th class="t-lead" scope="row">6</th>
                    <td class="t-lead"><country-flag country='it' size='small' /> leone567</td>
                    <td class="t-lead">15</td>
                </tr>
                <tr>
                    <th class="t-lead" scope="row">7</th>
                    <td class="t-lead"><country-flag country='it' size='small' /> Sten_</td>
                    <td class="t-lead">12</td>
                </tr>
                <tr>
                    <th class="t-lead" scope="row">8</th>
                    <td class="t-lead"><country-flag country='it' size='small' /> AO206</td>
                    <td class="t-lead">9</td>
                </tr>
                <tr>
                    <th class="t-lead" scope="row">9</th>
                    <td class="t-lead"><country-flag country='it' size='small' /> GabriXR</td>
                    <td class="t-lead">8</td>
                </tr>
                <tr>
                    <th class="t-lead" scope="row">10</th>
                    <td class="t-lead"><country-flag country='it' size='small' /> Matth</td>
                    <td class="t-lead">5</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped></style> -->

<template>
    <section class="leaderboard-page">
        <div class="container">
            <div class="leaderboard-hero text-center">
                <span class="section-kicker justify-content-center"><i class="bi bi-trophy-fill"></i> Ranking</span>
                <h1>{{ $t("leaderboard.title") }}</h1>
                <h4>{{ $t("leaderboard.description") }}</h4>
                <h5>{{ $t("leaderboard.reachTheTop") }}</h5>
            </div>
            <Loader v-if="isLoading" class="mx-auto my-5" />
            <div v-else class="leaderboard-shell">
                <div class="mb-4 d-flex justify-content-center">
                <div class="btn-group ranking-switch" role="group" aria-label="Select Ranking">
                    <button type="button" class="btn" :class="{ 'btn-primary': selectedRanking === 'global' }"
                        @click="selectGlobal">
                        <i class="bi bi-pc-display"></i>
                        <span>Global</span>
                    </button>
                    <button type="button" class="btn" :class="{ 'btn-primary': selectedRanking === 'maker' }"
                        @click="selectMaker">
                        <i class="bi bi-motherboard-fill"></i>
                        <span>Maker</span>
                    </button>
                </div>
            </div>

                <div v-if="currentUsers.length === 0" class="empty-ranking">
                    <i class="bi bi-trophy"></i>
                    <strong>Nessun giocatore in classifica</strong>
                    <span>Le prime sfide compariranno qui appena saranno disponibili.</span>
                </div>

                <div v-else>
                    <div class="podium-grid">
                        <article v-for="(user, index) in topUsers" :key="getUserKey(user, index)"
                            class="podium-card" :class="`rank-${index + 1}`">
                            <div class="podium-rank">{{ getRankLabel(index) }}</div>
                            <div class="podium-content">
                                <div>
                                    <h3>
                                        {{ getUserName(user) }}
                                        <i v-if="selectedRanking === 'global' && user.role === 'admin'"
                                            class="bi bi-patch-check-fill"></i>
                                    </h3>
                                    <div class="podium-meta" v-if="selectedRanking === 'global'">
                                        {{ $t("game.wins") }}: {{ user.vittorie || 0 }}
                                    </div>
                                </div>
                            </div>
                            <div class="points-pill">{{ user.points }} {{ $t("leaderboard.points") }}</div>
                        </article>
                    </div>

                    <div class="ranking-list">
                        <div class="ranking-list-header">
                            <span>#</span>
                            <span>Nickname</span>
                            <span>{{ $t("leaderboard.points") }}</span>
                        </div>

                        <div v-for="(user, index) in currentUsers" :key="getUserKey(user, index)"
                            class="ranking-row" :class="{ 'is-top': index < 3 }">
                            <div class="rank-cell">
                                <span>{{ getRankLabel(index) }}</span>
                            </div>
                            <div class="player-cell">
                                <div class="player-info">
                                    <strong :class="{ 'text-uppercase': selectedRanking === 'maker' }">
                                        {{ getUserName(user) }}
                                        <i v-if="selectedRanking === 'global' && user.role === 'admin'"
                                            class="bi bi-patch-check-fill"></i>
                                    </strong>
                                    <small v-if="selectedRanking === 'global'">
                                        {{ $t("game.wins") }}: {{ user.vittorie || 0 }}
                                    </small>
                                </div>
                            </div>
                            <div class="score-cell">
                                <strong>{{ user.points }}</strong>
                                <span>pts</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
  
<script setup>
import Loader from '@/components/Loader.vue';
import { collection, onSnapshot } from 'firebase/firestore';
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { db } from '@/firebase.js';

const users = ref([]);
const isLoading = ref(true);
const selectedRanking = ref('global');

const loadingDelay = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    isLoading.value = false;
};

const selectGlobal = () => {
    selectedRanking.value = 'global';
    getUsersFromCollection('users');
};

const selectMaker = () => {
    selectedRanking.value = 'maker';
    getMakerBoardUsers();
};

const getUsersFromCollection = (collectionName) => {
    const unsubscribe = onSnapshot(collection(db, collectionName), (snapshot) => {
        const updatedUsers = [];
        snapshot.forEach((doc) => {
            updatedUsers.push({
                id: doc.id,
                ...doc.data(),
            });
        });
        users.value = updatedUsers;
    });

    onUnmounted(unsubscribe);
};

const getMakerBoardUsers = () => {
    const unsubscribe = onSnapshot(collection(db, 'MakerBoard'), (snapshot) => {
        const updatedUsers = [];
        snapshot.forEach((doc) => {
            const nickname = doc.id;
            const points = doc.data().punti;
            // console.log("Nick di merda: " + nickname);
            updatedUsers.push({
                nickname,
                punti: points,
                points,
            });
        });
        users.value = updatedUsers;
    });

    onUnmounted(unsubscribe);
};



onMounted(() => {
    loadingDelay();
    getUsersFromCollection('users');
});

const sortedUsers = computed(() => {
    return users.value.filter(user => user.points > 5).sort((a, b) => b.points - a.points);
});

const globalUsers = computed(() => {
    return sortedUsers.value;
});

const makerUsers = computed(() => {
    return sortedUsers.value;
});

const currentUsers = computed(() => {
    return selectedRanking.value === 'global' ? globalUsers.value : makerUsers.value;
});

const topUsers = computed(() => {
    return currentUsers.value.slice(0, 3);
});

const getUserName = (user) => {
    return selectedRanking.value === 'global' ? user.name : user.nickname;
};

const getUserKey = (user, index) => {
    return user.id || user.nickname || `${getUserName(user)}-${index}`;
};

const getRankLabel = (index) => {
    if (index === 0) return '1';
    if (index === 1) return '2';
    if (index === 2) return '3';
    return String(index + 1);
};

</script>
  
  

<style scoped>
.leaderboard-page {
    padding: clamp(2rem, 6vw, 5rem) 0;
}

.leaderboard-hero {
    margin-bottom: 2rem;
}

.leaderboard-hero h1 {
    font-size: clamp(2.7rem, 8vw, 5rem);
    font-weight: 950;
}

.leaderboard-hero h4,
.leaderboard-hero h5 {
    max-width: 760px;
    margin-right: auto;
    margin-left: auto;
    color: var(--hm-text-muted);
}

.leaderboard-shell {
    padding: clamp(1rem, 3vw, 1.5rem);
    border: 1px solid var(--hm-border);
    border-radius: calc(var(--hm-radius) + 10px);
    background: var(--hm-surface);
    box-shadow: var(--hm-shadow-soft);
    backdrop-filter: blur(18px);
}

.ranking-switch {
    padding: 0.35rem;
    border: 1px solid var(--hm-border);
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.06);
    box-shadow: var(--hm-shadow-soft);
}

.ranking-switch .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.45rem;
    min-width: 116px;
    color: var(--hm-text-muted);
    border: 0 !important;
    background: transparent !important;
}

.ranking-switch .btn-primary {
    color: #fff !important;
    background: var(--hm-accent) !important;
}

.empty-ranking {
    display: grid;
    min-height: 280px;
    place-items: center;
    align-content: center;
    gap: 0.35rem;
    color: var(--hm-text-muted);
    text-align: center;
    border: 1px dashed var(--hm-border);
    border-radius: var(--hm-radius);
}

.empty-ranking i {
    color: var(--hm-accent);
    font-size: 2.8rem;
}

.empty-ranking strong {
    color: var(--hm-heading);
    font-size: 1.25rem;
}

.podium-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 0.8rem;
    margin-bottom: 1.25rem;
}

.podium-card {
    position: relative;
    overflow: hidden;
    display: grid;
    grid-template-columns: auto minmax(0, 1fr) auto;
    gap: 0.85rem;
    align-items: center;
    min-height: 104px;
    padding: 1rem;
    border: 1px solid var(--hm-border);
    border-radius: var(--hm-radius-sm);
    background: rgba(255, 255, 255, 0.055);
    box-shadow: var(--hm-shadow-soft);
}

.podium-card::before {
    position: absolute;
    inset: 0 auto 0 0;
    width: 4px;
    height: auto;
    content: "";
    border-radius: var(--hm-radius-sm) 0 0 var(--hm-radius-sm);
    background: var(--hm-accent);
}

.podium-card.rank-1 {
    border-color: rgba(255, 77, 77, 0.32);
    background: rgba(255, 77, 77, 0.08);
}

.podium-card.rank-1::before {
    background: var(--hm-accent);
}

.podium-rank {
    display: grid;
    width: 2.4rem;
    aspect-ratio: 1;
    place-items: center;
    color: #fff;
    border-radius: 999px;
    background: var(--hm-accent);
    font-weight: 950;
    box-shadow: 0 10px 22px rgba(255, 77, 77, 0.24);
}

.podium-content {
    display: block;
    min-width: 0;
}

.podium-card h3 {
    margin: 0;
    overflow: hidden;
    font-size: 1rem;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.podium-card h3 i,
.player-info i {
    color: var(--hm-info);
    font-size: 0.9em;
}

.podium-meta {
    color: var(--hm-text-muted);
    font-size: 0.78rem;
    font-weight: 800;
}

.points-pill {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.35rem;
    padding: 0.48rem 0.68rem;
    color: #fff;
    border-radius: 999px;
    background: rgba(255, 77, 77, 0.88);
    font-size: 0.85rem;
    font-weight: 950;
    white-space: nowrap;
}

.ranking-list {
    display: grid;
    gap: 0.35rem;
    padding-top: 0.35rem;
    border-top: 1px solid var(--hm-border);
}

.ranking-list-header,
.ranking-row {
    display: grid;
    grid-template-columns: 64px minmax(0, 1fr) 120px;
    gap: 1rem;
    align-items: center;
}

.ranking-list-header {
    padding: 0.35rem 1rem;
    color: var(--hm-text-muted);
    font-size: 0.75rem;
    font-weight: 950;
    letter-spacing: 0.1em;
    text-transform: uppercase;
}

.ranking-row {
    position: relative;
    padding: 0.72rem 1rem;
    border: 1px solid transparent;
    border-bottom-color: var(--hm-border);
    border-radius: 0;
    background: transparent;
    transition: transform 0.2s ease, border-color 0.2s ease, background-color 0.2s ease;
}

.ranking-row:hover {
    transform: none;
    border-color: transparent;
    border-bottom-color: rgba(255, 77, 77, 0.24);
    background: rgba(255, 77, 77, 0.055);
}

.ranking-row.is-top {
    border-bottom-color: rgba(255, 77, 77, 0.24);
}

.rank-cell span {
    display: grid;
    width: 2.35rem;
    aspect-ratio: 1;
    place-items: center;
    color: var(--hm-heading);
    border: 1px solid var(--hm-border);
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.07);
    font-weight: 950;
}

.player-cell {
    display: block;
    min-width: 0;
}

.player-info {
    position: relative;
    display: grid;
    min-width: 0;
}

.player-info strong {
    overflow: hidden;
    color: var(--hm-heading);
    text-overflow: ellipsis;
    white-space: nowrap;
}

.player-info small {
    color: var(--hm-text-muted);
    font-weight: 750;
}

.score-cell {
    justify-self: end;
    display: inline-flex;
    align-items: baseline;
    gap: 0.3rem;
    padding: 0.5rem 0.72rem;
    color: var(--hm-heading);
    border: 1px solid var(--hm-border);
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.075);
}

.score-cell strong {
    color: var(--hm-accent);
    font-size: 1.1rem;
}

.score-cell span {
    color: var(--hm-text-muted);
    font-size: 0.75rem;
    font-weight: 850;
}

body[theme="custom-light"] .leaderboard-shell,
body[theme="custom-light"] .podium-card,
body[theme="custom-light"] .ranking-row {
    background-color: rgba(255, 255, 255, 0.70);
}

@media (max-width: 991.98px) {
    .podium-grid {
        grid-template-columns: 1fr;
    }

    .podium-card.rank-1 {
        transform: none;
    }
}

@media (max-width: 575.98px) {
    .ranking-switch {
        width: 100%;
    }

    .ranking-switch .btn {
        min-width: 0;
        flex: 1;
    }

    .ranking-list-header {
        display: none;
    }

    .ranking-row {
        grid-template-columns: 48px minmax(0, 1fr);
    }

    .podium-card {
        grid-template-columns: auto minmax(0, 1fr);
    }

    .points-pill {
        grid-column: 2;
        justify-self: start;
    }

    .score-cell {
        grid-column: 2;
        justify-self: start;
        margin-top: 0.2rem;
    }
}
</style>
