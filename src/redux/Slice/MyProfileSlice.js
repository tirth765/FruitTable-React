import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";


export const getMyProfile = createAsyncThunk(
    'myProfile/getMyProfile',
    async () => {
        const response = await axios.get('http://localhost:8000/myProfile');
        console.log(response.data);
        return response.data;
    }
)

export const setMyProfile = createAsyncThunk(
    'myProfile/setMyProfile',
    async (data) => {
        const response = await axios.post('http://localhost:8000/myProfile', data);
        console.log(response.data);
        return response.data;
    }
)

export const deleteMyProfile = createAsyncThunk(
    'myProfile/deleteMyProfile',
    async (id) => {
        const response = await axios.delete('http://localhost:8000/myProfile/' + id);
        return id;
    }
)


const initialState = {
    isLoding: false,
    myProfile: [],
    error: null
}

const MyProfileSlice = createSlice({
    name: 'myProfile',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getMyProfile.fulfilled, (state, action) => {
            state.myProfile = action.payload
        })
        builder.addCase(setMyProfile.fulfilled, (state, action) => {
            state.myProfile = state.myProfile.concat(action.payload)
        })
         builder.addCase(deleteMyProfile.fulfilled, (state, action) => {
            state.myProfile = state.myProfile.filter((v) => v.id !== action.payload)
        })
       
    }
})

export default MyProfileSlice.reducer;
