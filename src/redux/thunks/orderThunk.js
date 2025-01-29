import axios from "axios";


import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";
export const razorpay=createAsyncThunk('/order/payment',async(totalPrice)=>{
    const result=await axios.post('http://localhost:4600/api/users/order',{totalPrice},{withCredentials:true})
    return result.data
    
})

export const verifyPayment=createAsyncThunk('order/verify',async({paymentId,address})=>{
  
    
    console.log(paymentId,address,"paymentId")
    // console.log({phoneNumber,address,pincode},"check in dispatch")
    const result=await axiosInstance.post('/users/verifyPayment')
    console.log(result.data,"verify result")
    // return result.data
})

export const fetchOrdersAll = createAsyncThunk('order/fetchAll', async (page = 1) => {
    try {
      const limit = 10; // Number of orders per page
      const response = await axiosInstance.get(`users/orders?page=${page}&limit=${limit}`);
      return response.data
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  });