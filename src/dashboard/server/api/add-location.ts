export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const body = await readBody(event);

    const response = await fetch(`${config.public.baseWeb}/dashboard_locations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: body.id }),
    });

    if (!response.ok) {
        throw createError({ statusCode: response.status, message: 'Failed to add location' });
    }

    return await response.json();
});
