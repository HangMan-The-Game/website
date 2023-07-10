<script setup>
import Keyboard from 'simple-keyboard'
import 'simple-keyboard/build/css/index.css'
import { ref, onMounted } from 'vue';

const emit = defineEmits(["onKeyPress"])

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

</script>

<template>
    <div class="simple-keyboard"></div>
</template>