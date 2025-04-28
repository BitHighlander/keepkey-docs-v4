import React, { useEffect, useState } from 'react'

type DownloadLinks = {
  windows: string
  mac: string
  linux: string
}

const DEFAULT_LINKS: DownloadLinks = {
  windows: '#',
  mac: '#',
  linux: '#'
}

const DownloadButtons: React.FC = () => {
  const [links, setLinks] = useState<DownloadLinks>(DEFAULT_LINKS)
  const [os, setOs] = useState<'windows' | 'mac' | 'linux' | null>(null)

  useEffect(() => {
    // OS detection
    const userAgent = window.navigator.userAgent
    if (userAgent.indexOf('Win') !== -1) setOs('windows')
    else if (userAgent.indexOf('Mac') !== -1) setOs('mac')
    else if (userAgent.indexOf('Linux') !== -1) setOs('linux')

    // Fetch latest GitHub release
    fetch('https://api.github.com/repos/keepkey/keepkey-desktop/releases/latest')
      .then(res => res.json())
      .then(data => {
        // Helper to find asset URL by name part
        const findAsset = (namePart: string) =>
          data.assets.find((asset: any) => asset.name.includes(namePart))?.browser_download_url || '#'
        setLinks({
          windows: findAsset('.exe'),
          mac: findAsset('.dmg'),
          linux: findAsset('.AppImage')
        })
      })
      .catch(() => setLinks(DEFAULT_LINKS))
  }, [])

  const buttonStyle = (active: boolean, color: string) => ({
    background: color,
    color: '#fff',
    padding: active ? '1.2em 2.5em' : '1em 2em',
    borderRadius: '0.75em',
    fontSize: active ? '1.3em' : '1.1em',
    fontWeight: 'bold',
    textDecoration: 'none',
    boxShadow: active ? '0 2px 12px #2563eb55' : '0 2px 8px #0002',
    minWidth: '260px',
    textAlign: 'center' as const,
    marginBottom: '1em',
    display: 'block'
  })

  return (
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '2em 0', gap: '1.2em'}}>
          <a
              href={links.windows}
              style={buttonStyle(os === 'windows', '#2563eb')}
              target="_blank"
              rel="noopener noreferrer"
          >
              Download for Windows{os === 'windows' ? ' (Recommended)' : ''}
          </a>
          <a
              href={links.mac}
              style={buttonStyle(os === 'mac', '#059669')}
              target="_blank"
              rel="noopener noreferrer"
          >
              Download for macOS{os === 'mac' ? ' (Recommended)' : ''}
          </a>
          <a
              href={links.linux}
              style={buttonStyle(os === 'linux', '#f59e42')}
              target="_blank"
              rel="noopener noreferrer"
          >
              Download for Linux{os === 'linux' ? ' (Recommended)' : ''}
          </a>
          <div
              style={{
                  marginTop: '1em',
                  fontSize: '1em',
                  textAlign: 'center',
                  maxWidth: '420px',
              }}
          >
              <b>Note:</b> If any download link does not work, please visit the{' '}
              <a
                  href="https://github.com/keepkey/keepkey-desktop/releases/latest"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                      color: '#3b82f6',           // blue-500
                      textDecoration: 'underline',
                  }}
              >
                  KeepKey Desktop Releases
              </a>{' '}
              page and download the correct file for your OS.
          </div>
      </div>
  )
}

export default DownloadButtons
