import '../styles/custom.css'
import type { AppProps } from 'next/app'
import { PioneerProvider } from '../context/PioneerContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <PioneerProvider>
      <Component {...pageProps} />
    </PioneerProvider>
  );
}
