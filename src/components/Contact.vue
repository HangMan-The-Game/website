<script setup></script>

<template>
    <section class="contact-page">
        <div class="contact-panel">
            <div class="text-center">
                <span class="section-kicker justify-content-center"><i class="bi bi-send"></i> Contact</span>
                <h1>{{ $t("navbar.contactUs") }}</h1>
                <h3>{{ $t("contact.unavailableEmail") }}</h3>
                <p v-html="$t('contact.contactViaInstagram')"></p>
            </div>

        <form>
            <div class="input-group mb-3">
                <span class="input-group-text">{{ $t("contact.firstName") }}</span>
                <input type="text" aria-label="First name" class="form-control" disabled>
                <span class="input-group-text">{{ $t("contact.lastName") }}</span>
                <input type="text" aria-label="Last name" class="form-control" disabled>
            </div>
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">{{ $t("contact.emailAddress") }}</label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" disabled>
                <!-- <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div> -->
            </div>
            <div class="mb-3">
                <!-- <span class="input-group-text">With textarea</span> -->
                <label for="exampleInputEmail1" class="form-label">{{ $t("contact.message") }}</label>
                <textarea class="form-control" aria-label="With textarea" disabled></textarea>
            </div>
            <!-- <div class="mb-3 form-check">
                <input type="checkbox" class="form-check-input" id="exampleCheck1">
                <label class="form-check-label" for="exampleCheck1">Check me out</label>
            </div> -->
            <div class="text-center">
                <button id="disabled" type="submit" class="btn btn-primary btn-lg disabled fs-5">{{ $t("contact.submit") }}
                    <span class="badge rounded-pill text-bg-warning">WIP</span></button>
            </div>
        </form>
        </div>
        <!-- <div>
            <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">@</span>
                <input type="text" class="form-control" placeholder="Username" aria-label="Username"
                    aria-describedby="basic-addon1">
            </div>

            <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="Recipient's username" aria-label="Recipient's username"
                    aria-describedby="basic-addon2">
                <span class="input-group-text" id="basic-addon2">@example.com</span>
            </div>

            <div class="mb-3">
                <label for="basic-url" class="form-label">Your vanity URL</label>
                <div class="input-group">
                    <span class="input-group-text" id="basic-addon3">https://example.com/users/</span>
                    <input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3 basic-addon4">
                </div>
                <div class="form-text" id="basic-addon4">Example help text goes outside the input group.</div>
            </div>

            <div class="input-group mb-3">
                <span class="input-group-text">$</span>
                <input type="text" class="form-control" aria-label="Amount (to the nearest dollar)">
                <span class="input-group-text">.00</span>
            </div>

            <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="Username" aria-label="Username">
                <span class="input-group-text">@</span>
                <input type="text" class="form-control" placeholder="Server" aria-label="Server">
            </div>
        </div> -->
    </section>
</template>

<style scoped>
.contact-page {
    padding: clamp(2rem, 7vw, 5rem) 1rem;
}

.contact-panel {
    width: min(100%, 900px);
    margin: 0 auto;
    padding: clamp(1.4rem, 4vw, 2.6rem);
    border: 1px solid var(--hm-border);
    border-radius: calc(var(--hm-radius) + 8px);
    background: var(--hm-surface);
    box-shadow: var(--hm-shadow);
    backdrop-filter: blur(18px);
}

.contact-panel h1 {
    font-size: clamp(2.4rem, 7vw, 4.5rem);
}

.contact-panel h3 {
    color: var(--hm-text);
    font-size: clamp(1.1rem, 3vw, 1.55rem);
}

.contact-panel p {
    max-width: 720px;
    margin: 1rem auto 2rem;
    color: var(--hm-text-muted);
    font-size: 1.12rem;
}

form {
    padding: clamp(1rem, 3vw, 1.5rem);
    border: 1px solid var(--hm-border);
    border-radius: var(--hm-radius);
    background: rgba(255, 255, 255, 0.045);
}

form:hover {
    transform: translateY(-3px);
}

#disabled {
    cursor: not-allowed !important;
    opacity: 0.75;
}
</style>
