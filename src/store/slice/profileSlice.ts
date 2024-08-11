import { createSlice } from "@reduxjs/toolkit";
import { getProfileAsync } from "../asyncThunk/profileAsync";

interface IInitialState {
    profile: ILoggedUser | null;
}

const initialState: IInitialState = {
    profile: null
};

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getProfileAsync.fulfilled, (state, action) => {
            state.profile = action.payload;
        });
    }
});

export default profileSlice.reducer;