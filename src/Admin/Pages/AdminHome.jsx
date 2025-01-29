/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect } from "react";
import DashboardLayoutBasic from "../Components/Dashboard/DashboardLayoutBasic";
import "./AdminHome.css"
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { refreshId } from "../../redux/thunks/userThunk";


const AdminHome = () => {
    const dispatch=useDispatch()
    useEffect(()=>{
    dispatch(refreshId())
    },[])
    return (

        <div className="adminhome-main-div">
            
          
           <Outlet/>
           <DashboardLayoutBasic className="dashboard-navbar"/>
           
        </div>
    );
};

export default AdminHome;
