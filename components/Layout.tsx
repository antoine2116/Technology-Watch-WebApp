import Head from "next/head";
import Navbar from "./Navbar";
import Search from "@/components/Filters/Search";

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
        <Search/>
        <div className="flex w-full">
          <div className="flex-auto py-4 px-6">
            <div className="container mx-auto">
              <main>{children}</main>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}

export default Layout;
