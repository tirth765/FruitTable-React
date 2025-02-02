import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

const initialState = {
    isLoding:false,
    Product: [],
    error:null
}

export const CreateProduct = createAsyncThunk(
    "Product/CreateProduct",
    async (data) => {
        try {
            console.log(data);
        
            const response = await axios.post('http://localhost:8000/api/v1/product/post-products', data, {
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

export const getProduct = createAsyncThunk(
    "Product/getProduct",

    async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/v1/product/get-products")
            console.log("SubCategory", response.data.data);
            
            return response.data.data
        } catch (error) {
            console.log(error);
            
        }

    }
    
)

export const deleteProduct = createAsyncThunk(
    "Product/deleteProduct",
        async (id) => {
            try {
                const response = await axios.delete("http://localhost:8000/api/v1/product/delete-products/" + id)
                console.log(response.data.data);
                
                return response.data.data._id
            } catch (error) {
                console.log(error);
                
            }
    }
)

export const updateProduct = createAsyncThunk(
    "Product/updateProduct",
        async (data) => {
            try {
                const response = await axios.put("http://localhost:8000/api/v1/product/put-products/" + data._id, data, {
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
    name:"Product",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(CreateProduct.fulfilled, (state, action) => {
            state.Product = state.Product.concat(action.payload)
        })
        builder.addCase(getProduct.fulfilled, (state, action) => {
            state.Product = action.payload 
        })
        builder.addCase(deleteProduct.fulfilled, (state, action) => {
            state.Product = state.Product.filter((v) => v._id !== action.payload)
        })
        builder.addCase(updateProduct.fulfilled, (state, action) => {
            state.Product = state.Product.map((v) => {
                if (v._id === action.payload?._id) {
                    return action.payload
                } else {
                    return v
                }
            })        })
    }
})

export default CategorySlice.reducer;