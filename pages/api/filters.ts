import algoliasearch, {SearchClient} from "algoliasearch";
import {NextApiRequest, NextApiResponse} from "next";
import moment from "moment/moment";
import {Article} from "@/models/Article";

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

const GET = async (req: NextApiRequest, res: NextApiResponse) => {


    let authors = new Set();
    let sources = new Set();
    try {
        const indexArticles = searchClient.initIndex("Articles");



        indexArticles.browseObjects({
            query: '', // empty query will match all records
            batch: batch => {
                // @ts-ignore
                batch.forEach((hit: Article) => {
                    authors.add(hit?.author);
                    sources.add(hit?.source);
                });
            },
        }).then(() => {
            res.status(200).json({ filters: {sources:Array.from(sources), authors:Array.from(authors)} });
            res.end();
        }).catch((e) => {
            res.status(500).json({ error: "Internal Server Error" });
        });

    } catch (e) {
        console.log(e);
        res.status(500).json({ error: "Internal Server Error" });
        res.end();
    }

};