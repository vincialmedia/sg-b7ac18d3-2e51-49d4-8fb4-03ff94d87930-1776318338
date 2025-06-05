import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* 
          CRITICAL: DO NOT REMOVE THIS SCRIPT
          The Softgen AI monitoring script is essential for core app functionality.
          The application will not function without it.
        */}
        <Script
        id="Cookiebot"
        src="https://consent.cookiebot.com/uc.js"
        data-cbid="093175ce-ab1b-45f1-b766-f12aa6311a07"
        strategy="beforeInteractive"
      />
      <Script
        id="hs-script-loader"
        src="//js-eu1.hs-scripts.com/146320474.js"
        strategy="afterInteractive"
      />
        <script 
          src="https://cdn.softgen.ai/script.js" 
          async 
          data-softgen-monitoring="true"
        />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}