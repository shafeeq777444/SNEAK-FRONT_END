import { createSlice } from "@reduxjs/toolkit";
import { dashBoardData, fetchUserOrders, toggleUserStatus, updateOrderStatus } from "../thunks/adminThunk";

const adminSlice=createSlice({
    name:"admin",
    initialState:{
        selectedUser:{},
        showUserDetails:false,
        userOrders: [],
        showOrderDetails:false,
        selectedOrder:{},
        orderStatus:"pending",
        dashboardDetails:{}
    },
    reducers:{
          setSelectedUser:(state,action)=>{
            console.log(action.payload,"selected user")
            state.selectedUser=action.payload
          },
          setShowUserDetails:(state,action)=>{
            console.log("Updating showUserDetails:", action.payload);
            state.showUserDetails=action.payload
          },
          setShowOrderDetails: (state, action) => {
            state.showOrderDetails = action.payload;
        },
        setSelectedOrder:(state,action)=>{
            state.selectedOrder=action.payload
            state.orderStatus=action.payload.status
        }
          
        },
        extraReducers:(builder) => {
            builder
                .addCase(fetchUserOrders.pending, (state) => {
                    state.loading = true;
                    state.error = null;
                })
                .addCase(fetchUserOrders.fulfilled, (state, action) => {
                    state.loading = false;
                    state.userOrders = action.payload; 
                })
                .addCase(fetchUserOrders.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.payload; 
                })
                .addCase(toggleUserStatus.pending, (state) => {
                    state.loading = true;
                  })
                  .addCase(toggleUserStatus.fulfilled, (state, action) => {
                    state.loading = false;
                    state.selectedUser = action.payload;
              
                  })
                  .addCase(toggleUserStatus.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                  })
                  .addCase(dashBoardData.fulfilled,(state,action)=>{
                    state.dashboardDetails=action.payload
                  })
                  .addCase(updateOrderStatus.fulfilled,(state,action)=>{
                    state.orderStatus=action.payload.status
                  })
                ;
        },
})
export const {setShowOrderDetails,setSelectedOrder,setSelectedUser,setShowUserDetails}=adminSlice.actions
export default adminSlice.reducer