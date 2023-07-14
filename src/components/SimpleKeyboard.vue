<script setup>
import { objectEntries } from '@vueuse/core';
import Keyboard from 'simple-keyboard'
import 'simple-keyboard/build/css/index.css'
import { ref, onMounted, watch } from 'vue';

const emit = defineEmits(["onKeyPress"])

const props = defineProps({
    guessedLetters: Object,
})

const keyboard = ref(null);

const onKeyPress = (button) => {
    emit("onKeyPress", button)
};

onMounted(() => {
    keyboard.value = new Keyboard("simple-keyboard", {
        layout: {
            default: [
                "Q W E R T Y U I O P",
                "A S D F G H J K L",
                "Z X C V B N M",
            ]
        },
        onKeyPress: onKeyPress,
    });
});

watch(() => props.guessedLetters, (guessedLetters, prevGuessedLetters) => {
    keyboard.value.addButtonTheme(
        guessedLetters.wrong.join(" "),
        "wrong"
    );
    keyboard.value.addButtonTheme(
        guessedLetters.correct.join(" "),
        "correct"
    )
}, {
    "deep": true
})

</script>

<template>
    <div id="keyboard" class="simple-keyboard"></div>
</template>

<style>
div.wrong {
    background-color: #ce2525 !important;
}

div.correct {
    background-color: #17b637 !important;
}
</style>