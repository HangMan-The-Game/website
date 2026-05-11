<script>
import { ref, onMounted } from 'vue';
import { auth } from '@/firebase.js';

export default {
    data() {
        return {
            user: null,
            selectedMode: localStorage.getItem('selectedMode') || 'Easy',
        };
    },
    methods: {
        startGame() {
            this.$router.push({ name: 'game' });
        },
        openModal() {
            this.$refs.modal.classList.add('show');
            document.body.classList.add('modal-open');
        },
        closeModal() {
            this.$refs.modal.classList.remove('show');
            document.body.classList.remove('modal-open');
        },
        openHelp() {
        },
        handleSelectMode() {
            this.closeModal();
            if (this.selectedMode) {
                console.log('Selected Mode:', this.selectedMode);
                localStorage.setItem('selectedMode', this.selectedMode);
            }
        },
    },
    setup() {
        const user = ref(null);

        onMounted(() => {
            auth.onAuthStateChanged((currentUser) => {
                user.value = currentUser;
            });
        });

        return {
            user,
        };
    },
};
</script>

<template>
    <section class="main-menu">
        <div class="menu-panel">
            <div class="menu-kicker"><i class="bi bi-joystick"></i> Game lobby</div>
            <div v-if="user" class="welcome-message">
                {{ $t("menu.welcome") }}, <span class="player-name">{{ user.displayName }}</span>
            </div>

            <h1>Ready for the next word?</h1>
            <div class="masked-word" aria-hidden="true"><span>_</span><span>_</span><span>N</span><span>G</span><span>_</span><span>A</span><span>_</span></div>

            <div class="selected-mode">
                {{ $t("menu.mode") }}:
                <span v-if="selectedMode === 'Easy'">{{ $t("menu.easy") }}</span>
                <span v-if="selectedMode === 'Medium'">{{ $t("menu.medium") }}</span>
                <span v-if="selectedMode === 'Hard'">{{ $t("menu.hard") }}</span>
            </div>

            <div class="menu-actions">
                <button class="btn btn-primary btn-lg" @click="startGame"><i class="bi bi-play-fill"></i>{{ $t("menu.game") }}</button>
                <button class="btn btn-secondary btn-lg" @click="openModal"><i class="bi bi-sliders"></i>{{ $t("menu.selemod") }}</button>
            </div>
        </div>

        <div class="modal" ref="modal" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">{{ $t("menu.selemod") }}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                            @click="closeModal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="mode" id="easyMode" value="Easy"
                                v-model="selectedMode">
                            <label class="form-check-label" for="easyMode">{{ $t("menu.easy") }}</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="mode" id="mediumMode" value="Medium"
                                v-model="selectedMode">
                            <label class="form-check-label" for="mediumMode">{{ $t("menu.medium") }}</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="mode" id="hardMode" value="Hard"
                                v-model="selectedMode">
                            <label class="form-check-label" for="hardMode">{{ $t("menu.hard") }}</label>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="closeModal">{{
                            $t("menu.close") }}</button>
                        <button type="button" class="btn btn-primary" @click="handleSelectMode">{{ $t("menu.select")
                        }}</button>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
[theme="custom-dark"] .modal-content {
    background-color: #43454e !important;
}

.main-menu {
    display: grid;
    min-height: calc(100vh - 170px);
    place-items: center;
    padding: clamp(2rem, 6vw, 5rem) 1rem;
}

.menu-panel {
    width: min(100%, 720px);
    padding: clamp(1.5rem, 5vw, 3rem);
    text-align: center;
    border: 1px solid var(--hm-border);
    border-radius: calc(var(--hm-radius) + 8px);
    background:
        linear-gradient(145deg, var(--hm-accent-soft), transparent 52%),
        var(--hm-surface);
    box-shadow: var(--hm-shadow);
    backdrop-filter: blur(18px);
}

.menu-kicker {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    margin-bottom: 0.8rem;
    color: var(--hm-accent);
    font-size: 0.8rem;
    font-weight: 900;
    letter-spacing: 0.12em;
    text-transform: uppercase;
}

.menu-panel h1 {
    font-size: clamp(2.3rem, 7vw, 4.3rem);
    line-height: 1;
}

.welcome-message {
    color: var(--hm-text-muted);
    font-size: 1.1rem;
    margin-bottom: 0.8rem;
}

.player-name {
    color: var(--hm-accent);
    font-weight: 900;
}

.masked-word {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    margin: 1.5rem 0;
}

.masked-word span {
    display: grid;
    width: clamp(2.15rem, 7vw, 3.3rem);
    aspect-ratio: 1;
    place-items: center;
    border: 1px solid var(--hm-border);
    border-bottom: 3px solid var(--hm-accent);
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.08);
    font-size: clamp(1.3rem, 4vw, 2rem);
    font-weight: 950;
}

.selected-mode {
    color: var(--hm-text-muted);
    font-size: 1.15rem;
}

.selected-mode span {
    color: var(--hm-success);
    font-weight: 900;
}

.menu-actions {
    display: flex;
    justify-content: center;
    gap: 0.8rem;
    margin-top: 1.5rem;
}

.menu-actions .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.45rem;
}

.modal {
    display: none;
    background-color: rgba(0, 0, 0, 0.5);
    transition: opacity 0.15s;
}

.modal.show {
    display: block;
    background-color: rgba(0, 0, 0, 0.5);
}

.modal-dialog {
    margin-top: 15%;
}

.modal-content {
    background-color: var(--hm-surface-strong);
}

.modal-title {
    margin-bottom: 0;
}

.modal-footer {
    justify-content: flex-end;
}

@media (max-width: 575.98px) {
    .menu-actions {
        flex-direction: column;
    }
}
</style>
  
