export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const id = event.context.params.id;

    if (!id) {
        throw createError({ statusCode: 400, message: 'Location ID is required' });
    }

    const response = await fetch(`${config.public.baseWeb}/locations/${id}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw createError({ statusCode: response.status, message: 'Failed to remove location' });
    }

    return { success: true };
});
