import type { ReactNode } from "react";

interface ContainerProps {
    children: ReactNode;
}

export default function Container({ children }: ContainerProps) {
    return (
        <div className="min-h-screen from-gray-900 via-gray-800 to-gray-900 flex flex-col items-center justify-start pt-4 sm:pt-6 md:pt-8 pb-28 sm:pb-32 px-2 sm:px-4">
            {children}
        </div>
    );
}