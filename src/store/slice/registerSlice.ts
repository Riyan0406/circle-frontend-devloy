import { createSlice } from "@reduxjs/toolkit"
import { registerAsync } from "../asyncThunk/registerAsync"

interface IRegisterState {
    id: string
}

const initialState: IRegisterState = {
    id: ""
}

export const registerSlice = createSlice({
    name: "register",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(registerAsync.fulfilled, (state, action) => {
                state.id = action.payload
            })
            .addCase(registerAsync.rejected, (_, action) => {
                console.log("rejected", action)
            })
            .addCase(registerAsync.pending, (_, action) => {
                console.log("pending", action)
            })
    },
})

export default registerSlice.reducer
