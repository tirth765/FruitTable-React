import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    variant: '',
    message: ''
}

const alertSLice = createSlice(
    {
        name: "alert",
        initialState,
        reducers: {
            setAlert: (state, action) => {
                state.variant = action.payload.variant;
                state.message = action.payload.message;
            },
            resetAlert: (state, action) => {
                state.variant = "";
                state.message = "";
            }
        }
    }
)

export const {setAlert, resetAlert} = alertSLice.actions
export default alertSLice.reducer