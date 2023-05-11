import { Article } from "@/models/Article";

export const generateTextToSpeechText = (article: Article) => {
  const { title, summary, date, author, source } = article;
  return `Article title ${title} posted by ${author} on ${source}` +
         ` on ${(new Date(date)).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}.` +
         ` ${summary}`;
}