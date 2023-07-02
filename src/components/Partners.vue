<script setup></script>

<template>
    <section id="partners">
        <h1 class="text-center mb-5 mt-5 fw-bold">{{ $t("nav6") }}</h1>

        <div class="container">
            <div class="row">
                <div class="col-md-6 d-flex align-items-stretch mb-5">
                    <div class="card mx-auto" style="width: 18rem">
                        <img src="../assets/images/itetrap.png" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title text-center">ITET <br>Rapisardi - Da Vinci</h5>
                        </div>
                        <div class="card-body text-center">
                            <h5>Socials</h5>
                            <a href="https://www.facebook.com/itetrapisardidavinci" class="card-link fs-3"><i
                                    class="bi bi-facebook"></i></a>
                            <a href="https://www.instagram.com/itet_rapisardidavinci_official/" class="card-link fs-3"><i
                                    class="bi bi-instagram"></i></a>
                            <a href="https://www.rapisardidavinci.edu.it/" class="card-link fs-3"><i
                                    class="bi bi-globe"></i></a>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 d-flex align-items-stretch mb-5">
                    <div class="card mx-auto" style="width: 18rem">
                        <img src="../assets/images/logoMFR23.png" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title text-center">Maker Faire Rome 2023</h5>
                        </div>
                        <div class="card-body text-center">
                            <h5>Socials</h5>
                            <a href="https://www.facebook.com/MakerFaireRome" class="card-link fs-3"><i
                                    class="bi bi-facebook"></i></a>
                            <a href="https://www.instagram.com/makerfairerome/" class="card-link fs-3"><i
                                    class="bi bi-instagram"></i></a>
                            <a href="https://www.youtube.com/channel/UCfQf3eKXX63TKPovdpUiZ1w" class="card-link fs-3"><i
                                    class="bi bi-youtube"></i></a>
                            <a href="https://twitter.com/makerfairerome" class="card-link fs-3"><i
                                    class="bi bi-twitter"></i></a>
                            <a href="https://www.linkedin.com/company/maker-faire-rome/?originalSubdomain=it"
                                class="card-link fs-3"><i class="bi bi-linkedin"></i></a>
                            <a href="https://makerfairerome.eu/it/" class="card-link fs-3"><i class="bi bi-globe"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.card {
    background: #f5f5f5;
    transition: box-shadow .2s ease, transform .2s ease, scale .2s ease;
}

.card-title {
    color: #333;
    font-size: 1.5em;
    font-weight: 600;
    line-height: 2rem;
}

.card:hover {
    box-shadow: 0 8px 50px #23232333;
    scale: 1.05;
}

.card:hover .card-info {
    transform: translateY(-5%);
}

.card:hover .card-social {
    transform: translateY(100%);
    opacity: 1;
}
</style>