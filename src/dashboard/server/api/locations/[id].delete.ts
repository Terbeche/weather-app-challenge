export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const id = event.context.params.id;

    try {
        return await $fetch(`${config.public.baseWeb}/locations/${id}`, {
            method: 'DELETE',
        });
    }
    catch (error: any) {
        throw createError({
            statusCode: error.response?.status || 500,
            message: error.response?._data?.message || 'Failed to remove location',
        });
    }
});