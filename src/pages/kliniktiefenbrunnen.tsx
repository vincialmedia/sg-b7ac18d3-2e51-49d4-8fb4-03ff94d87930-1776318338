
import React from "react"
import Head from "next/head"

export default function KlinikTiefenbrunnen() {
  return (
    <>
      <Head>
        <title>Klinik Tiefenbrunnen - Vincialmedia</title>
        <meta
          name="description"
          content="Klinik Tiefenbrunnen project showcase"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-white">
        {/* Header */}
        <header className="bg-slate-50 border-b border-slate-200 py-6">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Klinik Tiefenbrunnen</h1>
                <p className="text-slate-600 mt-1">Project Showcase</p>
              </div>
              <div className="text-sm text-slate-500">
                Powered by Vincialmedia
              </div>
            </div>
          </div>
        </header>

        {/* Iframe Container */}
        <div className="w-full h-screen">
          <iframe
            src="https://sg-63e33e6a-ce67-47cf-a8ff-804dffb5.vercel.app"
            className="w-full h-full border-0"
            title="Klinik Tiefenbrunnen Application"
            loading="lazy"
            sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox allow-presentation"
          />
        </div>
      </main>
    </>
  )
}
