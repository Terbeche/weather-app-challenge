export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const response = await fetch(`${config.public.baseWeb}/locations`);

    if (!response.ok) {
        throw createError({ statusCode: response.status, message: 'Failed to fetch dashboard locations' });
    }

    return await response.json();
});
