// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        head: {
            title: 'DataCose: Code Challenge',
        },
    },
    ssr: false,
    devtools: { enabled: true },
    pages: true,
    modules: ['@nuxt/ui'],

    runtimeConfig: {
        public: {
            baseWeb: process.env.BASE_WEB,
        },
    },

    compatibilityDate: '2025-02-26',
});
