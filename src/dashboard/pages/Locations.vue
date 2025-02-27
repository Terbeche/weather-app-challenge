<template>
    <div>
        <div class="m-12 my-0 pt-4 flex flex-col">
            <div class="flex flex-row mb-12 mt-0 gap-2 items-center">
                <img class="w-12" src="~/assets/icons/5.svg" alt="Vue logo" />
                <h1 class="text-xl font-bold">Weather App</h1>
            </div>
            <div class="flex justify-between mb-4">
                <span class="text-3xl font-bold">Locations</span>
                <UButton
                    @click="openAddLocationForm"
                    icon="i-heroicons-plus"
                    size="sm"
                    variant="solid"
                    label="Add Location"
                    :trailing="false"
                    class="bg-custom-cyan text-black hover:bg-custom-cyan mb-4 hover:bg-blue-500"
                />
            </div>
        </div>
        <div class="m-12 mt-0">
            <!-- Locations Table -->
            <UTable
                :loading="isLoading"
                :loading-state="{ icon: 'i-heroicons-arrow-path-20-solid', label: '' }"
                :progress="null"
                :columns="columns"
                :rows="dashboardLocations"
                @select="selectLocationDetails"
            >
                <template #empty-state>
                    <div
                        v-if="dashboardLocations.length === 0"
                        class="flex flex-col items-center justify-center py-6 gap-3"
                    >
                        <span class="italic text-sm">No Location here!</span>
                    </div>
                </template>
                <template #name-data="{ row }">
                    <div class="flex flex-row gap-4">
                        <img
                            class="justify-self-center"
                            :src="icons[getWeatherIcon(row.weather_code)]"
                            alt="Weather Icon"
                        />
                        <span class="justify-self-center self-center">{{ row.name }}</span>
                    </div>
                </template>
                <template #actions-data="{ row }">
                    <UButton
                        color="gray"
                        class="hover:text-red-600"
                        variant="ghost"
                        icon="i-heroicons-trash"
                        @click.stop="selectLocationToRemove(row)"
                    />
                </template>
            </UTable>

            <!-- Delete Location Modal -->
            <UModal
                v-model="showDeleteModal"
                prevent-close
                :ui="{
                    overlay: {
                        background: 'bg-custom-gray-dashboard/75 dark:bg-gray-800/75',
                    },
                    background: 'bg-custom-gray dark:bg-gray-900',
                }"
            >
                <div class="p-6 bg-custom-gray rounded-lg">
                    <div class="flex flex-row justify-between">
                        <p class="text-white">Are you sure you want to remove this location?</p>
                        <UButton
                            color="gray"
                            variant="ghost"
                            icon="i-heroicons-x-mark-20-solid"
                            class="-my-1 text-white"
                            @click="showDeleteModal = false"
                        />
                    </div>
                    <div class="mt-6 flex flex-col space-y-2">
                        <UButton block color="gray" variant="solid" @click="showDeleteModal = false">Cancel</UButton>
                        <UButton block color="red" variant="solid" @click="handleRemoveLocation()">Delete</UButton>
                    </div>
                </div>
            </UModal>

            <!-- Add Location Modal -->
            <UModal
                v-model="showAddLocationModal"
                prevent-close
                :ui="{
                    overlay: {
                        background: 'bg-custom-gray-dashboard/75 dark:bg-gray-800/75',
                    },
                    background: 'bg-custom-gray dark:bg-gray-900',
                }"
            >
                <div class="p-6">
                    <div class="flex flex-row justify-between mb-4">
                        <h2 class="text-xl text-white mb-2">Add Location</h2>
                        <UButton
                            color="gray"
                            variant="ghost"
                            icon="i-heroicons-x-mark-20-solid"
                            class="-my-1 text-white"
                            @click="showAddLocationModal = false"
                        />
                    </div>
                    <UInput
                        v-model="searchQuery"
                        @input="filterLocations"
                        icon="i-heroicons-magnifying-glass-20-solid"
                        size="sm"
                        :trailing="false"
                        placeholder="Search for the desired location..."
                        class="mb-4 text-white"
                        :ui="{
                            color: {
                                white: {
                                    outline:
                                        'shadow-sm bg-custom-gray-input dark:bg-gray-900 text-white-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400',
                                },
                            },
                        }"
                    />
                    <div v-if="filteredLocations.length" class="mb-2 text-white">
                        <div
                            v-for="location in filteredLocations"
                            :key="location.id"
                            @click="selectLocationToAdd(location)"
                            class="cursor-pointer hover:bg-gray-600"
                        >
                            {{ location.name }}
                        </div>
                    </div>
                    <UButton
                        block
                        :loading="isAddingLocation"
                        class="bg-custom-cyan text-black hover:bg-blue-500"
                        variant="solid"
                        @click="handleAddLocation"
                    >
                        Add Location
                    </UButton>
                </div>
            </UModal>
        </div>
        <div class="bg-black">
            <ForecastSidebar :show="showSidebar" :location="selectedLocationDetails" @close="showSidebar = false" />
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useLocations } from '@/composables/useLocations';
import { useWeatherIcons } from '@/composables/useWeatherIcons';

// Composables
const toast = useToast();
const { icons, getWeatherIcon } = useWeatherIcons();
const {
    locations,
    dashboardLocations,
    isLoading: locationsLoading,
    addLocation,
    removeLocation,
    getLocationForecast,
} = useLocations();

// State
const filteredLocations = ref([]);
const columns = ref([
    {
        key: 'name',
        label: 'Location',
        class: 'bg-custom-gray text-white',
    },
    {
        key: 'temperature',
        label: 'Temperature',
        class: 'bg-custom-gray text-white',
    },
    {
        key: 'rainfall',
        label: 'Rainfall',
        class: 'bg-custom-gray text-white',
    },
    {
        key: 'actions',
        class: 'bg-custom-gray text-white',
    },
]);

const showAddLocationModal = ref(false);
const showDeleteModal = ref(false);
const showSidebar = ref(false);
const searchQuery = ref('');
const isLoading = ref(true);
const isAddingLocation = ref(false);

// Selected items
const selectedLocationToAdd = ref(null);
const selectedLocationToRemove = ref(null);
const selectedLocationDetails = ref(null);

watch(locationsLoading, (newVal) => {
    isLoading.value = newVal;
});

watch(showAddLocationModal, (newVal) => {
    if (!newVal) {
        searchQuery.value = '';
        filteredLocations.value = [];
    }
});

// Filter locations based on search input
function filterLocations() {
    filteredLocations.value = locations.value.filter((location) => {
        return location.name.toLowerCase().includes(searchQuery.value.toLowerCase());
    });
}

// openAddLocationForm
function openAddLocationForm() {
    showAddLocationModal.value = true;
}

// Select location to add
function selectLocationToAdd(location) {
    selectedLocationToAdd.value = location;
    searchQuery.value = location.name;
    filteredLocations.value = [];
}

// Add location to dashboard
async function handleAddLocation() {
    if (!selectedLocationToAdd.value) return;
    isAddingLocation.value = true;
    const locationExists = dashboardLocations.value.some(
        (location) => location.location_id === selectedLocationToAdd.value?.id
    );
    if (locationExists) {
        toast.add({ title: 'This location already exists!', color: 'red', timeout: 1500 });
        isAddingLocation.value = false;
        return;
    }

    const success = await addLocation(selectedLocationToAdd.value.id);
    if (success) {
        toast.add({ title: 'Location added successfully!', color: 'green' });
    } else {
        toast.add({ title: 'Failed to add location', color: 'red' });
    }

    showAddLocationModal.value = false;
    selectedLocationToAdd.value = null;
    isAddingLocation.value = false;
}

// Select location to remove
function selectLocationToRemove(location) {
    selectedLocationToRemove.value = location;
    showDeleteModal.value = true;
}

// Remove location from dashboard
async function handleRemoveLocation() {
    if (!selectedLocationToRemove.value) return;

    const success = await removeLocation(selectedLocationToRemove.value.id);
    if (success) {
        toast.add({ title: 'Location removed successfully!', color: 'green' });
    } else {
        toast.add({ title: 'Failed to remove location', color: 'red' });
    }

    showDeleteModal.value = false;
    selectedLocationToRemove.value = null;
}

// Select location to view forecast details
async function selectLocationDetails(location) {
    try {
        selectedLocationDetails.value = location;
        showSidebar.value = true;

        const forecastData = await getLocationForecast(location.location_id);
        if (forecastData) {
            selectedLocationDetails.value = { ...location, ...forecastData };
        }
    } catch (error) {
        console.error('Error getting location details:', error);
        toast.add({ title: 'Failed to load forecast data', color: 'red' });
    }
}
</script>
