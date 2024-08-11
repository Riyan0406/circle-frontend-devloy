import { createSlice } from "@reduxjs/toolkit"
import { getSuggestAsync } from "../asyncThunk/suggestAsync"

interface IInitialState {
    suggest: IUser[]
}

const initialState: IInitialState = {
    suggest: []
}

const suggestSlice = createSlice({
    name: "suggest",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getSuggestAsync.fulfilled, (state, action) => {
            state.suggest = action.payload
        })
    }
})

export default suggestSlice.reducer