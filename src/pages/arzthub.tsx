import Head from "next/head";

export default function ArztHubPage() {
  return (
    <>
      <Head>
        <title>ArztHub | Vincialmedia</title>
        <meta name="description" content="ArztHub - Healthcare Management Platform" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="pt-16 h-screen">
        <iframe
          src="https://sg-d8d24ee0-3e5c-4244-b9d2-2607ad91.vercel.app/"
          className="w-full h-[calc(100vh-4rem)] border-0"
          title="ArztHub - Healthcare Management Platform"
          allowFullScreen
        />
      </div>
    </>
  );
}