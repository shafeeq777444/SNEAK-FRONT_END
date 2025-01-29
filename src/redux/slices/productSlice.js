// redux/slices/productSlice.js

import { createSlice,  } from "@reduxjs/toolkit";
import { addOrEditProduct,deleteProduct, fetchProductById, fetchFemaleProducts, fetchProducts, fetchMaleProducts, searchFetchProducts } from "../thunks/productThunk";

const productSlice = createSlice({
    name: "products",
    initialState: {
        menProducts: [],
        femaleProducts: {
            womenProducts: [],
            totalPages: 0,
            currentPage: 1,
        },
        maleProducts: {
            menProducts: [],
            totalPages: 0,
            currentPage: 1,
        },
        completeProducts: {
            products: [],
            totalPages: 0,
            currentPage: 1,
        },
    
        productById:{},
        searchProducts:[],
        productModal: false,
        editableProduct: null,
        loading: false,
        error: null,

    },
    reducers: {
        setProductModal: (state, action) => {
            state.productModal = action.payload;
        },
        setEditableProduct: (state, action) => {
            state.editableProduct = action.payload;
        },
        setWHishlistProduct:(state,action)=>{
            state.productById=action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch Products
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(searchFetchProducts.fulfilled,(state,action)=>{
                state.searchProducts=action.payload.products
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.completeProducts = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Unable to fetch products. Please try again later.";
            })
            .addCase(fetchFemaleProducts.fulfilled, (state, action) => {
                state.femaleProducts = action.payload;
            })
            .addCase(fetchMaleProducts.fulfilled, (state, action) => {
                state.maleProducts = action.payload;
            })
            
            // Add or Edit Product
            .addCase(addOrEditProduct.fulfilled, (state, action) => {
                const updatedProduct = action.payload.product;
                if (state.editableProduct) {
                    // Update existing product
                    state.completeProducts.products = state.completeProducts.products.map((product) =>
                        product._id === updatedProduct._id ? updatedProduct : product
                    );
                } else {
                    // Add new product
                    state.completeProducts.products.push(action.payload.product);
                }
                // state.menProducts = state.completeProducts.products.filter((product) => product.category === "male");
                // state.womenProducts = state.completeProducts.products.filter((product) => product.category === "female");
                state.productModal = false;
                state.editableProduct = null;
            })
            // Delete Product
            .addCase(deleteProduct.fulfilled, (state, action) => {
                console.log(action.payload,"payload check")
                state.completeProducts.products = action.payload.allProduct
                // state.menProducts = state.allProducts.filter((product) => product.sex === "male");
                // state.womenProducts = state.allProducts.filter((product) => product.sex === "female");
            })

            // fetch product by id
            .addCase(fetchProductById.pending,(state)=>{
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProductById.fulfilled,(state,action)=>{
                state.loading = false;
                state.productById = action.payload.product;
            })
            .addCase(fetchProductById.rejected,(state,action)=>{
                state.loading = false;
                state.error = action.error.message;
            })
            
    },
});

export const { setProductModal, setEditableProduct,setWHishlistProduct } = productSlice.actions;

export default productSlice.reducer;
