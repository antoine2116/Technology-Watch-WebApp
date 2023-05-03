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

        let res = await fetch(url)
        res = (await res.json()).articles

        setArticles([...res])

        setFilters(res);

    }


    const setFilters = (articles: Article[]) => {
        const authors = new Set<string>();
        const sources = new Set<string>();

        for (const article of articles) {
            if(article.author != null && !authors.has(article.author)){
                authors.add(article.author);
            }

            if(article.source != null && !sources.has(article.source)){
                sources.add(article.source);
            }
        }
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
    }}>
        {children}
    </ArticlesContext.Provider>

}

export const useArticles = () => useContext(ArticlesContext);