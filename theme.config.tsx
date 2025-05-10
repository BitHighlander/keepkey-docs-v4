import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'
import { KeepKeyUILogo } from './components/logo/keepkey-ui'

// Define homepage URL from env
const homepage = process.env.NEXT_PUBLIC_APP_HOME_URL || '/'

const config: DocsThemeConfig = {
  i18n: [
    { locale: 'en', text: 'English' },
    { locale: 'es', text: 'Español' },
    { locale: 'de', text: 'Deutsch' },
    { locale: 'fr', text: 'Français' },
    { locale: 'it', text: 'Italiano' },
    { locale: 'ja', text: '日本語' },
    { locale: 'ko', text: '한국어' },
    { locale: 'pl', text: 'Polski' },
    { locale: 'pt', text: 'Português' },
    { locale: 'zh', text: '中文' },
  ],
  logo: (
    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5em' }}>
      <KeepKeyUILogo style={{ height: '1.5em' }} />
      <span style={{ fontWeight: 'bold' }}>KeepKey Documentation</span>
    </span>
  ),
  logoLink: homepage,
  project: {
    link: 'https://github.com/keepkey',
  },
  navbar: {
    extraContent: (
      <>
        <a href="https://support.keepkey.info" target="_blank" rel="noopener noreferrer" style={{ marginLeft: '1em' /* Adjust spacing if needed */ }}>
          Contact
        </a>
      </>
    )
  },
  sidebar: {
    defaultMenuCollapseLevel: 1, // Ensures all sections are collapsed by default
  },
  docsRepositoryBase: 'https://github.com/keepkey/keepkey-docs-repo',
  footer: {
    text: 'KeepKey Hardware Wallet',
  },
}

export default config
