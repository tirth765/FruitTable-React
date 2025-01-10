import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isLoding:false,
    subCategory: [],
    error:null
}

const subCategorySlice = createSlice({
    name:'SubCate',
    initialState, 
    getSubCategory: {

    },
    reducers: {
        setSubCategory:(state,action) => {
            state.subCategory = state.subCategory.concat(action.payload)
        },
        deleteSubCategory:(state,action) => {
            state.subCategory = state.subCategory.filter((v) => v.id !== action.payload)
        },
        editSubCategory:(state,action) => {
            state.subCategory = state.subCategory.map((v) => {
                if( v.id === action.payload) {
                    return action.payload
                } else {
                    return v
                }
            })
        }
    }
})  

export const { setSubCategory, getSubCategory, deleteSubCategory, editSubCategory } = subCategorySlice.actions;
export default subCategorySlice.reducer;