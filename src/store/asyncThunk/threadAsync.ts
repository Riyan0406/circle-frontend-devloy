import { createAsyncThunk } from "@reduxjs/toolkit"
import getThreads from "../../lib/call/threads"

export const getThreadsAsync = createAsyncThunk("threads", async () => {
    try {
        const threadsRes = await getThreads()

        return threadsRes.data
    } catch (error) {
        console.log(error)
    }
})