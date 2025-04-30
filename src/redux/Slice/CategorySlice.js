import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { axiosInstance } from "../../Utils/axiosInstance";

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
        
            const response = await axiosInstance.post('category/post-category', data, {
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
            const response = await axiosInstance.get("category/list-categores")
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
                const response = await axiosInstance.delete("category/delete-category/" + id)
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
                const response = await axiosInstance.put("category/put-category/" + data._id, data, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                      }
                })
                console.log( "UPDATERESPONSE", response.data.data);
                
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
                if (v._id === action.payload?._id) {
                    return action.payload
                } else {
                    return v
                }
            })        })
    }
})

export default CategorySlice.reducer;