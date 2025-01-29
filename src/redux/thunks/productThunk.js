
// Async Thunks for API calls
import {  createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosInstance from "../../api/axiosInstance";

// fetch female products
export const fetchMaleProducts = createAsyncThunk("/admin/products/male", async ({ page = 1, limit = 8 }) => {
    const response = await axiosInstance.get(`/users/product/male?page=${page}&limit=${limit}`);
    console.log(response.data)
    return response.data;
});

// fetch female products
export const fetchFemaleProducts = createAsyncThunk("/admin/products/female", async ({ page = 1, limit = 8 }) => {
    const response = await axiosInstance.get(`/users/product/female?page=${page}&limit=${limit}`);
    return response.data;
});

// fetch all products
export const fetchProducts = createAsyncThunk("/admin/products/all", async ({ page = 1, limit = 10 }) => {
    const response = await axiosInstance.get(`/admin/products/all?page=${page}&limit=${limit}`);
    console.log(response.data,"check fetch")
    return response.data;
});
export const searchFetchProducts = createAsyncThunk("/admin/products/search", async () => {
    const response = await axiosInstance.get(`/users/products/search`);
    return response.data;
});

export const fetchProductById = createAsyncThunk("/products", async (productId) => {
    const response = await axiosInstance.get(`/users/product/${productId}`);
    return response.data;
});

export const addOrEditProduct = createAsyncThunk("products/addOrEditProduct", async ({product,isEdit}) => {
    if (isEdit) {
        console.log(product,"product")
        const response = await axiosInstance.patch(`/admin/products/${product._id}`, product);
        console.log(response.data)
        return response.data;
    } else {
        console.log(product,"xxx")
        const formData = new FormData();
      formData.append("productName", product.productName);
      formData.append("category", product.category);
      formData.append("description", product.description);
      formData.append("price", product.price);
      formData.append("oldPrice", product.oldPrice);
      formData.append("image", product.image0);
      formData.append("image", product.image1);
      formData.append("sex", product.sex);
      formData.append("stock", product.stock);
      
        const response = await axios.post("http://localhost:4600/api/admin/products", formData,{withCredentials:true,
            headers:{'Content-Type':"multipart/form-data"}
        });
        return response.data;

    }
});

export const deleteProduct = createAsyncThunk("/admin/products/deleteProduct", async (productId) => {
    const response=await axiosInstance.delete(`/admin/products/${productId}`);
    console.log(response.data,"check dlt")
    return response.data;

});