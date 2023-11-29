"use client";
import Button from "@/components/ui/Button/Button";
import { useSignupMutation } from "@/redux/app/api/endpoints/auth/authApi";
import { SignupDto } from "@/redux/app/api/endpoints/auth/dto/SignupDto";
import { useAppDispatch } from "@/redux/app/hooks";
import { setCredentials } from "@/redux/features/auth/authSlice";
import { useRouter } from "next/navigation";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Input from "@/components/ui/Input/Input";
import Link from "next/link";
import ErrorMessage from "@/components/ui/ErrorMessage/ErrorMessage";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

const validationSchema = yup.object().shape({
    name: yup
        .string()
        .required("Name is a required field")
        .typeError("Name must be a string"),
    email: yup
        .string()
        .required("Email is a required field")
        .email("Provided value is not a valid email")
        .typeError("Email must be a string"),
    password: yup
        .string()
        .required("Password is a required field")
        .typeError("Password must be a string"),
});

export default function Signup() {
    const [signup, { error: signupError }] = useSignupMutation();
    const dispatch = useAppDispatch();
    const router = useRouter();
    let signupErrorMessage: string | null = null;

    const {
        register,
        handleSubmit: rhfSumbit,
        formState,
    } = useForm({
        mode: "onChange",
        resolver: yupResolver<SignupDto>(validationSchema),
    });

    async function handleSubmit(credentials: SignupDto) {
        const { user, accessToken } = await signup(credentials).unwrap();
        dispatch(setCredentials({ user, accessToken }));
        router.push("/todos");
    }

    if (signupError) {
        const data = (signupError as FetchBaseQueryError).data as {
            message?: string;
        };
        if (data && data.message) {
            signupErrorMessage = data.message;
        }
    }

    return (
        <div className="flex items-center justify-center flex-col">
            <div className="w-3/5">
                <h2 className="text-2xl font-semibold">Welcome to todo app</h2>
                <p className="text-sm mb-8">Create an account to continue</p>
                <form
                    className="space-y-4 flex flex-col"
                    onSubmit={rhfSumbit(handleSubmit)}
                >
                    <div className="flex flex-col gap-1">
                        <label htmlFor="name">Your name</label>
                        <Input id="name" {...register("name")} />
                        <ErrorMessage>
                            {formState.errors.name?.message}
                        </ErrorMessage>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="name">Email</label>
                        <Input id="email" {...register("email")} />
                        <ErrorMessage>
                            {formState.errors.email?.message}
                        </ErrorMessage>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="name">Password</label>
                        <Input
                            id="password"
                            type="password"
                            {...register("password")}
                        />
                        <ErrorMessage>
                            {formState.errors.password?.message}
                        </ErrorMessage>
                    </div>
                    <div className="grid">
                        <ErrorMessage className="place-self-center mb-2">
                            {signupErrorMessage}
                        </ErrorMessage>
                        <Button type="submit">Sumbit</Button>
                        <p className="text-sm place-self-center mt-2">
                            Already have an account?{" "}
                            <Link href="/auth/signin">Sign in</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}

