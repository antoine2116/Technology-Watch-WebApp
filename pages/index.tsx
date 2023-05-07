import {useArticles} from "@/contexts/ArticlesContext";

import ArticleList from "@/components/Articles/ArticlesList";
import { Article } from "@/models/Article";
import {useEffect, useState} from "react";

export default function Home() {


    const {areFiltersApplied, articles, isLoading} = useArticles()



  return (
    <>
      <div className="mb-4 text-center">
        <h1 className="font-extrabold text-3xl tracking-tight ">HMI Technology Watch</h1>
      </div>
        {articles.length > 0 && (
            <ArticleList articles={articles}/>
        )}
        { (articles.length == 0 && !isLoading) && (
            <div className="text-gray-700 text-center">
                <h1 className="font-medium text-md tracking-tight">No articles found
                    { areFiltersApplied && (
                        <span> with the current filters</span>
                    )
                    }
                </h1>
            </div>
        )}
        { isLoading && (
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

    </>
  )

}
