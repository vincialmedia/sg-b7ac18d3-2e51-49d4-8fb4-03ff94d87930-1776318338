import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Script from 'next/script'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* HubSpot */}
      <Script
        id="hs-script-loader"
        strategy="afterInteractive"
        src="//js-eu1.hs-scripts.com/146320474.js"
      />

      {/* Softgen AI Monitoring */}
      <Script
        src="https://cdn.softgen.ai/script.js"
        strategy="afterInteractive"
        data-softgen-monitoring="true"
      />

      {/* Render your app */}
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
