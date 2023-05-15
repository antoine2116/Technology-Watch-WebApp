import { NextApiRequest, NextApiResponse } from "next";
import algoliasearch, { SearchClient } from "algoliasearch/lite";
import { Article } from "@/models/Article";
import moment from "moment";

const API_KEY = process.env.ALGOLIA_API_KEY;
const APP_ID = process.env.ALGOLIA_APP_ID;
let searchClient: SearchClient;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!API_KEY || !APP_ID) {
    res.status(500).json({ error: "Internal Server Error" });
    console.error("Algolia API Key or App ID not set in .env file");
    return;
  }

  if (req.method === "GET") {
    searchClient = algoliasearch(APP_ID, API_KEY);
    await GET(req, res);
  }

  if (req.method === "POST") {
    //await POST(req, res);
  }
}

// @ts-ignore
// @ts-ignore
const GET = async (req: NextApiRequest, res: NextApiResponse) => {
  const { q, fromDate, toDate, authors, sources, page } = req.query;

  let query: string = "";
  if (q) {
    query = q.toString();
  }


  let p = 0
  if(!page){
    p = 1
  }else{
    p = parseInt(page.toString())
  }

  let filters = [];

  if (fromDate) {
    let m = moment(fromDate.toString(), "DDMMYYYY");
    let date = m.toDate();
    filters.push(`date >= ${date.getTime()}`);
  }
  if (toDate) {
    let m = moment(toDate.toString(), "DDMMYYYY");
    let date = m.toDate();
    filters.push(`date <= ${date.getTime()}`);
  }
  if (authors) {
    let authorsArray = authors.toString().split(",");
    let str = `author:\"${authorsArray.join('" OR author:"')}\"`;
    filters.push(str);
  }
  if (sources) {
    let sourceArray = sources.toString().split(",");
    let str2 = `source:\"${sourceArray.join('" OR source:"')}\"`;
    filters.push(str2);
  }

  let results: Article[] = [];
  try {
    const indexArticles = searchClient.initIndex("Articles");
    const resultArticles = await indexArticles.search(query, {
      filters: `${filters.join(" AND ")}`.trim(),
      page: p -1
    });


    const hits = resultArticles.hits;

    // @ts-ignore
    hits.forEach((article: Article) => {
      results.push(castToArticle(article));
    });

    res.status(200).json({ articles: results, page: resultArticles.page, nbPages: resultArticles.nbPages});
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Internal Server Error" });
  }

  res.end();
};

const POST = async (req: NextApiRequest, res: NextApiResponse) => {};

function castToArticle(data: any): Article {
  return {
    url: data.url,
    title: data.title,
    summary: data.summary,
    imageUrl: data.imageUrl || null,
    date: new Date(data.date),
    source: data.source,
    author: data.author,
  } as Article;
}
