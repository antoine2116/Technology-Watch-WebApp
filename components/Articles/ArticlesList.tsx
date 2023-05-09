import { IoCalendar, IoPerson } from "react-icons/io5";
import ArticleItem from "./ArticleItem";
import { Article } from "@/models/Article";
import TextToSpeechPlayer from "../TextToSpeech/TextToSpeechPlayer";

interface ArticleListProps {
  articles: Article[];
}

function ArticleList({ articles }: ArticleListProps) {
  return (
    <>
      {/* Player */}
      <div className="max-w-sm bg-white border border-gray-200 rounded shadow mb-3">
        <div className="p-4">
          <TextToSpeechPlayer
            articles={articles}
            multi={true}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {articles.map((article, i) => (
          <ArticleItem
            key={i}
            article={article}
          />
        ))}
      </div>
    </>
  );
}

export default ArticleList;
