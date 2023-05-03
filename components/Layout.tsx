import Head from "next/head";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Head>
        <title>Tech Watch</title>
        <meta
          name="description"
          content="Tech Watch"
        />
        <link
          rel="icon"
          href="/favicon.ico"
        />
      </Head>

      <div className="antialiased bg-white text-slate-900">
        <div className="py-4 px-6">
          <div className="container mx-auto">
            <main>{children}</main>
          </div>
        </div>
      </div>
    </>
  );
}

export default Layout;
