import '../styles/globals.css';
import type { AppProps } from 'next/app';

// Before Next.js is rendering the page after user go to the specific route,
// Next.js will be rendering this component first.

// Component means the page component that Next.js will be rendering,
// pageProps means the props that the page which Next.js will be rendering require.

// All of the pages and components have to be exported by `export default ${functionName}`.

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="w-full max-w-xl mx-auto">
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
