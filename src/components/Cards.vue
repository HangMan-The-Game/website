<script setup></script>

<template>
    <section id="team" class="team-section section-shell">
        <div class="container">
            <div class="text-center mb-5">
                <span class="section-kicker justify-content-center"><i class="bi bi-code-slash"></i> Built by students</span>
                <h1 class="section-title">{{ $t("navbar.team") }}</h1>
            </div>

            <div class="row g-4">
                <div class="col-md-4 d-flex align-items-stretch mb-5">
                    <div class="card team-card mx-auto">
                        <div class="card-body">
                            <h5 class="card-title text-center">Michele Turco</h5>
                            <p class="card-text text-center">CEO & Developer</p>
                        </div>
                        <div class="card-body text-center team-socials">
                            <h5>Socials</h5>
                            <a href="https://github.com/mich242" class="card-link"><i class="bi bi-github"></i></a>
                            <a href="https://www.instagram.com/michele_.turco/" class="card-link"><i
                                    class="bi bi-instagram"></i></a>
                            <a href="https://twitter.com/mich243" class="card-link"><i class="bi bi-twitter"></i></a>
                        </div>
                    </div>
                </div>
                <div class="col-md-4 d-flex align-items-stretch mb-5">
                    <div class="card team-card mx-auto">
                        <div class="card-body">
                            <h5 class="card-title text-center">Alessandro Runza</h5>
                            <p class="card-text text-center">Developer</p>
                        </div>
                        <div class="card-body text-center team-socials">
                            <h5>Socials</h5>
                            <a href="https://github.com/alerunza" class="card-link"><i class="bi bi-github"></i></a>
                            <a href="https://www.instagram.com/alerunza/" class="card-link"><i
                                    class="bi bi-instagram"></i></a>
                            <a href="https://twitter.com/AleRunza" class="card-link"><i class="bi bi-twitter"></i></a>
                            <a href="https://www.linkedin.com/in/alerunza/" class="card-link"><i
                                    class="bi bi-linkedin"></i></a>
                        </div>
                    </div>
                </div>
                <div class="col-md-4 d-flex align-items-stretch mb-5">
                    <div class="card team-card mx-auto">
                        <div class="card-body">
                            <h5 class="card-title text-center">Gandolfo Amico</h5>
                            <p class="card-text text-center">Developer & Social Media Manager</p>
                        </div>
                        <div class="card-body text-center team-socials">
                            <h5>Socials</h5>
                            <a href="https://github.com/imgaandy" class="card-link"><i class="bi bi-github"></i></a>
                            <a href="https://www.instagram.com/imgaandy_/" class="card-link"><i
                                    class="bi bi-instagram"></i></a>
                            <a href="https://twitter.com/imgaandy" class="card-link"><i class="bi bi-twitter"></i></a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row g-4 justify-content-center">
                <div class="col-md-6 d-flex align-items-stretch mb-5">
                    <div class="card team-card mx-auto">
                        <div class="card-body">
                            <h5 class="card-title text-center">Emanuele Dolce</h5>
                            <p class="card-text text-center">3D Modeler</p>
                        </div>
                        <div class="card-body text-center team-socials">
                            <h5>Socials</h5>
                            <a href="https://github.com/emadol" class="card-link"><i class="bi bi-github"></i></a>
                            <a href="https://www.linkedin.com/in/emanuele-d-403a46242" class="card-link"><i
                                    class="bi bi-linkedin"></i></a>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 d-flex align-items-stretch mb-5">
                    <div class="card team-card mx-auto">
                        <div class="card-body">
                            <h5 class="card-title text-center">Calogero Frisina</h5>
                            <p class="card-text text-center">Hardware Technician</p>
                        </div>
                        <div class="card-body text-center team-socials">
                            <h5>Socials</h5>
                            <a href="https://www.instagram.com/calogero_028/" class="card-link"><i
                                    class="bi bi-instagram"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.team-section {
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.02), var(--hm-accent-soft));
}

.team-card {
    width: min(100%, 20rem);
    min-height: 238px;
    border-color: rgba(255, 77, 77, 0.20);
    background:
        radial-gradient(circle at 20% 0%, rgba(255, 77, 77, 0.18), transparent 44%),
        linear-gradient(145deg, rgba(255, 255, 255, 0.13), rgba(255, 255, 255, 0.035)),
        rgba(20, 25, 42, 0.50);
    box-shadow: 0 18px 54px rgba(0, 0, 0, 0.22);
    backdrop-filter: blur(22px) saturate(1.22);
    -webkit-backdrop-filter: blur(22px) saturate(1.22);
    transition: box-shadow .2s ease, transform .2s ease, border-color .2s ease;
}

.team-card::before {
    display: block;
    height: 5px;
    content: "";
    background: linear-gradient(90deg, var(--hm-primary), var(--hm-primary-strong), var(--hm-gold));
}

.card-title {
    font-size: 1.5em;
    font-weight: 850;
    line-height: 2rem;
}

.card-text {
    color: var(--hm-text-muted);
    font-weight: 650;
}

.team-socials {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.45rem;
    padding-top: 0.35rem;
}

.team-socials h5 {
    flex: 0 0 100%;
    margin-bottom: 0.35rem;
    color: var(--hm-text-muted);
    font-size: 0.82rem;
    font-weight: 850;
    letter-spacing: 0.08em;
    text-transform: uppercase;
}

.team-card:hover {
    transform: translateY(-8px);
    border-color: rgba(255, 77, 77, 0.44);
    box-shadow: 0 26px 80px rgba(255, 77, 77, 0.16), var(--hm-shadow);
}

.card-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex: 0 0 auto;
    width: 2.55rem;
    height: 2.55rem;
    place-items: center;
    margin: 0;
    color: var(--hm-text);
    border: 1px solid var(--hm-border);
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.09);
    backdrop-filter: blur(10px);
    line-height: 1;
    text-decoration: none;
}

.card-link i {
    display: block;
    font-size: 1.15rem;
    line-height: 1;
}

.card-link:hover {
    color: var(--hm-accent);
    transform: translateY(-2px);
}

:global(body[theme="custom-light"]) .team-card {
    background:
        radial-gradient(circle at 20% 0%, rgba(255, 77, 77, 0.12), transparent 44%),
        linear-gradient(145deg, rgba(255, 255, 255, 0.82), rgba(255, 77, 77, 0.055)),
        rgba(255, 255, 255, 0.72);
    box-shadow: 0 18px 54px rgba(179, 54, 54, 0.13);
}
</style>
