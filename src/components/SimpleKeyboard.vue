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
                "q w e r t y u i o p",
                "a s d f g h j k l",
                "z x c v b n m",
            ]
        },
        onKeyPress: onKeyPress,
    });
});

</script>

<template>
    <div class="simple-keyboard"></div>
</template>