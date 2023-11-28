import { User } from "@/types/models/User";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface AuthState {
    user: null | User;
    accessToken: null | string;
}

const initialState: AuthState = {
    user: null,
    accessToken: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials(state, action: PayloadAction<AuthState>) {
            const { user, accessToken } = action.payload;
            state.user = user;
            state.accessToken = accessToken;
        },

        logOut(state) {
            state.user = null;
            state.accessToken = null;
        },
    },
});

export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;

