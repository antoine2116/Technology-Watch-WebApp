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
            console.log(article)
            let artObj: Article = {
                url: article.url.toString(),
                title: article.title.toString(),
                summary: article.summary.toString(),
                imageUrl: article.imageUrl ? article.imageUrl.toString() : null,
                date: new Date(article.date),
                source: article.source.toString(),
                author: article.author.toString()
            }
            results.push(artObj);

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