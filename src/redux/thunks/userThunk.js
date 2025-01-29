import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";
import API from "../../api/apiEndPoints";

export const registerUser = createAsyncThunk(`/users/register`,async (userData,{rejectWithValue}) => {
    try{
    const respose=await axiosInstance.post(API.AUTH.REGISTER,userData)
    return respose.data
    }
    catch(error){
        return rejectWithValue(error.response?.data?.message || error.message)
    }
});
export const loginUser=createAsyncThunk(`/users/login`,async({email,password},{rejectWithValue})=>{
    try{
        
     const response= await axiosInstance.post(API.AUTH.LOGIN,{email,password})
      return response.data;
    }
    catch(err){
        rejectWithValue(err.response.data)
    }
})

export const getUsers=createAsyncThunk(`/admin/users`,async()=>{
     const response= await axiosInstance.get('/admin/users')
     console.log(response.data,"data")
      return response.data;
    })
    

export const refreshId=createAsyncThunk('/users',async()=>{
   const response= await axiosInstance.get("/users/me")
   console.log(response)
   return response.data
})

export const logout=createAsyncThunk('/users/logout',async()=>{
    const response= await axiosInstance.get("/users/logout")
    console.log(response)
    return response.data
 })
 