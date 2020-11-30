import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from "styled-components";


export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />)
        });
      const initialProps = await Document.getInitialProps(ctx);

      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        )
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html>
        <Head>
          <script async src="https://www.googletagmanager.com/gtag/js?id=UA-164920809-1"></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag() { dataLayer.push(arguments); }
            gtag('js', new Date());
        
            gtag('config', 'UA-164920809-1');
              `,
            }}
          />
          <link href="https://fonts.googleapis.com/css2?family=Schoolbell&display=swap" rel="stylesheet" type="text/css" />

          <meta charset="utf-8" />
          <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#000000" />

          <meta name="title" content="Name, Place, Animal, Thing | Online Multiplayer"></meta>
          <meta name="description"
            content="Play 'Name, Place, Animal, Thing' online with friends! The iconic game has moved from our school notebooks to the online world. You can add additional categories besides name, place, animal and thing. Play with up to 10 of your friends online, from anywhere in the world! Variations of the game are called 'Boy, Girl, Fruit, Flower' and 'Petit Bac' or 'Petit Baccalauréat' in French"></meta>

          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://nameplaceanimalthing.online/" />
          <meta property="og:title" content="Name, Place, Animal, Thing | Online Multiplayer" />
          <meta property="og:description"
            content="Play 'Name, Place, Animal, Thing' online with friends! The iconic game has moved from our school notebooks to the online world. You can add additional categories besides name, place, animal and thing. Play with up to 10 of your friends online, from anywhere in the world!" />
          <meta property="og:image" content="https://www.dropbox.com/s/creagk6nws7f13d/banner.png?raw=1" />
          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content="https://nameplaceanimalthing.online/" />
          <meta property="twitter:title" content="Name, Place, Animal, Thing | Online Multiplayer" />
          <meta property="twitter:description"
            content="Play 'Name, Place, Animal, Thing' online with friends! The iconic game has moved from our school notebooks to the online world. You can add additional categories besides name, place, animal and thing. Play with up to 10 of your friends online, from anywhere in the world!" />
          <meta property="twitter:image" content="https://www.dropbox.com/s/creagk6nws7f13d/banner.png?raw=1" />
        </Head>
        <body>
          <style jsx>{`
          body {
            padding: 0px;
            margin: 0px;
          }
        `}</style>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}