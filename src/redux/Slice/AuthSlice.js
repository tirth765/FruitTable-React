import { axiosInstance } from "../../Utils/axiosInstance";
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
        const response = await axiosInstance.post("users/register", data) 

        console.log(response);
        localStorage.setItem("userEmail", data.email)
    }
)

export const userLogin = createAsyncThunk (
    'auth/userLogin',

    async (data) => {

        const response = await axiosInstance.post("users/login", data)

        console.log(response.data);

        if(response.data.success) {
            return response.data.data
        }
    }
)

export const userLogout = createAsyncThunk (
    'auth/userLogout',

    async (id) => {
        const response = await axiosInstance.post("users/logout", {_id: id})

        console.log(response);
        
    }
)

export const checkAuth = createAsyncThunk (
    'auth/checkAuth',

    async () => {

        const response = await axiosInstance.get("users/checkAuth")

        console.log(response.data);

        if(response.data.success) {
            return response.data.data
        }
    }
)

export const checkOTP = createAsyncThunk (
    'auth/checkOTP',

    async (data) => {

        // const response = await axiosInstance.post("users/OTPVarification", data)
        
        const response = await axiosInstance.post("users/OTPVarificationEmail", data)

        console.log(response.data);
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
        builder.addCase(checkAuth.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload;
            state.isValidate = true;
            state.error = null;
        })
        // builder.addCase(checkOTP.fulfilled, (state, action) => {
        //     state.isLoading = false;
        //     state.user = action.payload;
        //     state.isValidate = true;
        //     state.error = null;
        // })
    }
})

export default AuthSlice.reducer