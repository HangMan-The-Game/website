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

<script setup>
import Loader from '@/components/Loader.vue';
import { collection, onSnapshot } from 'firebase/firestore';
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { db } from '@/firebase.js';

const users = ref([]);
const isLoading = ref(true);

const loadingDelay = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    isLoading.value = false;
};

onMounted(() => {

    loadingDelay();
    const unsubscribe = onSnapshot(collection(db, 'users'), (snapshot) => {
        const updatedUsers = [];
        snapshot.forEach((doc) => {
            updatedUsers.push({
                id: doc.id,
                ...doc.data()
            });
        });
        users.value = updatedUsers;
    });

    onUnmounted(unsubscribe);
});

const sortedUsers = computed(() => {
    return users.value.sort((a, b) => b.points - a.points);
});
</script>

<template>
    <div class="container">
        <h1 class="text-center my-3 fw-bold">{{ $t("leaderboard.title") }} <i class="bi bi-trophy-fill text-danger"></i>
        </h1>
        <h4 class="text-center my-3">{{ $t("leaderboard.description") }}</h4>
        <h5 class="text-center my-3 fst-italic">{{ $t("leaderboard.reachTheTop") }}</h5>
        <Loader v-if="isLoading" class="mx-auto" />
        <!--         <div v-if="isLoading" class="text-center my-3">
            <i class="bi bi-arrow-repeat animate-spin text-primary"></i> Loading...
        </div> -->
        <div class="container" v-else>
            <table class="rounded w-50 shadow mx-auto table table-hover">
                <thead>
                    <tr>
                        <th class="fw-bold h3 t-lead" scope="col">#</th>
                        <th class="fw-bold h3 t-lead" scope="col">Nickname</th>
                        <th class="fw-bold h3 t-lead" scope="col">{{ $t("leaderboard.points") }}</th>
                    </tr>
                </thead>
                <tbody class="table-group-divider">
                    <tr v-for="(user, index) in sortedUsers" :key="user.id">
                        <th scope="row">
                            <span v-if="index === 0">🥇</span>
                            <span v-else-if="index === 1">🥈</span>
                            <span v-else-if="index === 2">🥉</span>
                            <span v-else>{{ index + 1 }}</span>
                        </th>
                        <td class="t-lead">{{ user.name }}</td>
                        <td class="t-lead">{{ user.points }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style>
.table-group-divider tr:last-child {
    border-bottom: none;
}

.table-group-divider tr td,
.table-group-divider tr th {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
</style>