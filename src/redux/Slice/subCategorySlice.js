import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import { axiosInstance } from "../../Utils/axiosInstance";

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
        
            const response = await axiosInstance.post('subCategory/post-subCategory', data, {
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

    async (value) => {
        console.log("VAlues",value);
        
        try {
            const response = await axiosInstance.get("subCategory/get-subCategores")
            
            return response.data.data
        } catch (error) {
            console.log(error);
            
        }

    }
    
)


// export const getSubCategores = createAsyncThunk(
//     "SubCategory/getSubCategores",

//     async (value) => {
//         console.log("VAlues",value);
        
//         try {
//             const response = await axiosInstance.get("subCategory/get-subCategores")
//             // console.log("GETTTTTTTTTTTT",response.data.data);
            
//             return response.data.data
//         } catch (error) {
//             console.log(error);
            
//         }

//     }
    
// )

export const deleteSubCategory = createAsyncThunk(
    "SubCategory/deleteSubCategory",
        async (id) => {
            try {
                // console.log("idddddddddddd",id);
                
                const response = await axiosInstance.delete("subCategory/delete-subCategory/" + id)
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
                const response = await axiosInstance.put("subCategory/put-subCategory/" + data._id, data, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                      }
                })
                // console.log( "UPDATERESPONSE", response.data.data);
                
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
            console.log(action.payload);
        
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