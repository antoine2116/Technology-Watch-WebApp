import {createContext, ReactNode, useContext, useState, FC, useEffect} from "react";
import {Article} from "@/models/Article";

export const ArticlesContext = createContext<any>({});
ArticlesContext.displayName = "ArticlesContext";

export const ArticlesProvider = ({ children }: { children: ReactNode }) => {
    const [authors, setAuthors] = useState<string[]>([]);
    const [sources, setSources] = useState<string[]>([]);

    const [activeAuthors, setActiveAuthors] = useState<string[]>([]);
    const [activeSources, setActiveSources] = useState<string[]>([]);
    const [activeFromDate, setActiveFromDate] = useState<string>("");
    const [activeToDate, setActiveToDate] = useState<string>("");

    const [articles, setArticles] = useState<Article[]>([]);

    const [query, setQuery] = useState<string>("");



    useEffect( () => {
        console.log("Fetching after change")
        fetchArticles()
    }, [activeAuthors, activeSources, activeFromDate, activeToDate, query])

    const fetchArticles = async () => {

        let url = new URL("http://localhost:3000/api/articles");
        if(activeAuthors.length > 0){
            url.searchParams.append("authors", activeAuthors.join(","));
        }
        if(activeSources.length > 0){
            url.searchParams.append("sources", activeSources.join(","));
        }
        if(activeFromDate.length > 0){
            url.searchParams.append("fromDate", activeFromDate);
        }
        if(activeToDate.length > 0){
            url.searchParams.append("toDate", activeToDate);
        }

        if(query.length > 0){
            url.searchParams.append("q", query);
        }

        console.log('url', url.toString())

        let res = await fetch(url)
        res = (await res.json()).articles

        setArticles([...res])


        if(authors.length == 0 || sources.length == 0){
            setFilters(res);
        }

    }


    const setFilters = (articles: Article[]) => {
        const authors = new Set<string>();
        const sources = new Set<string>();

        for (const article of articles) {

            console.log('articleContext', article)
            if(article.author != null && !authors.has(article.author)){
                authors.add(article.author);
            }

            if(article.source != null && !sources.has(article.source)){
                sources.add(article.source);
            }
        }

        setAuthors([...Array.from(authors.values())]);
        setSources([...Array.from(sources.values())]);
    }

    return <ArticlesContext.Provider value={{
        authors,
        setAuthors,
        sources,
        setSources,
        fetchArticles,
        articles,
        query,
        setQuery,
        setActiveAuthors,
        setActiveSources,
        setActiveFromDate,
        setActiveToDate
    }}>
        {children}
    </ArticlesContext.Provider>

}

export const useArticles = () => useContext(ArticlesContext);