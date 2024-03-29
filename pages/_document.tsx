import Document, { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

class NarrotMarket extends Document {
  render(): JSX.Element {
    return (
      <Html lang="en">
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
          <Script
            src=""
            strategy="afterInteractive"
            onLoad={() => {
              console.log('This javascript script was installed.');
            }}
          />
        </body>
      </Html>
    );
  }
}

export default NarrotMarket;
