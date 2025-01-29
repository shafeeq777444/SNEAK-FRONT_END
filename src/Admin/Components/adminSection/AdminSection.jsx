/* eslint-disable react-hooks/exhaustive-deps */
import  { useEffect } from "react";
import "./AdminSection.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../redux/thunks/userThunk";
import { useNavigate } from "react-router-dom";
import { setLogout } from "../../../redux/slices/userSlice";
import { fetchOrdersAll } from "../../../redux/thunks/orderThunk";
import { setShowUserDetails, setShowOrderDetails, setSelectedOrder } from "../../../redux/slices/adminSlice";
import OrderDetails from "../../Modals/OrderDetails/OrderDetails";

const AdminSection = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAdminLogout = async () => {
    await dispatch(logout());
    dispatch(setLogout());
    navigate("/");
    localStorage.clear();
  };

  const handleOrderDetails = (order) => {
    dispatch(setShowOrderDetails(true));
    dispatch(setSelectedOrder(order));
    dispatch(setShowUserDetails(false));
  };

  const handlePageChange = (page) => {
    dispatch(fetchOrdersAll(page)); 
  };

  useEffect(() => {
    dispatch(fetchOrdersAll(1));
  }, []);

  const { orders, totalPages, currentPage } = useSelector((state) => state.order.allOrders);
  const adminDetails = useSelector((state) => state.user.user);
  const showOrderDetails = useSelector((state) => state.admin.showOrderDetails);

  return (
    <div className="user-section-main-div flex-col justify-center items-center">
      <div className="admin-section">
        <img className="admin-section-img" src="/assets/extra/Admin.png" alt="Admin" />
        <div className="logged-admin-details">
          <div className="logged-admin-name">Name: {adminDetails?.name}</div>
          <div className="logged-admin-email">Email: {adminDetails?.email}</div>
          <div className="logged-admin-role">Role: {adminDetails?.role}</div>
        </div>
        <button onClick={handleAdminLogout} className="admin-btn">
          Logout
        </button>
      </div>
      <div className="w-1/2 user-table-container bg-[#1f2129] rounded-lg shadow-lg">
        <h2 className="text-white text-center font-semibold relative bottom-2">All Orders</h2>
        <table className="user-table">
          <thead>
            <tr className="table-heading">
              <th>Order ID</th>
              <th>User</th>
              <th>Quantity</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index} className="user-row" onClick={() => handleOrderDetails(order)}>
                <td className="text-white">{order._id}</td>
                <td className="text-white">{order.userId}</td>
                <td className="text-white">{order.products.length}</td>
                <td className="text-white">{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination gap-5 ">
          <button
            className="pagination-btn text-white"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          
          <button
            className="pagination-btn text-white"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
      {showOrderDetails && <OrderDetails />}
    </div>
  );
};

export default AdminSection;
