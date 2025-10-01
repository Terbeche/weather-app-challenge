import { ref, onMounted } from 'vue';
import { $fetch } from 'ofetch';

export function useLocations() {
    const locations = ref<any[]>([]);
    const dashboardLocations = ref<any[]>([]);
    const isLoading = ref(false);

    // Get the API base URL from runtime config
    const config = useRuntimeConfig();
    const baseAPI = config.public.baseWeb;

    const fetchAllLocations = async () => {
        try {
            const data = await $fetch(`${baseAPI}/all_locations`);
            locations.value = data || [];
        } catch (error) {
            console.error('Error fetching locations:', error);
        }
    };

    const fetchDashboardLocations = async () => {
        try {
            isLoading.value = true;
            const data = await $fetch(`${baseAPI}/locations`);
            dashboardLocations.value = data || [];
        } catch (error) {
            console.error('Error fetching dashboard locations:', error);
        } finally {
            isLoading.value = false;
        }
    };

    const addLocation = async (locationId: string) => {
        try {
            await $fetch(`${baseAPI}/locations`, {
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
            await $fetch(`${baseAPI}/locations/${locationId}`, {
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
            const data = await $fetch(`${baseAPI}/forecast/${locationId}`);
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
