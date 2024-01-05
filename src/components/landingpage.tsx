import { SignInButton } from "@clerk/nextjs";

export const LandingPage = () => {

    return (
        <>

            <div className="flex flex-col flex-wrap items-center text-wrap">
                <span className="font-sans font-size font-bold text-5xl block p-2 m-2 text-center">CineTrackr</span>

                <div className="w-3/5">
                    <span className="font-sans p-2 m-2 block text-center">CineTrackr lets you effortlessly build and organize your movie library by manually inputting movie details. Add films by entering titles, release years, genres, directors, cast, ratings, and your personal reviews.</span>

                </div>


                <button className="text-lg font-sans p-2 m-2 font-bold text-center hover:text-gray-500">
                    <SignInButton >
                        Get Started
                    </SignInButton>

                </button>
            </div>



        </>
    )
}