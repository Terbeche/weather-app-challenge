export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const query = getQuery(event); // Get the location ID from query parameters

    const response = await fetch(`${config.public.baseWeb}/locations/${query.id}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw createError({ statusCode: response.status, message: 'Failed to remove location' });
    }

    return { success: true };
});
