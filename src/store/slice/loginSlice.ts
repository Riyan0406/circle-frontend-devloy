import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../types/app";
import { authCheckAsync, loginAsync } from "../asyncThunk/loginAsync"

interface IAuthState {
    isLogin: boolean
    token: string
    profile: IUser
}

const initialState: IAuthState = {
    isLogin: false,
    token: "",
    profile: {} as IUser,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        LOGIN: (state, action) => {
            console.log("FROM LOGIN ACTION", action.payload);

            state.isLogin = true
        },
        LOGOUT: (state, action) => {
            console.log("FROM LOGIN ACTION", action.payload);
            state.isLogin = false
        }
    },
    extraReducers(builder) {
        builder
            .addCase(loginAsync.fulfilled, (state, action) => {
                state.isLogin = true;
                state.token = action.payload;
            })
            .addCase(loginAsync.rejected, (_, action) => {
                console.log("rejected", action);
            })
            .addCase(loginAsync.pending, (_, action) => {
                console.log("pending", action);
            });

        builder
            .addCase(authCheckAsync.fulfilled, (state, action) => {
                state.isLogin = true;
                state.token = action.payload;
            })
            .addCase(authCheckAsync.rejected, (_, action) => {
                console.log("rejected", action);
            })
            .addCase(authCheckAsync.pending, (_, action) => {
                console.log("pending", action);
            });
    },
});

export const { LOGIN, LOGOUT } = authSlice.actions;

export default authSlice.reducer;
