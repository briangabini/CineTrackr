import { SignIn, useUser } from "@clerk/nextjs";
import Head from "next/head";

// import Link from "next/link";

import { api } from "~/utils/api";

export default function Home() {
  const hello = api.post.hello.useQuery({ text: "from tRPC" });

  const { isLoaded: userLoaded, isSignedIn } = useUser();

  // Return empty div if user isn't loaded yet
  if (!userLoaded) {
    return <div />;
  }

  return (
    <>
      <Head>
        <title>CineTrackr</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
        {/* <link rel="stylesheet" href="style.css" /> */}
      </Head>
      {/* bg-gradient-to-b from-[#2e026d] to-[#15162c] */}

      <main className="flex min-h-screen flex-row items-center justify-center bg-gradient-to-b from-[#d5bdaf] to-[#edede9]">

        {/* signin section */}

        {!isSignedIn && (
          <div className="flex justify-center">
            <SignIn />
          </div>
        )}

        {isSignedIn && (
          <span>You are signed in</span>
        )}

      </main>


    </>
  );
}
