
export const LoadingDot = () => {
    return (
        <div className="flex items-center justify-center space-x-2">
            <div className="w-4 h-4 bg-[#f5ebe0] dark:bg-[#ccae98] rounded-full animate-pulse"></div>
            <div className="w-4 h-4 bg-[#f5ebe0] dark:bg-[#ccae98] rounded-full animate-pulse"></div>
            <div className="w-4 h-4 bg-[#f5ebe0] dark:bg-[#ccae98] rounded-full animate-pulse"></div>
        </div>
    )
}

export const LoadingPage = () => {

    return (
        <div className="w-screen h-screen bg-red flex justify-center items-center bg-gradient-to-b from-[#d5bdaf] to-[#edede9]">

            <LoadingDot />
        </div>
    )
}