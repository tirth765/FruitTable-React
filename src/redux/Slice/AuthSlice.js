import axios from "axios";
import { BASE_URL } from "../../Utils/Base";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    user: null,
    isValidate: false,
    error: null,
};

export const userRegister = createAsyncThunk (
    'auth/userRegister',
    
    async (data) => {
        const response = await axios.post(BASE_URL + "users/register", data) 

        console.log(response);
        
    }
)

export const userLogin = createAsyncThunk (
    'auth/userLogin',

    async (data) => {

        const response = await axios.post(BASE_URL + "users/login", data, { withCredentials: true })

        console.log(response.data);

        if(response.data.success) {
            return response.data.data
        }
    }
)

export const userLogout = createAsyncThunk (
    'auth/userLogout',

    async (id) => {
        const response = await axios.post(BASE_URL + "users/login", {_id: id}, { withCredentials: true })

        console.log(response);
        
    }
)

const AuthSlice = createSlice({
    name:"auth",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(userLogin.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload;
            state.isValidate = true;
            state.error = null;
        })
        builder.addCase(userLogout.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = null;
            state.isValidate = false;
            state.error = null;
        })
    }
})

export default AuthSlice.reducer