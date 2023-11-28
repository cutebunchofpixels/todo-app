import Button, { buttonVariants } from "@/components/ui/Button/Button";
import Link from "next/link";

export default function Auth() {
    return (
        <div className="flex items-center justify-center flex-col">
            <h1 className="text-3xl font-semibold mb-6">Welcome to todo app</h1>
            <div className="flex gap-4">
                <Link href="auth/signin" className={buttonVariants()}>
                    Sign in
                </Link>
                <Link href="auth/signup" className={buttonVariants()}>
                    Sign up
                </Link>
            </div>
        </div>
    );
}

