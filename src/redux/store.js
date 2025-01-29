import {configureStore} from "@reduxjs/toolkit"
import userReducer from "./slices/userSlice"
import authSlice from './slices/authSlice'
import cartSlice from './slices/cartSlice'
import productReducer from "./slices/productSlice";
import dashboardSlice from './slices/dashBoardSlice'
import orderSlice from './slices/orderSlice'
import adminSlice from './slices/adminSlice'
import wishlistSlice from './slices/wishlistSlice'

const store=configureStore({
    reducer:{
        user:userReducer,
        auth:authSlice,
        cart:cartSlice,
        admin:adminSlice,
        dashboard: dashboardSlice,
        products: productReducer,
        order:orderSlice,
        wishlist:wishlistSlice
    }
})

export default store;