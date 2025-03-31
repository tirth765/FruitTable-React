import { configureStore } from "@reduxjs/toolkit"
import { rootReducer } from "./reducer"

export const createStore = () => {
    const store = configureStore ({
        reducer: rootReducer,
        })

    return store
}