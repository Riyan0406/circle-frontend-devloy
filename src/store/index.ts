import { configureStore } from "@reduxjs/toolkit"
import { useSelector, useDispatch } from "react-redux"
import threadReducer from "./slice/threadSlice"
import registerReducer from "./slice/registerSlice"
import suggestReducer from "./slice/suggestSlice"
import loginReducer from "./slice/loginSlice"
import profileReducer from "./slice/profileSlice"

const store = configureStore({
    reducer: {
        register: registerReducer,
        login: loginReducer,
        thread: threadReducer,
        suggest: suggestReducer,
        user: profileReducer
    }
})

export default store

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
type AppDispatch = typeof store.dispatch

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()