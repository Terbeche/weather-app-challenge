import { ref, onMounted } from 'vue';
import { $fetch } from 'ofetch';

export function useLocations() {
    const locations = ref<any[]>([]);
    const dashboardLocations = ref<any[]>([]);
    const isLoading = ref(false);

    // Get the API base URL from runtime config or environment variable
    const getBaseAPI = () => {
        // Try to get from runtime config first
        try {
            const config = useRuntimeConfig();
            return config.public.baseWeb;
        } catch {
            // Fallback to environment variable or default
            return process.env.BASE_WEB || 'https://weather-app-back-end-6533fe6e83fc.herokuapp.com';
        }
    };

    const fetchAllLocations = async () => {
        try {
            const baseAPI = getBaseAPI();
            const data = await $fetch(`${baseAPI}/all_locations`);
            locations.value = data || [];
        } catch (error) {
            console.error('Error fetching locations:', error);
        }
    };

    const fetchDashboardLocations = async () => {
        try {
            isLoading.value = true;
            const baseAPI = getBaseAPI();
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
            const baseAPI = getBaseAPI();
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
            const baseAPI = getBaseAPI();
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
            const baseAPI = getBaseAPI();
            const data = await $fetch(`${baseAPI}/forecast/${locationId}`);
            return data;
        } catch (error) {
            console.error('Error getting location forecast:', error);
            return null;
        }
    };

    onMounted(() => {
        // Only fetch data in the browser, not during build
        if (process.client) {
            fetchAllLocations();
            fetchDashboardLocations();
        }
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
