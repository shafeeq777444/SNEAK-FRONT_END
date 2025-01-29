/* eslint-disable react/prop-types */
// /* eslint-disable react/prop-types */


// import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom"



const Check_Auth = ({role}) => {
    // const {user}=useSelector(state=>state.user)
    
    // console.log(user,"user")
  const location=useLocation();
  const isAdminPage=location.pathname.includes('admin')

// If authenticated but accessing admin pages as a non-admin, redirect to unauthorized page
if( role=="user" && isAdminPage)
  return(<Navigate to='/unauth_page' replace/>)
  
// Default: Render nested routes (children),(this case isAuthenticated User Accessing /shop/home,Authenticated Admin Accessing /admin/dashboard:)
return <Outlet/>;
}


export default Check_Auth
