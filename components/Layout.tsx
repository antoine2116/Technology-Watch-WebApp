import Head from "next/head";
import Navbar from "./Navbar";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Head>
        <title>Tech Watch LBMG</title>
        <meta
          name="description"
          content="Tech Watch LBMG"
        />
        <link
          rel="icon"
          href="/favicon.ico"
        />
      </Head>

      <div className="antialiased bg-white text-slate-900">
        <Navbar />
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
