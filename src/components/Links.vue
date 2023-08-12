<script>
export default {
    data() {
        return {
            links: [
                { etichetta: 'website', url: 'https://hangmangame.it' },
                { etichetta: 'instagram', url: 'https://www.instagram.com/hangmanit_/' },
                { etichetta: 'twitter', url: 'https://twitter.com/HangManGameIT' },
            ],
        };
    }
};
</script>

<template>
    <div class="container my-5">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="text-center mb-4">
                    <img class="img-fluid w-50" src="../assets/images/HangManGame.svg" alt="">
                </div>
                <div class="d-flex flex-column align-items-center">
                    <a v-for="(link, index) in links" :key="index" class="btn btn-success w-25 my-2" :href="link.url">
                        {{ link.etichetta }}
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>
  