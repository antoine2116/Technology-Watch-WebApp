import { createContext, ReactNode, useContext, useState, useEffect } from "react";
import { Article } from "@/models/Article";

export const ArticlesContext = createContext<any>({});
ArticlesContext.displayName = "ArticlesContext";

export const ArticlesProvider = ({ children }: { children: ReactNode }) => {
  const [authors, setAuthors] = useState<string[]>([]);
  const [sources, setSources] = useState<string[]>([]);

  const [activeAuthors, setActiveAuthors] = useState<string[]>([]);
  const [activeSources, setActiveSources] = useState<string[]>([]);
  const [activeFromDate, setActiveFromDate] = useState<Date | null>(null);
  const [activeToDate, setActiveToDate] = useState<Date | null>(null);

  const [articles, setArticles] = useState<Article[]>([]);

  const [query, setQuery] = useState<string>("");

  const [areFiltersApplied, setAreFiltersApplied] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  const nextPage = () => {
    if(isLoading) return;
    if(page + 1 > totalPages) return;

    setPage(page + 1);
  }


  useEffect(() => {
      fetchFilters();
  }, []);


  useEffect(() => {
    if (activeFromDate != null || activeToDate != null || (activeAuthors != null && activeAuthors.length > 0) || (activeSources != null && activeSources.length > 0)) {
      setAreFiltersApplied(true);
    } else {
      setAreFiltersApplied(false);
    }
    setPage(1);
    fetchArticles();
  }, [activeAuthors, activeSources, activeFromDate, activeToDate, query]);

  useEffect(() => {
    fetchArticles();
  }, [page]);

  const formatDates = (date: Date) => {
    let str = date.toLocaleDateString("fr-fr", { year: "numeric", month: "numeric", day: "numeric" }).replaceAll("/", "");
    return str;
  };

  const fetchArticles = async () => {
    setIsLoading(true);

    const url = "/api/articles";
    let params = new URLSearchParams();

    if (activeAuthors.length > 0) {
      params.append("authors", activeAuthors.join(","));
    }
    if (activeSources.length > 0) {
      params.append("sources", activeSources.join(","));
    }
    if (activeFromDate != null) {
      params.append("fromDate", formatDates(activeFromDate));
    }
    if (activeToDate != null) {
      params.append("toDate", formatDates(activeToDate));
    }

    if (query.length > 0) {
      params.append("q", query);
    }

    params.append("page", page.toString())

    let res = await fetch(`${url}?${params.toString()}`);

    if (!res.ok) {
      setIsError(true);
      setIsLoading(false);
      setArticles([]);

      return;
    }
    const json = await res.json();
    const articleList = (json.articles as Article[]).filter((a) => a.url);
    const totalPages = json.nbPages as number;

    setTotalPages(totalPages);

    if (page > 1) {
      //Add articles to the list
        setArticles([...articles, ...articleList]);
    } else {
        setArticles([...articleList]);
    }



    setIsLoading(false);
    setIsError(false);
  };


  const fetchFilters = async () => {
    let res = await fetch("/api/filters");

    if (!res.ok) {
      setIsError(true);
      setIsLoading(false);
      setArticles([]);

      return;
    }

    const json = await res.json();

    const sources = json.filters.sources as string[];
    const authors = json.filters.authors as string[];


    setSources(sources);
    setAuthors(authors);



  }


  return (
    <ArticlesContext.Provider
      value={{
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
        setActiveToDate,
        areFiltersApplied,
        isLoading,
        isError,
        nextPage
      }}
    >
      {children}
    </ArticlesContext.Provider>
  );
};

export const useArticles = () => useContext(ArticlesContext);
