import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'

// Define homepage URL from env
const homepage = process.env.NEXT_PUBLIC_APP_HOME_URL || '/'

const config: DocsThemeConfig = {
  logo: (
    <img
      src="/keepkey-logo.svg"
      alt="KeepKey Logo"
      style={{ height: '1.5em', marginRight: '0.5em' }}
    />
  ),
  logoLink: homepage,
  project: {
    link: 'https://github.com/keepkey',
  },
  chat: {
    link: 'https://discord.com/invite/FDQEbB79N2',
  },
  sidebar: {
    defaultMenuCollapseLevel: 0, // Ensures all sections are collapsed by default
  },
  docsRepositoryBase: 'https://github.com/keepkey/keepkey-docs-repo',
  footer: {
    text: 'KeepKey Hardware Wallet',
  },
}

export default config
