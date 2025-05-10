'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import SDK from '@coinmasters/pioneer-sdk';

interface PioneerContextValue {
  sdk: SDK | null;
  session: any;
  loading: boolean;
  error: Error | null;
  refreshKeepKeyDesktop: () => Promise<boolean>;
}

const PioneerContext = createContext<PioneerContextValue>({
  sdk: null,
  session: null,
  loading: true,
  error: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  refreshKeepKeyDesktop: async () => false,
});

// Custom hook to use the Pioneer context
export const usePioneer = () => useContext(PioneerContext);

export const PioneerProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [sdk, setSdk] = useState<SDK | null>(null);
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  // const [kkConnected, setKkConnected] = useState(false);

  /** one-liner to ask the desktop bridge if it's alive */
  const queryKeepKeyDesktop = async () => {
    try {
      const res = await fetch('http://localhost:1646/info/ping');
      return res.ok;
    } catch {
      return false;
    }
  };

  useEffect(() => {
    (async () => {
      try {
        // Get the spec URL (API endpoint)
        const specUrl = process.env.NEXT_PUBLIC_PIONEER_URL ?? 'https://pioneers.dev/spec/swagger.json';
        
        // Configure the SDK with proper CAIP format for blockchains
        const config = {
          appName: 'KeepKey Docs',
          appIcon: '/icon.svg',
          wss: process.env.NEXT_PUBLIC_PIONEER_WSS ?? 'wss://pioneers.dev',
          spec: specUrl,
          username: 'docs-user-' + Math.floor(Math.random() * 10000),
          queryKey: 'sdk:' + Math.random().toString(36).substring(2, 15),
          paths: [],
          // Use proper networkId format (not CAIP)
          blockchains: ['eip155:1', 'bip122:000000000019d6689c085ae165831e93'],
          debug: true
        };
        
        /** 1. Create instance */
        const client = new SDK(specUrl, config);

        /** 2. Handshake */
        await client.init({}, {});

        /** 3. Save everything */
        setSdk(client);
        // Access session data safely
        const sessionData = {
          username: client?.username,
          queryKey: client?.queryKey
        };
        setSession(sessionData);
        // setKkConnected(await queryKeepKeyDesktop());
      } catch (e) {
        setError(e as Error);
      } finally {
        setLoading(false);
      }
    })();

    // No close method on SDK, so no cleanup needed
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refreshKeepKeyDesktop = async () => {
    const ok = await queryKeepKeyDesktop();
    // setKkConnected(ok);
    return ok;
  };

  return (
    <PioneerContext.Provider
      value={{ sdk, session, loading, error, refreshKeepKeyDesktop }}
    >
      {children}
    </PioneerContext.Provider>
  );
};
