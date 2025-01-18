import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";


export const getMyProfile = createAsyncThunk(
    'myProfile/getMyProfile',
    async () => {
        const response = await axios.get('http://localhost:8000/subCategory');
        console.log(response.data);
        return response.data;
    }
)

export const setMyProfile = createAsyncThunk(
    'myProfile/setMyProfile',
    async (data) => {
        const response = await axios.post('http://localhost:8000/subCategory', data);
        console.log(response.data);
        return response.data;
    }
)

const initialState = {
    isLoding: false,
    subCategory: [],
    error: null
}

const MyProfileSlice = createSlice({
    name: 'myProfile',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getMyProfile.fulfilled, (state, action) => {
            state.MyProfile = action.payload
        })
        builder.addCase(setMyProfile.fulfilled, (state, action) => {
            state.MyProfile = state.MyProfile.concat(action.payload)
        })
       
    }
})

export default MyProfileSlice.reducer;
