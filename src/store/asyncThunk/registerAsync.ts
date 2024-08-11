import { createAsyncThunk } from "@reduxjs/toolkit"
import { API } from "../../lib/api"

interface IRegisterForm {
    fullname: string
    email: string
    password: string
}

export const registerAsync = createAsyncThunk<
    string,
    IRegisterForm,
    { rejectValue: string }
>("auth/register", async (props, { rejectWithValue }) => {
    try {
        console.log("props", props)
        const { data } = await API.post("/register", props)

        return data
    } catch (error) {
        return rejectWithValue("error")
    }
})
