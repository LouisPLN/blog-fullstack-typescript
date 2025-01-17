import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="fr">
        <Head>
          {/* Ajouter des balises meta */}
          {/* <link rel="icon" href="/favicon.ico" /> */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link href="https://fonts.cdnfonts.com/css/satoshi" rel="stylesheet"></link>
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main /> 
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;