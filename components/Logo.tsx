import React from 'react';

// CSS keyframes for scaling animation
const scaleAnim = {
  animation: 'keepkey-scale 2s infinite ease-in-out',
};

// Inject keyframes into the global stylesheet (for SSR and CSR)
if (typeof window !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = `@keyframes keepkey-scale {
    0% { transform: scale(0.8); }
    50% { transform: scale(1.2); }
    100% { transform: scale(0.8); }
  }`;
  document.head.appendChild(style);
} else {
  // For SSR, Next.js will collect this style on the server
  // This is a simple approach for demo; for production, use a CSS-in-JS lib or import a CSS file
  // See: https://nextjs.org/docs/app/building-your-application/styling/css-in-js
}

import { KeepKeyUILogo } from './logo/keepkey-ui';

export const Logo = (props: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', ...props.style }}
    {...props}
  >
    <KeepKeyUILogo width={200} height={150} />
  </div>
);
