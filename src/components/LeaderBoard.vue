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
    <div class="container">
        <h1 class="text-center mb-3 mt-5 fw-bold">{{ $t("leaderboard.title") }} <i
                class="bi bi-trophy-fill text-danger"></i>
        </h1>
        <h4 class="text-center my-3">{{ $t("leaderboard.description") }}</h4>
        <h5 class="text-center my-3 fst-italic">{{ $t("leaderboard.reachTheTop") }}</h5>
        <Loader v-if="isLoading" class="mx-auto my-5" />
        <div class="container" v-else>
            <div class="mb-3 d-flex justify-content-center">
                <div class="btn-group border" role="group" aria-label="Select Ranking">
                    <button type="button" class="btn" :class="{ 'btn-primary': selectedRanking === 'global' }"
                        @click="selectGlobal">
                        <i class="bi bi-pc-display"></i> / <i class="bi bi-android2"></i>
                    </button>
                    <button type="button" class="btn" :class="{ 'btn-primary': selectedRanking === 'maker' }"
                        @click="selectMaker">
                        <i class="bi bi-motherboard-fill"></i>
                    </button>
                </div>
            </div>
            <table class="rounded w-50 shadow mx-auto table table-hover">
                <thead>
                    <tr>
                        <th class="fw-bold h3 t-lead" scope="col">#</th>
                        <th class="fw-bold h3 t-lead" scope="col">Nickname</th>
                        <th class="fw-bold h3 t-lead" scope="col">{{ $t("leaderboard.points") }}</th>
                    </tr>
                </thead>
                <tbody class="table-group-divider">
                    <tr v-for="(user, index) in currentUsers" :key="user.id">
                        <th scope="row">
                            <span v-if="index === 0">🥇</span>
                            <span v-else-if="index === 1">🥈</span>
                            <span v-else-if="index === 2">🥉</span>
                            <span v-else>{{ index + 1 }}</span>
                        </th>
                        <td v-if="selectedRanking === 'global' && user.role === 'admin'" class="t-lead">
                            <div class="user-name" @mouseover="hoveredUser = user" @mouseout="hoveredUser = null">
                                {{ user.name }} <i class="bi bi-patch-check-fill text-primary"></i>
                            </div>
                            <div v-if="hoveredUser === user" class="user-popup">
                                {{ user.name }} (Admin)
                                <br>
                                {{ $t("game.wins") }}: {{ user.vittorie }}
                            </div>
                        </td>
                        <td v-else-if="selectedRanking === 'global'" class="t-lead">
                            <div class="user-name" @mouseover="hoveredUser = user" @mouseout="hoveredUser = null">
                                {{ user.name }}
                            </div>
                            <div v-if="hoveredUser === user" class="user-popup">
                                {{ $t("game.wins") }}: {{ user.vittorie }}
                            </div>
                        </td>
                        <td v-else class="t-lead" :class="{ 'text-uppercase': selectedRanking === 'maker' }">{{
                            user.nickname }}</td>
                        <td class="t-lead">
                            {{ user.points }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
  
<script setup>
import Loader from '@/components/Loader.vue';
import { collection, onSnapshot } from 'firebase/firestore';
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { db } from '@/firebase.js';

const users = ref([]);
const isLoading = ref(true);
const selectedRanking = ref('global');
const hoveredUser = ref(null);
const showPopup = ref(false);

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

const userHovered = ref(Array(currentUsers.length).fill(false));

const setHoveredUser = (index) => {
    userHovered[index] = true;
};

const resetHoveredUser = (index) => {
    userHovered[index] = false;
};

</script>
  
  

<style scoped>
.table-group-divider tr:last-child {
    border-bottom: none;
}

.table-group-divider tr td,
.table-group-divider tr th {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.btn-primary {
    background-color: #FF4D4D;
    border-color: #FF4D4D;
}

.btn-primary:hover {
    background-color: #B33636;
    border-color: #FF4D4D;
}

.btn-primary:active {
    background-color: #4e0909;
    border-color: #FF4D4D;
}

.user-popup {
    position: absolute;
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 5px;
    border-radius: 3px;
    z-index: 999;
    display: inline-block;
}
</style>