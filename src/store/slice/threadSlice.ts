import { createSlice } from "@reduxjs/toolkit"
import { getThreadsAsync } from "../asyncThunk/threadAsync"

interface IInitialState {
    threads: IThread[]
}

const initialState: IInitialState = {
    threads: []
}

const threadSlice = createSlice({
    name: "threads",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getThreadsAsync.fulfilled, (state, action) => {
            state.threads = action.payload
        })
    }
})

export default threadSlice.reducer