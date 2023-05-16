import { useArticles } from "@/contexts/ArticlesContext";

import ArticleList from "@/components/Articles/ArticlesList";
import Head from "next/head";

export default function Home() {
  const { areFiltersApplied, articles, isLoading, isError, fetchArticles } = useArticles();

  return (
    <>
        {/*PWA Manifest*/}
        <Head>
            <link rel="manifest" href="/manifest.json" />
        </Head>

      <div className="mb-4 text-center">
        <h1 className="font-extrabold text-3xl tracking-tight ">HMI Technology Watch</h1>
      </div>

      {articles.length > 0 && !isError && <ArticleList articles={articles} />}

      {articles.length == 0 && !isLoading && !isError && (
        <div className="text-gray-700 text-center">
          <h1 className="font-medium text-md tracking-tight">
            No articles found
            {areFiltersApplied && <span> with the current filters</span>}
          </h1>
        </div>
      )}
      {isLoading && (
        <div className="text-gray-700 text-center">
          <div className="lds-roller">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      )}
      {isError && (
        <div className={"w-full grid grid-cols-1 gap-2"}>
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong className="font-bold">Holy smokes!</strong>
            <span className="block sm:inline">It's seems there is a problem here. Try again later</span>
          </div>

          <button
            onClick={fetchArticles}
            className="flex inline-flex items-center justify-center gap-x-1.5 rounded-md bg-red-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
            Try again
          </button>
        </div>
      )}
    </>
  );
}
