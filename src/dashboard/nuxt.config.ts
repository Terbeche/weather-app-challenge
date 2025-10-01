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

    // Disable prerendering to prevent build-time API calls
    nitro: {
        prerender: {
            crawlLinks: false,
            routes: ['/']
        }
    },

    runtimeConfig: {
        public: {
            baseWeb: process.env.BASE_WEB || 'https://weather-app-back-end-6533fe6e83fc.herokuapp.com',
        },
    },

    compatibilityDate: '2025-02-26',
});
