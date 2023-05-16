import Head from "next/head";
import Navbar from "./Navbar";
import Search from "@/components/Filters/Search";
import Filters from "@/components/Filters/Filters";
import {useEffect, useState} from "react";
import {useArticles} from "@/contexts/ArticlesContext";

function Layout({ children }: { children: React.ReactNode }) {

  const {areFiltersApplied, nextPage, isLoading} = useArticles()

  const [showFilters, setShowFilters] = useState<boolean>(false);



  const filterButtonHandler = () => {
    setShowFilters(!showFilters)
  }

  const handleScroll = (e: any) => {
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom && !isLoading) { nextPage() }
  }


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

      <div className={`relative antialiased bg-white text-slate-900 max-h-screen overflow-auto py-4`} onScroll={handleScroll}>
        <div className={'fixed top-0 z-10 w-full'}>
          <Navbar />

        </div>




        <Filters showFilters={showFilters} setShowFilters={setShowFilters}/>

        <div className={`flex w-full flex-wrap overflow-hidden flex-grow max-h-min pt-12`} >
          <div className={'flex w-full py-2 px-2 sm:px-6 justify-between h-14 bg-white'} id={"search-nav"}>
            <div className={'pr-2 flex-grow'}>
              <Search/>
            </div>
            <div className={'h-full'}>
              <button className={`aspect-[1/1] rounded-md ${areFiltersApplied ? 'bg-green-700 text-white' : 'bg-gray-200 text-gray-700'} h-full flex items-center justify-center `} onClick={filterButtonHandler}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
                </svg>
              </button>
            </div>
          </div>
          <div className="px-2 sm:px-6 w-full mt-6">
              <main>{children}</main>
          </div>
        </div>
      </div>
    </>
  );
}

export default Layout;
