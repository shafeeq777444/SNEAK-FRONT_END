/* eslint-disable react/prop-types */
// src/components/profile/Profile.js
import  { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCartItems, clearUserData } from "../../redux/slices/cartSlice"; // Assuming clearUserData is the action to clear user data
import "./Profile.css";
import { logout } from "../../redux/thunks/userThunk";
import { setLogout } from "../../redux/slices/userSlice";

const Profile = ({ handleProfile }) => {
    const [render, setRender] = useState(false);
    const userData = useSelector((state) => state.user.user); // Get user data from Redux store
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(true);

    // Function to hide the popup
    const hidePopup = () => {
        setIsVisible(false);
    };

    const handleLogout = async() => {
        // setRender(!render);
        // dispatch(clearCartItems()); // Clear cart items on logout
        // dispatch(clearUserData()); // Clear user data in Redux
        // localStorage.clear(); // Clear local storage
        // window.location.reload(); // Reload page
        await dispatch(logout())
        dispatch(setLogout())
        navigate('/')
        localStorage.clear()
        navigate("/login"); // Redirect to login page

    };

    useEffect(() => {
        const handleScroll = () => {
            hidePopup();
        };

        // Adding event listeners
        window.addEventListener('scroll', handleScroll);

        // Cleanup function to remove event listeners
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    if (userData && isVisible) {
        return (
            <div className="profile-main md:z-50">
                <div className="profile-inner-main">
                    <button className="profile-close white" onClick={handleProfile}>X</button>
                    <img className="profile-img" src="/assets/extra/userProfile.jpg" alt="Profile" />
                    <div className="profile-texts-div">
                        <p className="profile-id">User Id: {userData?._id.slice(-4)}</p>
                        <p className="text-xs Profile-name">{userData?.name}</p>
                        <p>{userData?.email}</p>
                    </div>
                    <button className="profile-button" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </div>
        );
    } else if (!userData && isVisible) {
        return (
            <div>
                <button className="profile-login" onClick={handleLogout}>logIn</button>
            </div>
        );
    }

    return null; // Return null when no user data and not visible
};

export default Profile;
