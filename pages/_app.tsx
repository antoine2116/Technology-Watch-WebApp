import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter } from '@next/font/google'
import { QueryClient, QueryClientProvider } from "react-query";
import Layout from "@/components/Layout";
import {ArticlesProvider} from "@/contexts/ArticlesContext";

const inter = Inter({ subsets: ['latin'] })

function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
            <main className={inter.className}>
                <ArticlesProvider>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </ArticlesProvider>
            </main>
    </QueryClientProvider>
  );
}

export default App;
