import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";


export const getCoupon = createAsyncThunk(
    'coupon/getCoupon',
    async () => {
        const response = await axios.get('http://localhost:8000/api/v1/coupon/list-coupons');
        console.log(response.data);
        return response.data;
    }
)

export const setCoupon = createAsyncThunk(
    'coupon/setCoupon',
    async (data) => {
        console.log(data);
        
        const response = await axios.post('http://localhost:8000/api/v1/coupon/post-coupon', data);
        console.log(response.data.data);
        return response.data.data;
    }
)

export const deleteCoupon = createAsyncThunk(
    'coupon/deleteCoupon',
    async (id) => {
        const response = await axios.delete('http://localhost:8000/api/v1/coupon/put-coupon/' + id);
        return id;
    }
)

export const editCoupon = createAsyncThunk(
    'coupon/editCoupon',
    async (data) => {
        const response = await axios.put('http://localhost:8000/api/v1/category/delete-category/' + data.id, data);

        return response.data;
    })


const initialState = {
    isLoding: false,
    coupon: [],
    error: null
}

const CouponSlice = createSlice({
    name: 'coupon',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getCoupon.fulfilled, (state, action) => {
            state.coupon = action.payload
        })
        builder.addCase(setCoupon.fulfilled, (state, action) => {
            state.coupon = state.coupon?.concat(action.payload)
        })
        builder.addCase(deleteCoupon.fulfilled, (state, action) => {
            state.coupon = state.coupon.filter((v) => v.id !== action.payload)
        })
        builder.addCase(editCoupon.fulfilled, (state, action) => {
            state.coupon = state.coupon.map((v) => {
                if (v.id === action.payload?.id) {
                    return action.payload
                } else {
                    return v
                }
            })
        })

    }
})

export default CouponSlice.reducer;
