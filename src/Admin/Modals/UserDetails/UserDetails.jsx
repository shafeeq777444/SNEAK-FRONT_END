/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { setSelectedUser, toggleUserStatus, setSelectedOrder } from "../../../redux/slices/adminSlice";  // Import actions from Redux store
import OrderDetails from "../OrderDetails/OrderDetails";
import "./UserDetails.css";
import { fetchUserOrders, toggleUserStatus } from "../../../redux/thunks/adminThunk";
import { setSelectedUser, setShowUserDetails,setShowOrderDetails,setSelectedOrder } from "../../../redux/slices/adminSlice";
import { getUsers } from "../../../redux/thunks/userThunk";

const UserDetails = () => {
    const dispatch = useDispatch();
    
    
    // Get selectedUser from the Redux store
    const selectedUser = useSelector((state) => state.admin.selectedUser);
    console.log(selectedUser,"selected-user")
    useEffect(()=>{
        dispatch(fetchUserOrders(selectedUser._id))
    },[])
    const userOrders=useSelector(state=>state.admin.userOrders)
    console.log(userOrders,"userOrders---")
    // Close the user modal (reset selectedUser in Redux)
    const closeUserModal = () => {
        dispatch(setShowUserDetails(false)); 
        dispatch(getUsers()); // Dispatch action to reset selectedUser
    };

    // Handle showing order details
    const handleOrderDetails = (order) => {
        dispatch(setShowOrderDetails(true))
        dispatch(setSelectedOrder(order));  // Dispatch the selected order
        dispatch(setShowUserDetails(false))
    };

    // Toggle user status (activate/deactivate)
    // const toggleStatus = (user) => {
    //     dispatch(toggleUserStatus(user));  // Dispatch action to toggle user status
    // };

    return (
        <div className="user-details-modal-main-div">
            <div className="user-detail-moal-card">
                <button className="close-button-use-details" onClick={closeUserModal}>x</button>
                
                <img className="user-detail-modal-img" src="/assets/extra/userProfile.jpg" alt="User Profile" />
                <div className="user-info">
                    <div className="text-m">Name: {selectedUser.name}</div>
                    <div className="text-xs">Email: {selectedUser.email}</div>
                    <div className="text-xs">ID: {selectedUser._id}</div>
                </div>

                {/* Order Table Section */}
                <table className="user-order-table">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Total Items</th>
                            <th>Total Amount</th>
                        </tr>
                    </thead>
                    <tbody>
    {userOrders.length > 0 ? (
        userOrders.map((x, ind) => (
            <tr
                onClick={() => handleOrderDetails(x)}
                className="user-order-data-head"
                key={ind}
            >
                <td className="user-order-modal-id">{x.orderId || selectedUser._id}</td>
                <td className="user-order-modal-quantity">{x.products.length}</td>
                <td className="user-order-modal-total-amount">₹{x.totalPrice}</td>
            </tr>
        ))
    ) : (
        <tr>
            <td colSpan="3" className="no-orders-message">
                No orders found.
            </td>
        </tr>
    )}
</tbody>
                </table>
                
                <button onClick={() => dispatch(toggleUserStatus(selectedUser._id))} className="button-use-block relative top-3">
                    {!selectedUser.isDeleted?  "Active" : "Deactivate"}
                </button>
            </div>
        </div>
    );
};

export default UserDetails;
