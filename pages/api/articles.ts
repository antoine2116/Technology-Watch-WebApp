import {NextApiRequest, NextApiResponse} from "next";
import algoliasearch from 'algoliasearch/lite';
import { Article } from "@/models/Article";
import moment from "moment";


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
    const {q, fromDate, toDate, authors, sources} = req.query;

    let query: string = "";
    if(q) {
        query = q.toString();
    }

    const searchClient = algoliasearch('A1UMASFHFR', '27ab332b0832d9d11b62076fd86de7ef');

    let filters = [];

    if (fromDate) {

        let m = moment(fromDate.toString(), "DDMMYYYY");
        let date = m.toDate();

        console.log("Date", date, fromDate.toString(), date.getTime())
        filters.push(`date >= ${date.getTime()}`);
    }
    if(toDate) {
        let m = moment(toDate.toString(), "DDMMYYYY");
        let date = m.toDate();

        console.log("Date", date, toDate.toString(), date.getTime())
        filters.push(`date <= ${date.getTime()}`);
    }
    if(authors) {
        let authorsArray = authors.toString().split(",");
        let str = `author:\"${authorsArray.join('\" OR author:\"')}\"`;
        console.log("Authors Filter", str)
        filters.push(str);
    }
    if(sources) {
        let sourceArray = sources.toString().split(",");
        let str2 = `source:\"${sourceArray.join('\" OR source:\"')}\"`;
        console.log("Sources Filter", str2)
        filters.push(str2);
    }

    console.log("Filters", filters)

    let results: Article[] = []
    try {
        const indexArticles = searchClient.initIndex('Articles');
        const resultArticles = await indexArticles.search( query,{
            filters: `${filters.join(" AND ")}`.trim(),
        });


        const hits = resultArticles.hits;

        // @ts-ignore
        hits.forEach((article : Article) => {
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