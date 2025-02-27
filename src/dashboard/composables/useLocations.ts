import { ref, onMounted } from 'vue';
import { $fetch } from 'ofetch';

export function useLocations() {
    const locations = ref<any[]>([]);
    const dashboardLocations = ref<any[]>([]);
    const isLoading = ref(false);

    const fetchAllLocations = async () => {
        try {
            const data = await $fetch('/api/locations');
            locations.value = data || [];
        } catch (error) {
            console.error('Error fetching locations:', error);
        }
    };

    const fetchDashboardLocations = async () => {
        try {
            isLoading.value = true;
            const data = await $fetch('/api/dashboard-locations');
            dashboardLocations.value = data || [];
        } catch (error) {
            console.error('Error fetching dashboard locations:', error);
        } finally {
            isLoading.value = false;
        }
    };

    const addLocation = async (locationId: string) => {
        try {
            await $fetch('/api/add-location', {
                method: 'POST',
                body: { id: locationId },
            });
            await fetchDashboardLocations();
            return true;
        } catch (error) {
            console.error('Error adding location:', error);
            return false;
        }
    };

    const removeLocation = async (locationId: string) => {
        try {
            await $fetch(`/api/remove-location?id=${locationId}`, {
                method: 'DELETE',
            });
            await fetchDashboardLocations();
            return true;
        } catch (error) {
            console.error('Error removing location:', error);
            return false;
        }
    };

    const getLocationForecast = async (locationId: string) => {
        try {
            const data = await $fetch(`/api/dashboard-location-forecast?id=${locationId}`);
            return data;
        } catch (error) {
            console.error('Error getting location forecast:', error);
            return null;
        }
    };

    onMounted(() => {
        fetchAllLocations();
        fetchDashboardLocations();
    });

    return {
        locations,
        dashboardLocations,
        isLoading,
        fetchAllLocations,
        fetchDashboardLocations,
        addLocation,
        removeLocation,
        getLocationForecast,
    };
}
