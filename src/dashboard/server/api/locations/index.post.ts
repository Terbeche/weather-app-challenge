export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const body = await readBody(event);

    try {
        return await $fetch(`${config.public.baseWeb}/locations`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: body.id }),
        });
    }
    catch (error: any) {
        throw createError({
            statusCode: error.response?.status || 500,
            message: error.response?._data?.message || 'Failed to add location',
        });
    }
});
