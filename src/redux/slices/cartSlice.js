import { createSlice } from "@reduxjs/toolkit";
import { getCart, removeCartProduct, updateCartItemQuantity } from "../thunks/cartThunk";
import { TurnRight } from "@mui/icons-material";

const initialState = {
    quantity: 0,
    cartItems: [],
    cartId: "",
    userData: JSON.parse(localStorage.getItem("user")) || null,
    showUserDetails: false,
    selectedUser: null,
    userOrderDetails: null,
    upiId: "",
    showOrderDetails: false,
    selectedOrder: null,
    loading: false,
    error: false,
    totalPrice: 0,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setCartItems: (state, action) => {
            state.cartItems = action.payload;
        },
        setQuantity: (state, action) => {
            state.quantity = action.payload;
        },

        clearCartItems: (state) => {
            state.cartItems = [];
        },
        setUserOrderDetails: (state, action) => {
            state.userOrderDetails = action.payload;
        },
        setUpiId: (state, action) => {
            state.upiId = action.payload;
        },

        setSelectedUser: (state, action) => {
            state.selectedUser = action.payload;
        },

        setSelectedOrder: (state, action) => {
            state.selectedOrder = action.payload;
        },
        clearUserData: (state) => {
            state.userData = null;
        },

        toggleUserStatus: (state, action) => {
            const user = action.payload;
            if (user) {
                user.status = user.status === "active" ? "inactive" : "active"; // Toggle user status
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCart.pending, (state) => {
                state.loading = true;
            })
            .addCase(getCart.fulfilled, (state, action) => {
                state.cartItems = action.payload.products;
            })
            .addCase(getCart.rejected, (state, action) => {
                state.error = action.error.message;
            })
            .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
                state.cartItems = action.payload.products;
            })
            .addCase(removeCartProduct.fulfilled, (state, action) => {
                state.cartItems = action.payload.products;
            });
    },
});

export const {
    setCartItems,
    setQuantity,
    addToCart,
    toggleUserStatus,
    removeCartItem,
    clearCartItems,
    clearUserData,
    setUserOrderDetails,
    setUpiId,
    setShowUserDetails,
    setSelectedUser,
    setShowOrderDetails,
    setSelectedOrder,
} = cartSlice.actions;

export default cartSlice.reducer;
