// import { createSlice } from "@reduxjs/toolkit"



// const initialState = {
//     isLoding:false,
//     subCategory: [],
//     error:null
// }

// const subCategorySlice = createSlice({
//     name:'SubCate',
//     initialState, 
//     getSubCategory: {

//     },
//     reducers: {
//         setSubCategory:(state,action) => {
//             state.subCategory = state.subCategory.concat(action.payload)
//         },
//         deleteSubCategory:(state,action) => {
//             state.subCategory = state.subCategory.filter((v) => v.id !== action.payload)
//         },
//         editSubCategory:(state,action) => {
//             state.subCategory = state.subCategory.map((v) => {
//                 if( v.id === action.payload) {
//                     return action.payload
//                 } else {
//                     return v
//                 }
//             })
//         }
//     }
// })  

// export const { setSubCategory, getSubCategory, deleteSubCategory, editSubCategory } = subCategorySlice.actions;
// export default subCategorySlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

export const getSubCategory = createAsyncThunk(
    'subCategory/getSubCategory',
    async () => {
        const response = await axios.get('http://localhost:8000/subCategory');
        console.log(response.data);
        return response.data;
    }
)

export const deleteSubCategory = createAsyncThunk(
    'subCategory/deleteSubCategory',
    async (id) => {
        const response = await axios.delete('http://localhost:8000/subCategory', id);
        return id;
    }
)
export const editSubCategory = createAsyncThunk(

)
export const setSubCategory = createAsyncThunk(
    'subCategory/setSubCategory',
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

const subCategorySlice = createSlice({
    name: 'subCategory',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getSubCategory.fulfilled, (state, action) => {
            state.subCategory = action.payload
        })
        builder.addCase(setSubCategory.fulfilled, (state, action) => {
            state.subCategory = state.subCategory.concat(action.payload)
        })
        builder.addCase(deleteSubCategory.fulfilled, (state, action) => {
            state.subCategory = state.subCategory.filter((v) => v.id !== action.payload)
})
    }
})

export default subCategorySlice.reducer;
