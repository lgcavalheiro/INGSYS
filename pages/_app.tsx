import "../styles/global.css";
import { AppProps } from "next/app";
import Head from "next/head";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Ingsys</title>
        <meta
          name="description"
          content="Ingsys - Ingredient Synergy System"
        ></meta>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default App;
