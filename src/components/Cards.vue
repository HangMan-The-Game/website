<script setup></script>

<template>
    <section id="team">
        <h1 class="text-center mb-5 mt-5 fw-bold"><i class="bi bi-code"></i> {{ $t("nav3") }} <i class="bi bi-code"></i>
        </h1>

        <div class="container">
            <div class="row">
                <div class="col-md-4 d-flex align-items-stretch mb-5">
                    <div class="card mx-auto" style="width: 18rem">
                        <div class="card-body">
                            <h5 class="card-title text-center">Michele Turco</h5>
                            <p class="card-text text-center">CEO & Developer</p>
                        </div>
                        <div class="card-body text-center">
                            <h5>Socials</h5>
                            <a href="#" class="card-link fs-3"><i class="bi bi-github"></i></a>
                            <a href="#" class="card-link fs-3"><i class="bi bi-instagram"></i></a>
                            <a href="#" class="card-link fs-3"><i class="bi bi-twitter"></i></a>
                        </div>
                    </div>
                </div>
                <div class="col-md-4 d-flex align-items-stretch mb-5">
                    <div class="card mx-auto" style="width: 18rem">
                        <div class="card-body">
                            <h5 class="card-title text-center">Alessandro Runza</h5>
                            <p class="card-text text-center">Developer</p>
                        </div>
                        <div class="card-body text-center">
                            <h5>Socials</h5>
                            <a href="#" class="card-link fs-3"><i class="bi bi-github"></i></a>
                            <a href="#" class="card-link fs-3"><i class="bi bi-instagram"></i></a>
                            <a href="#" class="card-link fs-3"><i class="bi bi-twitter"></i></a>
                            <a href="#" class="card-link fs-3"><i class="bi bi-linkedin"></i></a>
                        </div>
                    </div>
                </div>
                <div class="col-md-4 d-flex align-items-stretch mb-5">
                    <div class="card mx-auto" style="width: 18rem">
                        <div class="card-body">
                            <h5 class="card-title text-center">Gandolfo Amico</h5>
                            <p class="card-text text-center">Developer & Social Media Manager</p>
                        </div>
                        <div class="card-body text-center">
                            <h5>Socials</h5>
                            <a href="#" class="card-link fs-3"><i class="bi bi-github"></i></a>
                            <a href="#" class="card-link fs-3"><i class="bi bi-instagram"></i></a>
                            <a href="#" class="card-link fs-3"><i class="bi bi-twitter"></i></a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 d-flex align-items-stretch mb-5">
                    <div class="card mx-auto" style="width: 18rem">
                        <div class="card-body">
                            <h5 class="card-title text-center">Emanuele Dolce</h5>
                            <p class="card-text text-center">Developer & 3D Modeler</p>
                        </div>
                        <div class="card-body text-center">
                            <h5>Socials</h5>
                            <a href="#" class="card-link fs-3"><i class="bi bi-github"></i></a>
                            <a href="#" class="card-link fs-3"><i class="bi bi-linkedin"></i></a>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 d-flex align-items-stretch mb-5">
                    <div class="card mx-auto" style="width: 18rem">
                        <div class="card-body">
                            <h5 class="card-title text-center">Calogero Frisina</h5>
                            <p class="card-text text-center">3D Modeler</p>
                        </div>
                        <div class="card-body text-center">
                            <h5>Socials</h5>
                            <a href="#" class="card-link fs-3"><i class="bi bi-github"></i></a>
                            <a href="#" class="card-link fs-3"><i class="bi bi-instagram"></i></a>
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
    transition: box-shadow .3s ease, transform .2s ease;
}

.card-title {
    color: #333;
    font-size: 1.5em;
    font-weight: 600;
    line-height: 2rem;
}

.card:hover {
    box-shadow: 0 8px 50px #23232333;
}

.card:hover .card-info {
    transform: translateY(-5%);
}

.card:hover .card-social {
    transform: translateY(100%);
    opacity: 1;
}
</style>
