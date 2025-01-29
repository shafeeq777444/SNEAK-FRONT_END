import "./UserSection.css";
import { useSelector, useDispatch } from "react-redux";
import UserDetails from "../../Modals/UserDetails/UserDetails";
import { useEffect } from "react";
import { getUsers } from "../../../redux/thunks/userThunk";
import { setShowUserDetails, setSelectedUser } from "../../../redux/slices/adminSlice";
import OrderDetails from "../../Modals/OrderDetails/OrderDetails";

const UserSection = () => {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.user.users);
    const showUserDetails = useSelector((state) => state.admin.showUserDetails);
    const showOrderDetails = useSelector((state) => state.admin.showOrderDetails);

    // Filter users into active and deactivated
    const activeUsers = users.filter((user) => !user.isDeleted);
    const deactivatedUsers = users.filter((user) => user.isDeleted);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                await dispatch(getUsers());
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
        fetchUsers();
    }, [dispatch]);

    const handleUserProfile = (user) => {
        dispatch(setSelectedUser(user));
        dispatch(setShowUserDetails(true));
    };

    return (
        <div className="user-section flex justify-center  py-8 px-4 gap-3">
            {/* Left side: Active users table */}
            <div className="w-1/2 user-table-container bg-[#1f2129] rounded-lg shadow-lg">
                <h2 className="text-white text-center font-semibold relative bottom-2">Active Users</h2>
                <table className="user-table">
                    <thead>
                        <tr className="table-heading">
                            <th>User ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {activeUsers.map((user, index) => (
                            <tr key={index} className="user-row" onClick={() => handleUserProfile(user)}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.isDeleted ? 'Not Active' : 'Active'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Right side: Deactivated users table */}
            <div className="w-1/2 user-table-container bg-[#1f2129] rounded-lg shadow-lg">
                <h2 className="text-white text-center font-semibold relative bottom-2">Deactivated Users</h2>
                <table className="user-table">
                    <thead>
                        <tr className="table-heading">
                            <th>User ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {deactivatedUsers.map((user, index) => (
                            <tr key={index} className="user-row" onClick={() => handleUserProfile(user)}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.isDeleted ? 'Not Active' : 'Active'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modals */}
            {showUserDetails && <UserDetails />}
            {showOrderDetails && <OrderDetails />}
        </div>
    );
};

export default UserSection;
