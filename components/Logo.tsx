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

// KeepKey Logo Component
const KeepKeyUILogo = () => (
  <svg width="100%" height="100%" viewBox="0 0 160 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M43.4 10h3.2v11.2L57 10h4l-8.4 9.2 8.8 10.8h-4l-7.2-8.8-3.6 3.6v5.2h-3.2V10zm23.2 0h3.2v20h-3.2V10zm14.4 0h3.2v16.8h9.2v3.2H81V10zm14.8 0h3.2v16.8h9.2v3.2h-12.4V10zm14.8 0h13.6v3.2h-10.4v5.2h9.2v3.2h-9.2v5.2h10.4v3.2h-13.6V10zm-68 0h3.2v20h-3.2V10z" fill="currentColor"/>
    <path d="M20 0C9 0 0 9 0 20s9 20 20 20 20-9 20-20S31 0 20 0zm0 36c-8.8 0-16-7.2-16-16S11.2 4 20 4s16 7.2 16 16-7.2 16-16 16z" fill="currentColor"/>
    <path d="M20 8c-6.6 0-12 5.4-12 12s5.4 12 12 12 12-5.4 12-12-5.4-12-12-12zm0 20c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z" fill="currentColor"/>
  </svg>
)

export const Logo = (props: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    style={{ width: '160px', display: 'flex', alignItems: 'center', ...scaleAnim, ...props.style }}
    {...props}
  >
    <KeepKeyUILogo />
  </div>
);
