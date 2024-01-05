// default imports
import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";

// my imports
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "react-hot-toast";
import Head from "next/head";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider {...pageProps}>
      <Head>
        <title>CineTrackr</title>
        <meta name="description" content="🎥" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Toaster position="top-center" />
      <Component {...pageProps} />
    </ClerkProvider>)
};

export default api.withTRPC(MyApp);
