import React from "react"
import Head from "next/head"

export default function DrVince() {
  return (
    <>
      <Head>
        <title>Dr. Vince - Vincialmedia</title>
        <meta
          name="description"
          content="Dr. Vince project showcase"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="pt-16 min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
        <div className="w-full" style={{ height: "calc(100vh - 4rem)" }}>
          <iframe
            src="https://sg-166a7f98-b0fa-4a54-ae3d-12d6c167.vercel.app/"
            className="w-full h-full border-0"
            title="Dr. Vince Application"
            loading="lazy"
            sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox allow-presentation"
          />
        </div>
      </main>
    </>
  )
}
