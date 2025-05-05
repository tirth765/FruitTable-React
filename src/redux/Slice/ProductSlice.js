import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../Utils/axiosInstance";

const initialState = {
  isLoding: false,
  Product: [],
  subcat: [],
  error: null,
};

export const CreateProduct = createAsyncThunk(
  "Product/CreateProduct",
  async (data) => {
    try {
      console.log("post", data);

      const response = await axiosInstance.post(
        "product/post-product",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("response", response.data.data);

      return response.data.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getProduct = createAsyncThunk(
  "Product/getProduct",

  async () => {
    try {
      const response = await axiosInstance.get(
        "product/get-products"
      );
      console.log("Productget", response.data.data);

      return response.data.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getSubcat = createAsyncThunk(
  "Product/getSubcat",

  async (cat_id) => {
    console.log("id", cat_id);

    try {
      const response = await axiosInstance.get(
        "product/get-subcat/" + cat_id
      );
      console.log("SubCategoryget", response.data.data);

      return response.data.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "Product/deleteProduct",
  async (id) => {
    console.log("idddddddd", id);

    try {
      const response = await axiosInstance.delete(
        "product/delete-product/" + id
      );
      console.log(response.data.data);

      return response.data.data._id;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "Product/updateProduct",
  async (data) => {
    try {
      console.log(data);

      const response = await axiosInstance.put(
        "product/put-product/" + data._id,
        { Category: data.Category, SubCategory: data.SubCategory, name: data.name, description: data.description, price: data.price, product_img: data.product_img  },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("UPDATERESPONSE", response.data.data);

      return response.data.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const CategorySlice = createSlice({
  name: "Product",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(CreateProduct.fulfilled, (state, action) => {
      state.Product = state.Product.concat(action.payload);
    });
    builder.addCase(getProduct.fulfilled, (state, action) => {
      state.Product = action.payload;
    });
    builder.addCase(getSubcat.fulfilled, (state, action) => {
      state.subcat = action.payload;
    });
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.Product = state.Product.filter((v) => v._id !== action.payload);
    });
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      state.Product = state.Product.map((v) => {
        if (v._id === action.payload?._id) {
          return action.payload;
        } else {
          return v;
        }
      });
     
    });
  },
});

export default CategorySlice.reducer;
