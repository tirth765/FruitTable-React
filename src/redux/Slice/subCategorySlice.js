import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

const initialState = {
    isLoding:false,
    SubCategory: [],
    error:null
}

export const CreateSubCategory = createAsyncThunk(
    "SubCategory/CreateSubCategory",
    async (data) => {
        try {
            console.log("DONE",data);
        
            const response = await axios.post('http://localhost:8000/api/v1/subCategory/post-subCategory', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                  }
            });
            console.log("YESDONE",response.data);
            return response.data.data;
        } catch (error) {
            console.log(error);
            
        }
      
    }
)

export const getSubCategores = createAsyncThunk(
    "SubCategory/getSubCategores",

    async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/v1/subCategory/get-subCategores")
            console.log("SubCategory", response.data.data);
            
            return response.data.data
        } catch (error) {
            console.log(error);
            
        }

    }
    
)

export const deleteSubCategory = createAsyncThunk(
    "SubCategory/deleteSubCategory",
        async (id) => {
            try {
                const response = await axios.delete("http://localhost:8000/api/v1/subCategory/delete-subCategory/" + id)
                console.log(response.data.data);
                
                return response.data.data._id
            } catch (error) {
                console.log(error);
                
            }
    }
)

export const updateSubCategory = createAsyncThunk(
    "SubCategory/updateSubCategory",
        async (data) => {
            try {
                const response = await axios.put("http://localhost:8000/api/v1/subCategory/put-subCategory/" + data._id, data, {
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
    name:"SubCategory",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(CreateSubCategory.fulfilled, (state, action) => {
            state.SubCategory = state.SubCategory.concat(action.payload)
        })
        builder.addCase(getSubCategores.fulfilled, (state, action) => {
            state.SubCategory = action.payload 
        })
        builder.addCase(deleteSubCategory.fulfilled, (state, action) => {
            state.SubCategory = state.SubCategory.filter((v) => v._id !== action.payload)
        })
        builder.addCase(updateSubCategory.fulfilled, (state, action) => {
            state.SubCategory = state.SubCategory.map((v) => {
                if (v._id === action.payload?._id) {
                    return action.payload
                } else {
                    return v
                }
            })        })
    }
})

export default CategorySlice.reducer;