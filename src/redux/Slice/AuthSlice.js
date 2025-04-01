import axios from "axios";
import { BASE_URL } from "../../Utils/Base";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    user: null,
    isValid: false,
    error: null,
};

export const userRegister = createAsyncThunk (
    'auth/userRegister',
    
    async (data) => {
        const response = await axios.post(BASE_URL + "users/register", data) 

        console.log(response);
        
    }
)

const AuthSlice = createSlice({
    name:"auth",
    initialState,
    extraReducers: (builder) => {

    }
})

export default AuthSlice.reducers