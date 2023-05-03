import { IoCalendar, IoPerson } from "react-icons/io5";
import ArticleItem from "./ArticleItem";
import { Article } from "@/models/Article";

interface ArticleListProps {
  articles: Article[];
}

function ArticleList({
  articles
}: ArticleListProps) {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {articles.map((article, i) => {
            console.log('article', article)
            return (<ArticleItem
                key={i}
                article={article}
            />
            )}
        )}
      </div>
    </>
  )
}

export default ArticleList;