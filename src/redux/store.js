import { configureStore } from "@reduxjs/toolkit"
import { rootReducer } from "./reducer"
import { CategorySlice } from "./Slice/CategorySlice"

export const createStore = () => {
    const store = configureStore ({
        reducer: rootReducer,
        })

    return store
}