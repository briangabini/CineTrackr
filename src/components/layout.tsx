import type { PropsWithChildren } from 'react';

export const PageLayout = (props: PropsWithChildren<object>) => {

    return (
        <main className="flex h-screen flex-row items-center justify-center bg-gradient-to-b from-[#d5bdaf] to-[#edede9]">
            {props.children}
        </main>
    )
}