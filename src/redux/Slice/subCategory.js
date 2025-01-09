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
        }
    }
})  

export const { setSubCategory, getSubCategory } = subCategorySlice.actions;
export default subCategorySlice.reducer;