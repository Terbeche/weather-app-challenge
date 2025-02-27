<template>
    <div>
        <div class="m-12 my-0 pt-4 flex flex-col">
            <LocationsHeader />

            <div class="m-12 mt-0 flex justify-between mb-4">
                <span class="text-3xl font-bold">Locations</span>
                <UButton
                    @click="openAddLocationForm"
                    icon="i-heroicons-plus"
                    size="sm"
                    variant="solid"
                    label="Add Location"
                    :trailing="false"
                    :class="[
                        isDark
                            ? 'bg-custom-cyan text-black hover:bg-custom-cyan hover:bg-blue-500'
                            : 'bg-light-accent text-white hover:bg-blue-600',
                    ]"
                    class="mb-4"
                />
            </div>
        </div>
        <div class="m-12 mt-0">
            <!-- Locations Table -->
            <LocationsTable
                :locations="dashboardLocations"
                :loading="isLoading"
                @select-location="selectLocationDetails"
                @remove-location="selectLocationToRemove"
            />

            <!-- Modals -->
            <DeleteLocationModal
                v-model:show="showDeleteModal"
                :location="selectedLocationToRemove"
                @confirm="handleRemoveLocation"
            />

            <AddLocationModal
                v-model:show="showAddLocationModal"
                :locations="locations"
                :dashboard-locations="dashboardLocations"
                @add-location="handleAddLocation"
            />
        </div>
        <div class="bg-transparent">
            <ForecastSidebar :show="showSidebar" :location="selectedLocationDetails" @close="showSidebar = false" />
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useLocations } from '@/composables/useLocations';

// Composables
const toast = useToast();
const {
    locations,
    dashboardLocations,
    isLoading: locationsLoading,
    addLocation,
    removeLocation,
    getLocationForecast,
} = useLocations();

// Theme state
const isDark = computed(() => {
    return document.documentElement.classList.contains('dark');
});

// State
const showAddLocationModal = ref(false);
const showDeleteModal = ref(false);
const showSidebar = ref(false);
const isLoading = ref(true);

// Selected items
const selectedLocationToRemove = ref(null);
const selectedLocationDetails = ref(null);

watch(locationsLoading, (newVal) => {
    isLoading.value = newVal;
});

// openAddLocationForm
function openAddLocationForm() {
    showAddLocationModal.value = true;
}
// Add location to dashboard
async function handleAddLocation(data) {
    const { location, done } = data;

    try {
        const success = await addLocation(location.id);
        if (success) {
            toast.add({ title: 'Location added successfully!', color: 'green' });
            showAddLocationModal.value = false;
        } else {
            toast.add({ title: 'Failed to add location', color: 'red' });
        }
    } catch (error) {
        console.error('Error adding location:', error);
        toast.add({ title: 'An error occurred', color: 'red' });
    } finally {
        done();
    }
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
