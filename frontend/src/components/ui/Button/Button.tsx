import { VariantProps, cva } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

export const buttonVariants = cva("rounded-lg", {
    variants: {
        variant: {
            primary:
                "bg-primary text-white hover:bg-hover active:bg-dark-blue disabled:bg-inactive",
            secondary:
                "bg-white border text-primary border-solid border-primary hover:border-hover hover:text-hover",
        },
        size: {
            md: "py-3 px-8",
            sm: "py-2 px-4",
        },
    },
    defaultVariants: {
        variant: "primary",
        size: "md",
    },
});

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {}

export default function Button({
    variant,
    size,
    className,
    children,
    ...props
}: ButtonProps) {
    return (
        <button
            className={twMerge(buttonVariants({ variant, size }), className)}
            {...props}
        >
            {children}
        </button>
    );
}

