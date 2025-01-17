import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'

const config: DocsThemeConfig = {
  logo: <span>KeepKey Docs</span>,
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
