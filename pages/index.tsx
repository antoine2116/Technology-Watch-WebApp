import ArticleList from "@/components/Articles/ArticlesList";
import { Article } from "@/models/Article";

export default function Home() {
  const articles: Article[] = [
    {
      url: "https://www.google.com",
      title: "Article 1",
      summary: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempora ipsam corrupti eos dolor, officia dignissimos asperiores? Doloremque vel alias inventore molestiae quia, quis expedita error et, voluptates omnis hic veniam.",
      imageUrl: null,
      date: new Date(),
      author: "Jean Michel Aulas",
      source: "xxxx"
    },
    {
      url: "https://www.github.com",
      title: "Article 2",
      summary: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempora ipsam corrupti eos dolor, officia dignissimos asperiores? Doloremque vel alias inventore molestiae quia, quis expedita error et, voluptates omnis hic veniam.",
      imageUrl: null,
      date: new Date(),
      author: "Dominique Rocheteau",
      source: "xxxx"
    },
    {
      url: "https://www.stackoverflow.com",
      title: "Article 3",
      summary: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempora ipsam corrupti eos dolor, officia dignissimos asperiores? Doloremque vel alias inventore molestiae quia, quis expedita error et, voluptates omnis hic veniam.",
      imageUrl: null,
      date: new Date(),
      author: "Dominique Rocheteau",
      source: "xxxx"
    }
  ];

  return (
    <>
      <div className="mb-4">
        <h1 className="font-extrabold text-3xl tracking-tight">Technology Watch</h1>
      </div>
      <ArticleList articles={articles} />
    </>
  )
}
