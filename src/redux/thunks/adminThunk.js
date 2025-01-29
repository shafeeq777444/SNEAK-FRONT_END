import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

export const getCart = createAsyncThunk("/display/cart", async () => {
    try {
        const respone = await axiosInstance.get(`/users/cart`);
        return respone.data;
    } catch (err) {
        console.log(err, "get cart erro");
    }
});

// Async thunk to fetch orders for a specific user
export const fetchUserOrders = createAsyncThunk(
    "orders/fetchUserOrders",
    async (userId, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/admin/orders/${userId}`); // Replace with your backend API endpoint
            return response.data.orders; // Return orders from the API response
        } catch (error) {
            console.error("Error fetching user orders:", error);
            return rejectWithValue(error.response.data.message || "Failed to fetch orders.");
        }
    }
);

// Thunk to toggle user status
export const toggleUserStatus = createAsyncThunk(
    "user/toggleUserStatus",
    async (userId, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.patch(`/admin/users/${userId}`);
        return response.data.result.user; // Return the updated user data
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

// dashboard
export const dashBoardData=createAsyncThunk("/admin/dashboard",async()=>{
   const respone= await axiosInstance.get('/admin/dashboard')
   return respone.data
})

// adminSlice.js
export const updateOrderStatus = createAsyncThunk(
  "admin/updateOrderStatus",
  async ({ orderId, status }) => {
      const response = await axiosInstance.put(`/admin/status/${orderId}`,{status})
      console.log(response.data.order,"hello")
      return response.data.order;
  }
);