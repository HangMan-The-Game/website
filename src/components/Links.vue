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
    <div class="links-page">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="links-card">
                    <div class="text-center mb-4">
                        <img class="img-fluid" src="../assets/images/HangManGame.svg" alt="">
                    </div>
                    <div class="d-flex flex-column align-items-center gap-2">
                    <a v-for="(link, index) in links" :key="index" class="btn btn-success" :href="link.url">
                        {{ link.etichetta }}
                    </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.links-page {
    padding: clamp(2rem, 6vw, 5rem) 1rem;
}

.links-card {
    padding: clamp(1.4rem, 4vw, 2.4rem);
    border: 1px solid var(--hm-border);
    border-radius: var(--hm-radius);
    background: var(--hm-surface);
    box-shadow: var(--hm-shadow);
    backdrop-filter: blur(18px);
}

.links-card img {
    max-width: 260px;
}

.links-card .btn {
    width: min(100%, 240px);
}
</style>
