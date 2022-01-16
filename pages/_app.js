import '../styles/global.css'
import Head from 'next/head'
import AudioProvider from 'components/AudioProvider'
import Audio from "../components/Audio"
import NextProgress from 'nextjs-progressbar';

export default function App({ Component, pageProps }) {
  return (
    <>
    <Head>
        <title>RingTone</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
    <NextProgress
  color="#29D"
  startPosition={0.3}
  stopDelayMs={200}
  height={4}
  showOnShallow={true}
  options={{
  showSpinner: false
  }}
/>
    <AudioProvider>
    <Component {...pageProps} />
    <Audio/>
    </AudioProvider>
    </>
    )
}