import { createAsyncThunk } from "@reduxjs/toolkit";
import getProfile from "../../lib/call/profile";

export const getProfileAsync = createAsyncThunk("profile", async () => {
    try {
        const ProfileRes = await getProfile();

        return ProfileRes.data;
    } catch (error) {
        console.log(error);
    }
});
