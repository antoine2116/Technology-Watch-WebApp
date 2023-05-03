import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return <h1 className="font-extrabold text-3xl tracking-tight">Technology Watch</h1>;
}
