import { IoCalendar, IoPerson } from "react-icons/io5";
import Image from "next/image";
import Link from "next/link";

import { getFaviconFromUrl } from "@/helpers/ImageHelper";
import { Article } from "@/models/Article";
import { useEffect } from "react";
import TextToSpeechPlayer from "../TextToSpeech/TextToSpeechPlayer";

interface ArticleItemProps {
  article: Article;
}

function ArticleItem({ article }: ArticleItemProps) {
  return (
    <div className="w-full bg-white border border-gray-200 rounded shadow">
      <div className="p-4 h-full flex flex-col justify-between">
        <div className={'h-fit'}>
          <div className="flex justify-end">
            {article.url && (
                <Image
                    src={getFaviconFromUrl(article.url)}
                    height={24}
                    width={24}
                    alt={article.title}
                />
            )}
          </div>
          <Link
              href={article.url}
              target={"_blank"}
          >
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-slate-900">{article.title}</h5>
          </Link>
          <div className="flex flex-col space-y-1 mb-3">
            <div className="inline-flex items-center">
              <IoPerson className="mr-2 text-green-700" />
              <span className="text-sm">{article.author}</span>
            </div>
          </div>
          <p className="mb-4 font-normal text-slate-700 text-sm line-clamp-4">{article.summary}</p>
        </div>

        <div className="flex justify-between">
          <div className="inline-flex items-center text-xs">
            <IoCalendar className="mr-2 text-slate-600" />
            <span className="text-sm">{new Date(article.date).toLocaleDateString("fr-fr", { year: "numeric", month: "numeric", day: "numeric" })}</span>
          </div>
          <div className={'gap-2 flex'}>
            <Link
                target={"_blank"}
                href={article.url}
                className="inline-flex items-center px-3 py-0.5 text-sm font-medium text-center text-white bg-green-700 rounded-lg"
            >
              Read more
            </Link>
            <TextToSpeechPlayer articles={[article]} />
          </div>

        </div>
      </div>
    </div>
  );
}

export default ArticleItem;
