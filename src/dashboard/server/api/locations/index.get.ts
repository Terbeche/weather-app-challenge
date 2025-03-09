export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();

    try {
        return await $fetch(`${config.public.baseWeb}/locations`);
    } catch (error: any) {
        throw createError({
            statusCode: error.response?.status || 500,
            message: error.response?._data?.message || 'Failed to fetch dashboard locations',
        });
    }
});
