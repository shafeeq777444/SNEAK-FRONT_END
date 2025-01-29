import { createSlice} from "@reduxjs/toolkit";
import { getUsers, loginUser, refreshId,  } from "../thunks/userThunk";
const userSlice=createSlice({
    name:"user",
    initialState:{
        user:null,
        loading:false,
        error:null,
        users:[],
        currentPage:1
    },
    reducers:{
      setLogout:(state)=>{
        state.user=null
      }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(loginUser.pending,(state)=>{
            state.loading=true;
            state.error=null;
        }
        )
        .addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.user; // Save user data
          })
          .addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload; // Save error message
          })
          .addCase(refreshId.pending,(state)=>{
            state.loading=true;
            state.error=null;
        }
        )
        .addCase(refreshId.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.user; // Save user data
          })
          .addCase(refreshId.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message; // Save error message
          })
          .addCase(getUsers.fulfilled,(state,action)=>{
            state.users=action.payload.users
            state.currentPage=action.payload.currentPage
            
          })
          ;
    }
})
export const { setSelectedUser ,setShowUserDetails,setLogout} = userSlice.actions;
export default userSlice.reducer