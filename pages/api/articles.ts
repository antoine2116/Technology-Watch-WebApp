import {NextApiRequest, NextApiResponse} from "next";
import algoliasearch from 'algoliasearch/lite';

interface Article {
    url: string;
    title: string;
    summary: string;
    imageUrl: string | null;
    date: Date;
    source: string;
    author: string;

}


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if(req.method === "GET") {
        await GET(req, res);
    }

    if(req.method === "POST") {
        //await POST(req, res);
    }
}


// @ts-ignore
// @ts-ignore
const GET = async (req: NextApiRequest, res: NextApiResponse) => {
    const {q, fromDate, toDate, author, source} = req.query;

    let query: string = "";
    if(q) {
        query = q.toString();
    }

    const searchClient = algoliasearch('A1UMASFHFR', '27ab332b0832d9d11b62076fd86de7ef');

    let filters = [];
    if (fromDate) {
        filters.push(`date >= ${fromDate}`);
    }
    if(toDate) {
        filters.push(`date <= ${toDate}`);
    }
    if(author) {
        filters.push(`author:${author}`);
    }
    if(source) {
        filters.push(`source:${source}`);
    }

    let results: Article[] = []
    try {
        const indexArticles = searchClient.initIndex('Articles');
        const resultArticles = await indexArticles.search( query,{
            filters: `${filters.join(" AND ")}`.trim(),
        });


        const hits = resultArticles.hits;
        hits.forEach((article) => {
            results.push(castToArticle(article));

        })

        res.status(200).json({ articles: results });


    }catch(e) {
        console.log(e);
        res.status(500).json({ error: "Internal Server Error" });
    }

    res.end();
}


const POST = async (req: NextApiRequest, res: NextApiResponse) => {

}




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