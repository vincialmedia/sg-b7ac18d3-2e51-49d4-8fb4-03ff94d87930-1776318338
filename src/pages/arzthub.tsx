import Head from "next/head";
import Link from "next/link";

export default function ArztHubPage() {
  return (
    <>
      <Head>
        <title>ArztHub | Vincialmedia</title>
        <meta name="description" content="ArztHub - Healthcare Management Platform" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="h-screen flex flex-col">
        {/* Simple Header with Vincialmedia Logo */}
        <header className="bg-white border-b border-neutral-200 px-6 py-4 flex-shrink-0">
          <Link href="/" className="inline-block">
            <h1 className="text-2xl font-bold text-neutral-900 hover:text-red-600 transition-colors duration-300">
              Vincialmedia
            </h1>
          </Link>
        </header>

        {/* Full Page Iframe */}
        <div className="flex-1 min-h-0">
          <iframe
            src="https://sg-d8d24ee0-3e5c-4244-b9d2-2607ad91.vercel.app/"
            className="w-full h-full border-0"
            title="ArztHub - Healthcare Management Platform"
            allowFullScreen
          />
        </div>
      </div>
    </>
  );
}