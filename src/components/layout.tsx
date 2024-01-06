import type { PropsWithChildren } from 'react';

export const PageLayout = (props: PropsWithChildren<object>) => {

    return (
        <main className="flex h-screen flex-col items-center bg-gradient-to-b from-[#d5bdaf] to-[#edede9] relative">
            {/* add spacing to adjust for the navbar */}
            <div className="w-full h-1/6">
            </div>
            {props.children}
        </main>
    )
}