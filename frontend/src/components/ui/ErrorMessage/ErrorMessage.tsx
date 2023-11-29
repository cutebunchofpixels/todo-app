import { twMerge } from "tailwind-merge";

interface ErrorMessageProps extends React.ComponentPropsWithoutRef<"p"> {}

export default function ErrorMessage({
    className,
    children,
    ...rest
}: ErrorMessageProps) {
    if (!children) {
        return null;
    }

    console.log(children);
    return <p className={twMerge("text-red-600", className)}>{children}</p>;
}

