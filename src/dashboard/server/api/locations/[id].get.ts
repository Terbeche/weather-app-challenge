export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const id = event.context.params.id;

    if (!id) {
        throw createError({ statusCode: 400, message: 'Location ID is required' });
    }

    const response = await fetch(`${config.public.baseWeb}/forecast/${id}`);

    if (!response.ok) {
        throw createError({ statusCode: response.status, message: 'Failed to fetch dashboard location forecast' });
    }

    return await response.json();
});
