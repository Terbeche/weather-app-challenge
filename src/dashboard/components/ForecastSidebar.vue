<template>
    <USlideover
        v-model="showSidebar"
        prevent-close
        :ui="{
            overlay: {
                background: 'bg-custom-gray-dashboard/75 dark:bg-gray-800/75',
            },
        }"
    >
        <div class="flex flex-col flex-1 bg-custom-gray-dashboard px-8 overflow-y-auto max-h-screen">
            <div class="flex items-center justify-between bg-custom-gray-dashboard mt-6">
                <h2 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                    <h3 v-if="location" class="text-xl text-white">{{ location.name }}, {{ location.country }}</h3>
                </h2>
                <UButton
                    color="gray"
                    variant="ghost"
                    icon="i-heroicons-x-mark-20-solid"
                    class="text-custom-gray-text"
                    @click="showSidebar = false"
                />
            </div>
            <span class="text-custom-gray-text mt-4 mb-2">This week</span>

            <div v-if="location">
                <div v-for="(tempMin, index) in location.temperature_min" :key="index">
                    <div class="flex justify-between text-white py-1 px-4 mb-2 bg-custom-gray rounded-lg">
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
                                <span class="text-custom-gray-text">Min.</span><span>{{ tempMin }}°C</span>
                            </div>
                            <div class="flex gap-6">
                                <span class="text-custom-gray-text">Max.</span
                                ><span>{{ location.temperature_max[index] }}°C</span>
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
    },
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
