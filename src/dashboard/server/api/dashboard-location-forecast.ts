export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const query = getQuery(event);

    const response = await fetch(`${config.public.baseWeb}/forecast/${query.id}`);

    if (!response.ok) {
        throw createError({ statusCode: response.status, message: 'Failed to fetch dashboard location forecast' });
    }

    return await response.json();
});
