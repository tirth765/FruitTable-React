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
        try {
            console.log(data);
        
            const response = await axios.post('http://localhost:8000/api/v1/category/post-category', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                  }
            });
            console.log(response.data);
            return response.data.data;
        } catch (error) {
            console.log(error);
            
        }
      
    }
)

export const getCategores = createAsyncThunk(
    "Category/getCategores",

    async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/v1/category/list-categores")
            return response.data.data
        } catch (error) {
            console.log(error);
            
        }

    }
    
)

export const deleteCategory = createAsyncThunk(
    "Category/deleteCategory",
        async (id) => {
            try {
                const response = await axios.delete("http://localhost:8000/api/v1/category/delete-category/" + id)
                console.log(response.data.data);
                
                return response.data.data._id
            } catch (error) {
                console.log(error);
                
            }
    }
)

export const updateCategory = createAsyncThunk(
    "Category/updateCategory",
        async (data) => {
            try {
                const response = await axios.put("http://localhost:8000/api/v1/category/put-category/" + data.id, data)
                console.log(response.data.data);
                
                return response.data.data
            } catch (error) {
                console.log(error);
                
            }
    }
)

 const CategorySlice = createSlice({
    name:"Category",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(CreateCategory.fulfilled, (state, action) => {
            state.Category = state.Category.concat(action.payload)
        })
        builder.addCase(getCategores.fulfilled, (state, action) => {
            state.Category = action.payload 
        })
        builder.addCase(deleteCategory.fulfilled, (state, action) => {
            state.Category = state.Category.filter((v) => v._id !== action.payload)
        })
        builder.addCase(updateCategory.fulfilled, (state, action) => {
            state.Category = state.Category.map((v) => {
                if (v._id === action.payload?.id) {
                    return action.payload
                } else {
                    return v
                }
            })        })
    }
})

export default CategorySlice.reducer;