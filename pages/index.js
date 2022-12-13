import Head from "next/head";
import Header from "../components/Header/header";
import Speakers from "../components/Speakers/speakers";
import Sponsors from "../components/Sponsors/sponsors";
import ReactGA from 'react-ga'
import TagManager from 'react-gtm-module'

export default function Home() {
  if (typeof window !== 'undefined') {
    TagManager.initialize({gtmId: 'GTM-MCT2H5G'})
    ReactGA.initialize('UA-109278936-3')
    ReactGA.pageview(window.location.pathname + window.location.search)
  }
  return (
    <div>

      <Head>
        <title>AsyncAPI Conference</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header />
        <Speakers />
        <Sponsors />
      </main>
    </div>
  );
}
