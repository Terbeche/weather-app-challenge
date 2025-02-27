<template>
    <UTable
        :loading="loading"
        :loading-state="{ icon: 'i-heroicons-arrow-path-20-solid', label: '' }"
        :progress="null"
        :columns="columns"
        :rows="locations"
        @select="$emit('select-location', $event)"
        :ui="{
            thead: 'dark:bg-custom-gray bg-gray-100',
            tbody: 'dark:bg-custom-gray-dashboard bg-white',
            tr: 'dark:hover:bg-gray-700 hover:bg-gray-50',
        }"
    >
        <template #empty-state>
            <div v-if="locations.length === 0" class="flex flex-col items-center justify-center py-6 gap-3">
                <span class="italic text-sm">No Location here!</span>
            </div>
        </template>
        <template #name-data="{ row }">
            <div class="flex flex-row gap-4">
                <img class="justify-self-center" :src="icons[getWeatherIcon(row.weather_code)]" alt="Weather Icon" />
                <span class="justify-self-center self-center">{{ row.name }}</span>
            </div>
        </template>
        <template #actions-data="{ row }">
            <UButton
                color="gray"
                class="hover:text-red-600"
                variant="ghost"
                icon="i-heroicons-trash"
                @click.stop="$emit('remove-location', row)"
            />
        </template>
    </UTable>
</template>

<script setup>
import { ref } from 'vue';
import { useWeatherIcons } from '@/composables/useWeatherIcons';

const { icons, getWeatherIcon } = useWeatherIcons();

defineProps({
    locations: {
        type: Array,
        required: true,
    },
    loading: {
        type: Boolean,
        default: false,
    },
});

defineEmits(['select-location', 'remove-location']);

const columns = ref([
    {
        key: 'name',
        label: 'Location',
    },
    {
        key: 'temperature',
        label: 'Temperature',
    },
    {
        key: 'rainfall',
        label: 'Rainfall',
    },
    {
        key: 'actions',
    },
]);
</script>
