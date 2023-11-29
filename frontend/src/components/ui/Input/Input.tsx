import { VariantProps, cva } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import React, { forwardRef } from "react";

export const inputVariants = cva("border-gray-300 w-100");

export interface InputProps
    extends React.ComponentPropsWithRef<"input">,
        VariantProps<typeof inputVariants> {}

const Input: React.FC<InputProps> = forwardRef((props, ref) => {
    return (
        <input
            className={twMerge(inputVariants(), props.className)}
            {...props}
            ref={ref}
        />
    );
});

Input.displayName = "Input";

export default Input;

