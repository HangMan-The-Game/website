<template>
    <div class="main-menu">
        <div v-if="user">
            <div class="welcome-message">
                Welcome, <span class="text-danger fw-bold">{{ user.displayName }}</span>
            </div>
        </div>

        <div class="welcome-message">
            Mode selected: <span class="text-success fw-bold">{{ selectedMode }}</span>
        </div>

        <div class="d-grid gap-3 w-25 mx-auto">
            <button class="btn btn-primary btn-lg" @click="startGame">Start Game</button>
            <button class="btn btn-secondary btn-lg" @click="openModal">Select Mode</button>
            <button class="btn btn-info btn-lg" @click="openHelp">Help</button>
        </div>

        <div class="modal" ref="modal" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Select Mode</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                            @click="closeModal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="mode" id="easyMode" value="Easy"
                                v-model="selectedMode">
                            <label class="form-check-label" for="easyMode">Easy</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="mode" id="mediumMode" value="Medium"
                                v-model="selectedMode">
                            <label class="form-check-label" for="mediumMode">Medium</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="mode" id="hardMode" value="Hard"
                                v-model="selectedMode">
                            <label class="form-check-label" for="hardMode">Hard</label>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                            @click="closeModal">Close</button>
                        <button type="button" class="btn btn-primary" @click="handleSelectMode">Select</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
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
            console.log('Start Game');
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
            console.log('Open Help');
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
  
<style scoped>
.main-menu {
    margin-top: 100px;
    padding: 0 20px;
}

.welcome-message {
    font-size: 1.5rem;
    text-align: center;
    margin-bottom: 10px;
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
    background-color: #fff;
}

.modal-title {
    margin-bottom: 0;
}

.modal-footer {
    justify-content: flex-end;
}
</style>
  