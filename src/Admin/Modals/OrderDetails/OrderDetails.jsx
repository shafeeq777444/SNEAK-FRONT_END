import { useSelector, useDispatch } from "react-redux";
// import { setSelectedOrder } from "../../../redux/slices//cartSlice"; // Import action to reset selectedOrder
import "./OrderDetails.css";
import { setShowOrderDetails, setShowUserDetails } from "../../../redux/slices/adminSlice";
import { updateOrderStatus } from "../../../redux/thunks/adminThunk";

const OrderDetails = () => {
    // Get selectedOrder from the Redux store
    const selectedOrder = useSelector((state) => state.admin.selectedOrder);
    const orderStatus = useSelector((state) => state.admin.orderStatus);
    const dispatch = useDispatch();

    // Function to close the order details (resetting the selectedOrder)
    const handleOrderClose = () => {
        // dispatch(setShowUserDetails(true));
        dispatch(setShowOrderDetails(false)); // Dispatch action to reset selectedOrder in Redux
    };
    // Function to handle status change
    const handleChangeStatus = (status) => {
        dispatch(updateOrderStatus({ orderId: selectedOrder._id, status }));
    };

    return (
        <div className="user-details-modal-main-div">
        <div className="order-details-main-div">
            {console.log(selectedOrder, "orderDetaila-section")}

            {/* Order Header Section */}
            <div className="invoice-header">
                <h2 className="invoice-text">Invoice</h2>
                <div className="invoice-date">
                    <b>
                        {`Date: ${new Date(selectedOrder.createdAt).toLocaleDateString()}`}
                        <br />
                        {`Time: ${new Date(selectedOrder.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`}
                    </b>
                    <br />
                    {`Payment Method: ${selectedOrder.paymentMethod}`}
                    <br />
                    {`status:${orderStatus}`}
                   
                    {/* {`Day: ${selectedOrder.orderDay} `} */}
                </div>
                <div className="text-sm relative top-5 selected-order-id">
                    <strong>Order ID:</strong> {selectedOrder._id}
                </div>
            </div>

            {/* Order Details Table */}
            <table className="order-details-table">
                <thead>
                    <tr>
                        <th>Product Code</th>
                        <th>Product Name</th>
                        <th>Gender</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {selectedOrder.products.map((item, ind) => (
                        <tr key={ind}>
                            <td>{item.productId._id}</td>
                            <td>{item.productId.productName}</td>
                            <td>{item.productId.category}</td>
                            <td>{item.productId.price}</td>
                            <td>{item.quantity}</td>
                            <td>{item.productId.price * item.quantity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Total Price and Other Info */}
            <div className="order-summary">
                <div className="order-total-price">
                    <strong>Total Price: </strong>
                    {selectedOrder.totalPrice}
                </div>
                <div className="order-phoneNumber">
                    <strong>Phone Number: </strong>
                    {selectedOrder.shippingAddress.phoneNumber}
                </div>
                <div className="order-address">
                    <strong>Address: </strong>
                    {selectedOrder.shippingAddress.address}
                </div>
                <div className="order-upi-id">
                    <strong>UPI ID: </strong>
                    {selectedOrder.paymentId}
                </div>
            </div>
            {/* Status Buttons */}
            <div className="status-buttons">
                    <button onClick={() => handleChangeStatus("placed")} className="status-button">
                        Mark as Placed
                    </button>
                    <button onClick={() => handleChangeStatus("shipped")} className="status-button">
                        Mark as Shipped
                    </button>
                    <button onClick={() => handleChangeStatus("delivered")} className="status-button">
                        Mark as Delivered
                    </button>
                    <button onClick={() => handleChangeStatus("cancelled")} className="status-button">
                        Cancel Order
                    </button>
                </div>
            <button className="close-order-button" onClick={handleOrderClose}>
                Close
            </button>
        </div>
        </div>
    );
};

export default OrderDetails;
