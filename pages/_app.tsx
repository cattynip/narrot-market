import '@styles/globals.css';
import type { AppProps } from 'next/app';
import AppLayout from '@components/AppLayout';
import { SWRConfig } from 'swr';
import useUser from '@libs/client/useUser';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

function App({ Component, pageProps }: AppProps) {
  const fetcher = (url: string) => fetch(url).then(response => response.json());
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/welcome');
    }
  }, [user, router]);

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
