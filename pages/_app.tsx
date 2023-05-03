import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter } from '@next/font/google'
import { QueryClient, QueryClientProvider } from "react-query";
import Layout from "@/components/Layout";

const inter = Inter({ subsets: ['latin'] })

function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <main className={inter.className}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <div id="portal"></div>
      </main>
    </QueryClientProvider>
  );
}

export default App;
