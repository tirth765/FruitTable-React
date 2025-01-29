import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

const initialState = {
    isLoding:false,
    Category: [],
    error:null
}

export const CreateCategory = createAsyncThunk(
    "Category/CreateCategory",
    async (data) => {
        console.log(data);
        
        const response = await axios.post('http://localhost:8000/api/v1/category/post-category', data, {
            headers: {
                'Content-Type': 'multipart/form-data'
              }
        });
        console.log(response.data);
        return response.data.data;
    }
)

 const CategorySlice = createSlice({
    name:"Category",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(CreateCategory.fulfilled, (state, action) => {
            state.Category = state.Category.concat(action.payload)
        })
    }
})

export default CategorySlice.reducer;