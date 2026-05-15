<script setup>
import { ref } from 'vue';
const props = defineProps(['theme'])

</script>

<template>
    <section id="home" class="hero-section">
        <div class="hero-letters" aria-hidden="true">A _ M Y S T E R Y _ W O R D _ H A N G M A N _</div>
        <div class="container">
            <div class="row align-items-center g-5">
                <div class="col-lg-7">
                    <span class="section-kicker"><i class="bi bi-puzzle"></i> Word challenge project</span>
                    <h1 class="hero-title">HangMan - The Game</h1>
                    <p class="hero-lead" v-html="$t('jumbotron.gameDescription')"></p>
                    <div class="hero-word" aria-hidden="true">
                        <span>H</span><span>A</span><span>N</span><span>G</span><span>_</span><span>M</span><span>A</span><span>N</span>
                    </div>
                    <div class="hero-actions">
                        <RouterLink to="/menu" class="btn btn-primary btn-lg">
                            <i class="bi bi-play-fill"></i>
                            {{ $t("jumbotron.playNow") }}
                            <span class="badge rounded-pill text-bg-warning">beta</span>
                        </RouterLink>
                        <a type="button" href="#about" class="btn btn-secondary btn-lg">
                            <i class="bi bi-arrow-down-circle"></i>
                            {{ $t("jumbotron.learnMore") }}
                        </a>
                    </div>
                    <div class="hero-stats" aria-label="Project highlights">
                        <div>
                            <strong>3</strong>
                            <span>difficulty levels</span>
                        </div>
                        <div>
                            <strong>6</strong>
                            <span>attempts</span>
                        </div>
                        <div>
                            <strong>∞</strong>
                            <span>word puzzles</span>
                        </div>
                    </div>
                </div>
                <div class="col-lg-5">
                    <div class="hangman-preview">
                        <div class="preview-top">
                            <span class="status-dot"></span>
                            <span>LIVE DEMO</span>
                        </div>
                        <img v-if="props.theme" class="img-fluid" src="../assets/images/HangManGameWhite.svg"
                            alt="Logo HangMan - The Game in versione chiara" fetchpriority="high">
                        <img v-else class="img-fluid" src="../assets/images/HangManGame.svg"
                            alt="Logo HangMan - The Game in versione scura" fetchpriority="high">
                        <div class="preview-keyboard" aria-hidden="true">
                            <span v-for="letter in ['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L']"
                                :key="letter">{{ letter }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.hero-section {
    position: relative;
    min-height: calc(100vh - 78px);
    display: flex;
    align-items: center;
    overflow: hidden;
    padding: clamp(4rem, 9vw, 7rem) 0 clamp(3rem, 7vw, 5.5rem);
}

:global(body[theme="custom-light"]) .hero-section {
    background:
        radial-gradient(circle at 12% 10%, rgba(255, 77, 77, 0.08), transparent 22rem),
        linear-gradient(135deg, #fff7f6, #fffdfb);
}

.hero-section::after {
    position: absolute;
    right: -12rem;
    bottom: -16rem;
    width: 40rem;
    height: 40rem;
    content: "";
    border: 1px solid rgba(255, 77, 77, 0.18);
    border-radius: 50%;
    background: radial-gradient(circle, var(--hm-accent-soft), transparent 62%);
}

.hero-letters {
    position: absolute;
    top: 7rem;
    left: 50%;
    width: 110vw;
    color: rgba(255, 255, 255, 0.055);
    font-size: clamp(4rem, 10vw, 9rem);
    font-weight: 900;
    line-height: 1;
    white-space: nowrap;
    transform: translateX(-50%) rotate(-4deg);
    user-select: none;
}

:global(body[theme="custom-light"]) .hero-letters {
    color: rgba(179, 54, 54, 0.075);
}

.hero-title {
    max-width: 760px;
    color: var(--hm-heading);
    font-size: clamp(3.4rem, 9vw, 7rem);
    font-weight: 950;
    letter-spacing: 0;
    line-height: 0.92;
}

.hero-lead {
    max-width: 680px;
    margin: 1.5rem 0;
    color: var(--hm-text-muted);
    font-size: clamp(1.12rem, 2vw, 1.35rem);
}

.hero-word {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin: 1.8rem 0;
}

.hero-word span {
    display: grid;
    width: clamp(2.4rem, 5vw, 3.65rem);
    aspect-ratio: 1;
    place-items: center;
    color: var(--hm-heading);
    border: 1px solid var(--hm-border);
    border-bottom: 3px solid var(--hm-accent);
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.08);
    font-size: clamp(1.25rem, 3vw, 2rem);
    font-weight: 900;
    box-shadow: var(--hm-shadow-soft);
}

.hero-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.85rem;
    margin-bottom: 2rem;
}

.hero-actions .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
}

.hero-stats {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 0.75rem;
    max-width: 560px;
}

.hero-stats div {
    padding: 1rem;
    border: 1px solid var(--hm-border);
    border-radius: var(--hm-radius-sm);
    background: rgba(255, 255, 255, 0.06);
}

.hero-stats strong {
    display: block;
    color: var(--hm-accent);
    font-size: 1.8rem;
    line-height: 1;
}

.hero-stats span {
    color: var(--hm-text-muted);
    font-size: 0.85rem;
}

.hangman-preview {
    position: relative;
    z-index: 1;
    max-width: 420px;
    margin-left: auto;
    padding: clamp(1rem, 3vw, 1.75rem);
    border: 1px solid var(--hm-border);
    border-radius: calc(var(--hm-radius) + 10px);
    background:
        linear-gradient(160deg, var(--hm-accent-soft), transparent 46%),
        var(--hm-surface);
    box-shadow: var(--hm-shadow);
    backdrop-filter: blur(16px);
}

:global(body[theme="custom-light"]) .hangman-preview {
    background:
        linear-gradient(160deg, rgba(255, 77, 77, 0.10), transparent 46%),
        rgba(255, 255, 255, 0.86);
}

.preview-top {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
    color: var(--hm-text-muted);
    font-size: 0.75rem;
    font-weight: 900;
    letter-spacing: 0.12em;
}

.status-dot {
    width: 0.72rem;
    height: 0.72rem;
    border-radius: 50%;
    background: var(--hm-success);
    box-shadow: 0 0 18px var(--hm-success);
}

.hangman-preview img {
    width: 100%;
    min-height: 220px;
    object-fit: contain;
    filter: drop-shadow(0 18px 32px rgba(0, 0, 0, 0.28));
}

.preview-keyboard {
    display: grid;
    grid-template-columns: repeat(10, minmax(0, 1fr));
    gap: 0.35rem;
    margin-top: 1.25rem;
}

.preview-keyboard span {
    display: grid;
    aspect-ratio: 1.2;
    place-items: center;
    color: var(--hm-text);
    border: 1px solid var(--hm-border);
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.07);
    font-size: 0.75rem;
    font-weight: 900;
}

@media (max-width: 991.98px) {
    .hero-section {
        min-height: auto;
        text-align: center;
    }

    .section-kicker,
    .hero-actions {
        justify-content: center;
    }

    .hero-word,
    .hero-stats {
        justify-content: center;
        margin-right: auto;
        margin-left: auto;
    }

    .hangman-preview {
        margin-right: auto;
    }
}

@media (max-width: 575.98px) {
    .hero-title {
        font-size: 2.45rem;
        line-height: 1.02;
    }

    .hero-lead {
        font-size: 1rem;
    }

    .hero-section .section-kicker {
        max-width: 100%;
        justify-content: center;
        white-space: normal;
        font-size: 0.68rem;
    }

    .hero-word {
        gap: 0.35rem;
    }

    .hero-word span {
        width: 2.25rem;
        border-radius: 10px;
    }

    .hero-stats {
        grid-template-columns: 1fr;
    }

    .preview-keyboard {
        grid-template-columns: repeat(7, minmax(0, 1fr));
    }
}
</style>
