import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Script from 'next/script'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script
        id="Cookiebot"
        src="https://consent.cookiebot.com/uc.js"
        data-cbid="093175ce-ab1b-45f1-b766-f12aa6311a07"
        strategy="beforeInteractive"
        async
      />
      <Script
        id="hs-script-loader"
        src="//js-eu1.hs-scripts.com/146320474.js"
        strategy="afterInteractive"
        async
        defer
      />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
