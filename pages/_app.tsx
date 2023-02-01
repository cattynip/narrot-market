import '@styles/globals.css';
import type { AppProps } from 'next/app';
import AppLayout from '@components/AppLayout';
import { SWRConfig } from 'swr';

function App({ Component, pageProps }: AppProps) {
  const fetcher = (url: string) => fetch(url).then(response => response.json());

  return (
    <SWRConfig
      value={{
        fetcher,
        loadingTimeout: 10000,
        refreshInterval: 10000
      }}
    >
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </SWRConfig>
  );
}

export default App;
