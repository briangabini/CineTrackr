import { SignOutButton, SignInButton, UserButton } from "@clerk/nextjs";
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import toast from "react-hot-toast";

export const NavBar = (props: { isSignedIn: boolean }) => {
    const { user } = useUser();
    const { isSignedIn } = props;

    useEffect(() => {
        const handleSignIn = () => {
            if (isSignedIn) {
                toast.success("You have successfully logged in!")
            }
        }

        const handleSignOut = () => {
            if (!isSignedIn) {
                toast.success("You have successfully logged out!")
            }
        }

    })

    return (
        <nav className="bg-[#edede9] absolute top-0 w-full m-auto">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <span className="self-center text-2xl font-semibold px-2">CineTrackr</span>

                {/* md:block md:w-auto */}

                <div className="w-auto block ml-auto px-2 self-center">
                    <ul className="font-medium flex flex-row mt-0 border px-0">

                        {isSignedIn && (
                            <>

                                {/* <li className="self-center">
                                    <a href="#" className="block px-2 text-gray-900 hover:text-gray-400  m-auto">
                                        <SignOutButton />
                                    </a>
                                </li> */}

                                <li className="self-center">
                                    <a href="" className="block px-2 m-auto">
                                        <UserButton />
                                    </a>
                                </li>
                            </>
                        )}

                        {!isSignedIn && (
                            <>


                                <li>
                                    <a href="" className="block px-2 text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 m-auto">
                                        <SignInButton />
                                    </a>
                                </li>
                            </>
                        )}

                    </ul>
                </div>
            </div>
        </nav >
    );
}