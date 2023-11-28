import { apiSlice } from "../../apiSlice";
import { AuthReponseDto } from "./dto/AuthResponseDto";
import { SigninDto } from "./dto/SigninDto";
import { SignupDto } from "./dto/SignupDto";

export const authApi = apiSlice.injectEndpoints({
    endpoints(builder) {
        return {
            signin: builder.mutation<AuthReponseDto, SigninDto>({
                query(body) {
                    return {
                        url: `auth/signin`,
                        method: "POST",
                        body,
                    };
                },
            }),

            signup: builder.mutation<AuthReponseDto, SignupDto>({
                query(body) {
                    return {
                        url: `auth/signup`,
                        method: "POST",
                        body,
                    };
                },
            }),

            logout: builder.mutation<void, void>({
                query() {
                    return {
                        url: `auth/logout`,
                        method: "POST",
                    };
                },
            }),

            refresh: builder.mutation<AuthReponseDto, void>({
                query() {
                    return {
                        url: `auth/refresh`,
                        method: "POST",
                    };
                },
            }),
        };
    },
});

export const {
    useSigninMutation,
    useSignupMutation,
    useLogoutMutation,
    useRefreshMutation,
} = authApi;

