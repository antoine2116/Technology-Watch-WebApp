import { IoCalendar, IoPerson } from "react-icons/io5";
import Image from "next/image";
import Link from "next/link";

import { getFaviconFromUrl } from "@/helpers/ImageHelper";
import { Article } from "@/models/Article";
import {useEffect} from "react";

interface ArticleItemProps {
  article: Article;
}

function ArticleItem({
  article
}: ArticleItemProps) {


  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded shadow">
      <div className="p-4">
        <div className="flex justify-end">
          {article.imageUrl && (
              <Image
                  src={getFaviconFromUrl(article.imageUrl)}
                  height={24}
                  width={24}
                  alt={article.title}
              />
          )}

        </div>
        <Link href={article.url} target={"_blank"}>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-slate-900">
            {article.title}
          </h5>
        </Link>
        <div className="flex flex-col space-y-1 mb-3">
          <div className="inline-flex items-center">
            <IoPerson className="mr-2 text-green-700" />
            <span className="text-sm">
              {article.author}
            </span>
          </div>
        </div>
        <p className="mb-4 font-normal text-slate-700 text-sm line-clamp-4">
          {article.summary}
        </p>
        <div className="flex justify-between">
          <div className="inline-flex items-center text-xs">
            <IoCalendar className="mr-2 text-slate-600" />
            <span className="text-sm">
              {new Date(article.date).toLocaleDateString('fr-fr', { year:"numeric", month:"numeric", day:"numeric"})}
            </span>
          </div>
          <Link
              target={"_blank"}
            href={article.url}
            className="inline-flex items-center px-3 py-1 text-sm font-medium text-center text-white bg-green-700 rounded-lg">
            Read more...
          </Link>
        </div>
      </div>
    </div >
  )
}

export default ArticleItem;