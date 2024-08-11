import { createAsyncThunk } from "@reduxjs/toolkit"
import login from "../../lib/call/login"
import { ILoginForm } from "../../validation/useLoginValidation";
import { API, setAuthToken } from "../../lib/api";
// import { getProfile } from "../../lib/api/call/profile"

export const loginAsync = createAsyncThunk(
    "auth/login",
    async (body: ILoginForm, thunkAPI) => {
        try {
            const res = await login(body);

            const token = res.data.token
            console.log(token);
            localStorage.setItem("token", token);

            return token;
        } catch (error) {
            const err = error as unknown as Error;
            console.log(err);

            thunkAPI.rejectWithValue(err.message);
        }
    }
);

export const authCheckAsync = createAsyncThunk<
    string,
    string,
    { rejectValue: string }
>("auth/authCheck", async (token, { rejectWithValue }) => {
    try {
        const { data } = await API.get("authCheck", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        setAuthToken(token);

        console.log("data", data);
        return token;
    } catch (error) {
        setAuthToken();
        localStorage.removeItem("token");
        return rejectWithValue("error");
    }
});
