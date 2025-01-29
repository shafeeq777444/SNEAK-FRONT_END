import { createSlice } from "@reduxjs/toolkit";
import { fetchOrdersAll, razorpay } from "../thunks/orderThunk";

const orderSlice = createSlice({
    name: "order",
    initialState: {
        phoneNumber: 0,
        address: "",
        pincode: 0,
        amount: 0,
        currency: "",
        id: "",
        allOrders: {
            orders: [],
            totalPages: 1,
            currentPage: 1,
        },
    },
    reducers: {
        setAddres: (state, action) => {
            console.log(action.payload, "payload chec");
            // const {phoneNumber,address,pincode}=action.payload
            state.phoneNumber = action.payload.phoneNumber;
            state.address = action.payload.address;
            state.pincode = action.payload.pincode;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(razorpay.fulfilled, (state, action) => {
                state.amount = action.payload.razorpayOrder.amount;
                state.currency = action.payload.razorpayOrder.currency;
                state.id = action.payload.razorpayOrder.id;
            })
            .addCase(fetchOrdersAll.fulfilled, (state, action) => {
               
                state.allOrders = action.payload;
            });
    },
});
export const { setAddres } = orderSlice.actions;
export default orderSlice.reducer;
