import { SignIn, useUser, SignOutButton } from "@clerk/nextjs";
import Head from "next/head";

// import Link from "next/link";

import { api } from "~/utils/api";

/* new imports */
import { useState, useEffect } from 'react';
import toast from "react-hot-toast";

/* COMPONENTS */
import { LoadingPage } from "~/components/loading";
import { NavBar } from "~/components/navbar";
import { LandingPage } from "~/components/landingpage";
import { PageLayout } from "~/components/layout";
import { LoadingDot } from "~/components/loading";

// component for creating a movie entry
const CreateMovieWizard = () => {
  const { user } = useUser();

  const [input, setInput] = useState("");

  const ctx = api.useUtils();

  // TODO: create a mutation procedure in movies router
  const { mutate: createMovie, isLoading: isCreating } = api.movies.createMovie.useMutation({
    onSuccess: () => {
      setInput("");
      dismissToast();
      // Invalidating a query with react-query causes it to automatically refetch the data, ensuring that your UI stays up-to-date after the mutation.
      void ctx.movies.getMoviesByUserId.invalidate();
    },
    onError: (e) => {
      const errorMessage = e.data?.zodError?.fieldErrors.content;
      if (errorMessage?.[0]) {
        toast.error(errorMessage[0]);
      } else {
        toast.error("Failed to post! Please Try again later.")
      }
      dismissToast();
    }
  })
  
  console.log(user)

  if (isCreating) {
    toast.loading('Creating movie...',{
      id: 'loading'
    })
  }

  function dismissToast(){
    toast.dismiss('loading')
  }

  return (
    // TODO: field inputs
    // temp w/o designs yet
    <div className="absolute left-12 top-12 mt-10 flex w-4/12 mb-5 grow py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-stone-400 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0">

    {/* movie title input */}
      <input
        placeholder="Enter Movie Title"
        type="text"
        value={input}
        // className="grow py-2.5 w-full px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-stone-400 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0"
        className="grow bg-transparent outline-none"
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();

            if (input !== "") {
              createMovie({ title: input });
            }
          }
        }}
        disabled={isCreating}
      />

        {input !== "" && !isCreating && (
          <button onClick={() => {
              createMovie({ title: input });
          }}>
            Add
          </button>
        )}

      {/* {isCreating && (
        <div className="flex items-center justify-center">
          <LoadingDot />
        </div>
      )} */}

    </div>
  )
}

const MovieList = () => {
  const { data, isLoading: moviesLoading } = api.movies.getMoviesByUserId.useQuery({ userId: "user_2aWnhrb2ehojpo7Rg2YNS7UNXHS" })
  
  console.log(data)

  if (!data) {
    return <div>Something went wrong</div>
  }

  return (
    <div className="flex flex-col">
      {data.map((movie) => (
        <div key={movie.id}>
          <p>{movie.title}</p>
        </div>
      ))}
    </div>
  )
}

export default function Home() {
  // get user info from clerk
  const { isLoaded: userLoaded, isSignedIn, user } = useUser();

  // const { data } = api.movies.getMoviesByUserId.useQuery({ userId: "user_2aWNPxa0jC1uPqwzLLIh6se3TYa" })

  // Checks if user is signed in and if they haven't been shown the alert yet

  useEffect(() => {
    if (isSignedIn && !localStorage.getItem('shown')) {
      toast.success("You have successfully logged in!")
      // Set item in local storage so they aren't shown the alert again
      localStorage.setItem('shown', 'true')
    }
  }, [isSignedIn])


  // Return empty div if user isn't loaded yet
  if (!userLoaded) {
    return <LoadingPage />;
  }

  console.log('user info', user)

  // console.log('data ', data)

  return (
    <>
      <PageLayout>

        {/* navbar */}
        <NavBar isSignedIn={isSignedIn}></NavBar>

        {!isSignedIn && (
          <LandingPage />
        )}

        {isSignedIn && (
          <CreateMovieWizard />
        )}

        <MovieList />
        
      </PageLayout>

    </>
  );
}