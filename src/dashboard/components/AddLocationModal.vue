<template>
    <UModal
        :model-value="show"
        @update:model-value="$emit('update:show', $event)"
        prevent-close
        :ui="{
            overlay: {
                background: 'dark:bg-custom-gray-dashboard/75 bg-gray-200/75',
            },
            background: 'dark:bg-custom-gray bg-white',
        }"
    >
        <div class="p-6">
            <div class="flex flex-row justify-between mb-4">
                <h2 class="text-xl dark:text-white text-gray-800 mb-2">Add Location</h2>
                <UButton
                    color="gray"
                    variant="ghost"
                    icon="i-heroicons-x-mark-20-solid"
                    class="-my-1 dark:text-white text-gray-800"
                    @click="$emit('update:show', false)"
                />
            </div>
            <UInput
                v-model="searchQuery"
                @input="filterLocations"
                icon="i-heroicons-magnifying-glass-20-solid"
                size="sm"
                :trailing="false"
                placeholder="Search for the desired location..."
                class="mb-4"
                :ui="{
                    color: {
                        white: {
                            outline:
                                'shadow-sm dark:bg-custom-gray-input bg-light-input dark:text-white text-gray-800 ring-1 ring-inset dark:ring-gray-700 ring-gray-300 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400',
                        },
                    },
                }"
            />
            <div v-if="filteredLocations.length" class="mb-2 dark:text-white text-gray-800">
                <div
                    v-for="location in filteredLocations"
                    :key="location.id"
                    @click="selectLocationToAdd(location)"
                    class="cursor-pointer dark:hover:bg-gray-600 hover:bg-gray-100 p-2"
                >
                    {{ location.name }}
                </div>
            </div>
            <UButton
                block
                :loading="isAddingLocation"
                :class="[
                    isDark
                        ? 'bg-custom-cyan text-black hover:bg-blue-500'
                        : 'bg-light-accent text-white hover:bg-blue-600',
                ]"
                variant="solid"
                @click="handleAddLocation"
                :disabled="!selectedLocation || isAddingLocation"
            >
                Add Location
            </UButton>
        </div>
    </UModal>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

const toast = useToast();

const props = defineProps({
    show: {
        type: Boolean,
        required: true,
    },
    locations: {
        type: Array,
        required: true,
    },
    dashboardLocations: {
        type: Array,
        required: true,
    },
});

const emit = defineEmits(['update:show', 'add-location']);

// Theme state
const isDark = computed(() => {
    return document.documentElement.classList.contains('dark');
});

// State
const filteredLocations = ref([]);
const searchQuery = ref('');
const isAddingLocation = ref(false);
const selectedLocation = ref(null);

watch(
    () => props.show,
    (newVal) => {
        if (!newVal) {
            searchQuery.value = '';
            filteredLocations.value = [];
            selectedLocation.value = null;
        }
    }
);

// Filter locations based on search input
function filterLocations() {
    filteredLocations.value = props.locations.filter((location) => {
        return location.name.toLowerCase().includes(searchQuery.value.toLowerCase());
    });
}

// Select location to add
function selectLocationToAdd(location) {
    selectedLocation.value = location;
    searchQuery.value = location.name;
    filteredLocations.value = [];
}

// Add location to dashboard
function handleAddLocation() {
    if (!selectedLocation.value) return;

    isAddingLocation.value = true;

    // Check if location already exists in dashboard
    const locationExists = props.dashboardLocations.some(
        (location) => location.location_id === selectedLocation.value.id
    );

    if (locationExists) {
        toast.add({ title: 'This location already exists!', color: 'red', timeout: 1500 });
        isAddingLocation.value = false;
        return;
    }

    // Emit with the selected location and a callback to reset loading state
    emit('add-location', {
        location: selectedLocation.value,
        done: () => {
            isAddingLocation.value = false;
        },
    });
}
</script>
