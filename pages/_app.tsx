import '@styles/globals.css';
import type { AppProps } from 'next/app';
import AppLayout from '@components/AppLayout';
import useUser from '@libs/client/useUser';

function App({ Component, pageProps }: AppProps) {
  return (
    <AppLayout>
      <Component {...pageProps} />
    </AppLayout>
  );
}

export default App;
