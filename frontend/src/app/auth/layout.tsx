import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
    return (
        <div className="grid md:grid-cols-2">
            {children}
            <div className="bg-[url('/auth-banner.jpg')] bg-cover brightness-75 hidden md:block"></div>
        </div>
    );
}

