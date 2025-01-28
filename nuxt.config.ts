// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@nuxtjs/i18n', '@pinia/nuxt', '@nuxt/eslint'],
  compatibilityDate: '2025-01-28',
})