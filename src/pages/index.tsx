import { SignIn, useUser, SignOutButton } from "@clerk/nextjs";
import Head from "next/head";

// import Link from "next/link";

import { api } from "~/utils/api";

/* new imports */
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Rating from "@prontopro/react-rating";

/* COMPONENTS */
import { LoadingPage } from "~/components/loading";
import { NavBar } from "~/components/navbar";
import { LandingPage } from "~/components/landingpage";
import { PageLayout } from "~/components/layout";
import { LoadingDot } from "~/components/loading";
import { set } from "zod";

// component htmlFor creating a movie entry
const CreateMovieWizard = () => {
  const { user } = useUser();

  const [titleInput, setTitleInput] = useState("");
  const [directorInput, setDirectorInput] = useState("");
  const [genreInput, setGenreInput] = useState("");
  const [ratingInput, setRatingInput] = useState(0);

  const ctx = api.useUtils();

  // TODO: create a mutation procedure in movies router
  const { mutate: createMovie, isLoading: isCreating } =
    api.movies.createMovie.useMutation({
      onSuccess: () => {
        // reset input fields
        setTitleInput("");
        setDirectorInput("");
        setGenreInput("");
        setRatingInput(0);

        // dismiss the loading input
        dismissToast();

        // refetch the data
        void ctx.movies.getMoviesByUserId.invalidate();
      },

      onError: (e) => {
        const errorMessage = e.data?.zodError?.fieldErrors.content;
        if (errorMessage?.[0]) {
          toast.error(errorMessage[0]);
        } else {
          toast.error("Failed to post! Please Try again later.");
        }
        dismissToast();
      },
    });

  // show loading notification
  if (isCreating) {
    toast.loading("Creating movie...", {
      id: "loading",
    });
  }

  // dismiss loading notification
  function dismissToast() {
    toast.dismiss("loading");
  }

  /* const handleRatingChange = (event) => {
    const newValue = parseInt(event.target.value, 10); // Parse the input value to an integer
    setRatingInput(newValue); // Update the state with the new value
  }; */

  // TODO: field inputs

  return (
    // section htmlFor creating a movie entry with fields: title, director, genre, rating
    <section className="flex w-full flex-col justify-start p-4">
      <form className="mr-auto w-1/5 max-w-md">
        <div className="group relative z-0 mb-5 w-full">
          <input
            type="text"
            name="title"
            id="title"
            className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
            placeholder=" "
            required
            onChange={(e) => {
              setTitleInput(e.target.value);
            }}
          />
          <label
            htmlFor="title"
            className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 dark:text-gray-400 peer-focus:dark:text-blue-500"
          >
            Movie Title
          </label>
        </div>
        <div className="group relative z-0 mb-5 w-full">
          <input
            type="text"
            name="director"
            id="director"
            className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
            placeholder=" "
            onChange={(e) => {
              setDirectorInput(e.target.value);
            }}
          />
          <label
            htmlFor="director"
            className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 rtl:peer-focus:translate-x-1/4 dark:text-gray-400 peer-focus:dark:text-blue-500"
          >
            Director
          </label>
        </div>

        <div className="group relative z-0 mb-5 w-full">
          <input
            type="text"
            name="genre"
            id="genre"
            className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
            placeholder=" "
            onChange={(e) => {
              setGenreInput(e.target.value);
            }}
          />
          <label
            htmlFor="genre"
            className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 rtl:peer-focus:translate-x-1/4 dark:text-gray-400 peer-focus:dark:text-blue-500"
          >
            Genre
          </label>
        </div>

        <Rating
          animateOnHover={true}
          disableAnimation={false}
          initialRate={ratingInput}
          step={1}
          stop={5}
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          onChange={(rate) => setRatingInput(rate)}
        />

        <button
          type="button"
          className="mt-7 w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={() => {
            /* createMovie({
              title: titleInput,
              director: directorInput,
              genre: genreInput,
              rating: ratingInput,
            }); */

            console.log({
              title: titleInput,
              director: directorInput,
              genre: genreInput,
              rating: ratingInput,
            });
          }}
        >
          Add Movie
        </button>
      </form>
    </section>
  );
};

const MovieList = () => {
  const { user } = useUser();

  const usersId = user!.id;
  const { data, isLoading: moviesLoading } =
    api.movies.getMoviesByUserId.useQuery({ userId: usersId });

  console.log(data);

  if (!data) {
    return <div>Something went wrong</div>;
  }

  return {
    /* <div>
      {data.map((movie) => (
        <div key={movie.id}>
          <th>
            <p>{movie.title}</p>
        </div>
      ))}
    </div> */
  };
};

export default function Home() {
  // get user info from clerk
  const { isLoaded: userLoaded, isSignedIn, user } = useUser();

  // const { data } = api.movies.getMoviesByUserId.useQuery({ userId: "user_2aWNPxa0jC1uPqwzLLIh6se3TYa" })

  // Checks if user is signed in and if they haven't been shown the alert yet

  useEffect(() => {
    if (isSignedIn && !localStorage.getItem("shown")) {
      toast.success("You have successfully logged in!");
      // Set item in local storage so they aren't shown the alert again
      localStorage.setItem("shown", "true");
    }
  }, [isSignedIn]);

  // Return empty div if user isn't loaded yet
  if (!userLoaded) {
    return <LoadingPage />;
  }

  console.log("user info", user);

  // console.log('data ', data)

  return (
    <>
      <PageLayout>
        {/* navbar */}
        <NavBar isSignedIn={isSignedIn}></NavBar>

        {!isSignedIn && <LandingPage />}

        {isSignedIn && (
          <>
            <CreateMovieWizard />

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
                <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Movie Title
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Director
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Genre
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Rating
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>{/* <MovieList /> */}</tbody>
              </table>
            </div>
          </>
        )}
      </PageLayout>
    </>
  );
}
