const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
})

module.exports = {
  i18n: {
    locales: ['en', 'es', 'de', 'fr', 'it', 'ja', 'ko', 'pl', 'pt', 'zh'],
    defaultLocale: 'en',
  },
  ...withNextra()
}
