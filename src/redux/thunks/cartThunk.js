import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

export const addToCart = createAsyncThunk("/add/cart", async ({ productById, quantity, size }) => {
    try {
        // const userId = getState().user.user._id;
        // console.log(userId)
        const respone = await axiosInstance.post(
            `/users/cart`,
            { addingProducts: [{ productId: productById._id, quantity, size }] },
            { withCredentials: true }
        );
        console.log(respone);
    } catch (err) {
        console.log(err);
    }
});
export const getCart = createAsyncThunk("/display/cart", async () => {
    try {
        const respone = await axiosInstance.get(`/users/cart`);
        return respone.data;
    } catch (err) {
        console.log(err, "get cart erro");
    }
});

export const updateCartItemQuantity = createAsyncThunk("/update/cart", async ({ productId, size, updateQuantity }) => {

        const respone = await axiosInstance.post(`/users/cart/update`, { productId, size, updateQuantity });
        console.log(respone.data, "fs");
        return respone.data;
   
});

export const removeCartProduct = createAsyncThunk("cart/removeProduct", async ({ productId, size }) => {
    console.log({ productId, size })
    const response = await axiosInstance.delete("/users/cart/remove", {data:{ productId, size }});
    console.log(response.data)
    return response.data;
});
