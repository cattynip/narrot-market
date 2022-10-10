import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SWRConfig } from 'swr';
import useUser, { fetcher } from '@libs/client/useUser';

// Before Next.js is rendering the page after user go to the specific route,
// Next.js will be rendering this component first.

// Component means the page component that Next.js will be rendering,
// pageProps means the props that the page which Next.js will be rendering require.

// All of the pages and components have to be exported by `export default ${functionName}`.

function MyApp({ Component, pageProps }: AppProps) {
  const { user, isLoading } = useUser();
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
