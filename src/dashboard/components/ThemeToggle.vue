<template>
    <div>
        <UButton
            @click="toggleTheme"
            variant="ghost"
            :icon="isDark ? 'i-heroicons-sun' : 'i-heroicons-moon'"
            :class="isDark ? 'text-white' : 'text-gray-800'"
        />
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';

const isDark = ref(true);

onMounted(() => {
    // Check if user has a preference saved in localStorage
    const savedTheme = localStorage.getItem('color-theme');

    if (savedTheme === 'light') {
        isDark.value = false;
        document.documentElement.classList.remove('dark');
    } else {
        isDark.value = true;
        document.documentElement.classList.add('dark');
    }
});

function toggleTheme() {
    isDark.value = !isDark.value;

    if (isDark.value) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('color-theme', 'dark');
    } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('color-theme', 'light');
    }
}
</script>
