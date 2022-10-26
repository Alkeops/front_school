import "@styles";
import { Navbar, PageContent, ToggleTheme } from "@components";
import Head from "next/head";
import { QueryProvider } from "config";

function MyApp({ Component, pageProps }) {
  return (
    <QueryProvider> <div>
     
        <Head>
          <title>School</title>
        </Head>
        <Navbar />
        <PageContent>
          <Component {...pageProps} />
        </PageContent>
     
    </div> </QueryProvider>
  );
}

export default MyApp;
