import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axiosInstance from "../../api/axiosInstance";

export const fetchWishlist = createAsyncThunk("wishlist/fetchWishlist", async () => {
    const response = await axiosInstance.get("/users/wishlists");
    console.log(response.data,"dsfsa")
    return response.data;
});

export const addToWishlist = createAsyncThunk("wishlist/addToWishlist", async (productId) => {
    const response = await axiosInstance.post("/users/whishlists", { productId },);
    return response.data;
});

export const removeFromWishlist = createAsyncThunk("wishlist/removeFromWishlist", async (productId, { getState }) => {
    const { token } = getState().auth;
    const response = await axiosInstance.delete(`/wishlist/${productId}`, { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
});

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState: { items: [],
         status: "idle",
          error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchWishlist.fulfilled, (state, action) => {
                state.items = action.payload.products;
                state.status = "succeeded";
            })
            .addCase(removeFromWishlist.fulfilled, (state, action) => {
                state.items = action.payload.products;
            });
    },
});

export default wishlistSlice.reducer;
