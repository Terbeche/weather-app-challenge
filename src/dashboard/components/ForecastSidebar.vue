<template>
    <USlideover
        v-model="showSidebar"
        prevent-close
        :ui="{
            overlay: {
                background: 'dark:bg-custom-gray-dashboard/75 bg-gray-200/75',
            },
            base: 'dark:bg-custom-gray-dashboard bg-light-bg',
        }"
    >
        <div class="flex flex-col flex-1 dark:bg-custom-gray-dashboard bg-light-bg px-8 overflow-y-auto max-h-screen">
            <div class="flex items-center justify-between mt-6">
                <h2 class="text-base font-semibold leading-6 dark:text-white text-gray-900">
                    <h3 v-if="location" class="text-xl dark:text-white text-gray-900">
                        {{ location.name }}, {{ location.country }}
                    </h3>
                </h2>
                <UButton
                    color="gray"
                    variant="ghost"
                    icon="i-heroicons-x-mark-20-solid"
                    class="dark:text-custom-gray-text text-gray-600"
                    @click="showSidebar = false"
                />
            </div>
            <span class="dark:text-custom-gray-text text-gray-600 mt-4 mb-2">This week</span>

            <div v-if="location">
                <div v-for="(tempMin, index) in location.temperature_min" :key="index">
                    <div
                        class="flex justify-between dark:text-white text-gray-900 py-1 px-4 mb-2 dark:bg-custom-gray bg-white rounded-lg shadow-sm"
                    >
                        <div class="flex flex-row gap-2 justify-items-center items-center">
                            <img
                                class="justify-self-center"
                                :src="icons[getWeatherIcon(location.weather_code[index])]"
                                alt="Weather Icon"
                            />
                            <h4 class="text-xl font-bold">{{ getDayOfWeek(location.time[index]) }}</h4>
                        </div>
                        <div class="flex flex-col">
                            <div class="flex gap-6">
                                <span class="dark:text-custom-gray-text text-gray-600">Min.</span>
                                <span>{{ tempMin }}°C</span>
                            </div>
                            <div class="flex gap-6">
                                <span class="dark:text-custom-gray-text text-gray-600">Max.</span>
                                <span>{{ location.temperature_max[index] }}°C</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </USlideover>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useWeatherIcons } from '@/composables/useWeatherIcons';

const props = defineProps<{
    location: {
        name: string;
        country: string;
        temperature_min: number[];
        temperature_max: number[];
        weather_code: number[];
        time: string[];
    };
    show: boolean;
}>();

const emit = defineEmits(['close']);
const showSidebar = ref(props.show);

const { icons, getWeatherIcon } = useWeatherIcons();

watch(
    () => props.show,
    (newVal) => {
        showSidebar.value = newVal;
    }
);

watch(showSidebar, (newVal) => {
    if (!newVal) {
        emit('close');
    }
});

function close() {
    showSidebar.value = false;
}

function getDayOfWeek(dateString: string) {
    return new Date(dateString).toLocaleDateString('en-US', { weekday: 'long' });
}
</script>
