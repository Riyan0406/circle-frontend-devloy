import { createAsyncThunk } from "@reduxjs/toolkit"
import getSuggest from "../../lib/call/suggest"

export const getSuggestAsync = createAsyncThunk("suggest", async () => {
    try {
        const suggestRes = await getSuggest()

        return suggestRes.data
    } catch (error) {
        console.log(error)
    }
})