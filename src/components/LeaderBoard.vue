<script setup></script>

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

<style scoped></style>