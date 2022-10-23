import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SWRConfig } from 'swr';
import useUser, { fetcher } from '@libs/client/useUser';

function MyApp({ Component, pageProps }: AppProps) {
  useUser(true);

  return (
    <SWRConfig
      value={{
        refreshInterval: 10000,
        fetcher
      }}
    >
      <div className="w-full max-w-xl mx-auto">
        <Component {...pageProps} />
      </div>
    </SWRConfig>
  );
}

export default MyApp;
