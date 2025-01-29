// dashboardSlice.js

import { createSlice } from "@reduxjs/toolkit";
import { fetchDashboardDetails } from "../thunks/fetchDashboardDetails";

const initialState = {
    admins: [],
    totalSale: 0,
    users: 0,
    sellingProduct: {},
};

const dashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {
        setAdmins: (state, action) => {
            state.admins = action.payload;
        },
        setTotalSale: (state, action) => {
            state.totalSale = action.payload;
        },
        setUsers: (state, action) => {
            state.users = action.payload;
        },
        setSellingProduct: (state, action) => {
            state.sellingProduct = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDashboardDetails.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchDashboardDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.admins = action.payload.admins;
                state.usersCount = action.payload.usersCount;
                state.totalSale = action.payload.totalSale;
                state.sellingProduct = action.payload.productObject;
            })
            .addCase(fetchDashboardDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const {
    setAdmins,
    setTotalSale,
    setUsers,
    setSellingProduct,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
