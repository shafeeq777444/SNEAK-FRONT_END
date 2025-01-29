/* eslint-disable react-hooks/exhaustive-deps */

import { useDispatch, useSelector } from "react-redux";
import "./Chart.css";
import TinyBarChart from "./TinyBarChart";
import BasicLineChart from "./BasicLineChart";
import { useEffect } from "react";
import { dashBoardData } from "../../../redux/thunks/adminThunk";

import Card3D from "./Card3D";


const Chart = () => {
    const dispatch=useDispatch()

useEffect(()=>{
    dispatch(dashBoardData())
},[])    // Select data from Redux store
    // const { totalSale, users, admins, sellingProduct } = useSelector((state) => state.dashboard);
    // const { allProducts } = useSelector((state) => state.products);
const dashBoardDetails=useSelector(state=>state.admin.dashboardDetails)
    console.log(dashBoardDetails,"sda")

    // Admin ID validation
    // const adminid = JSON.parse(localStorage.getItem("id"));
    // if (adminid !== 1) return null;

    // Calculate total sold quantity
    // const totalQuantity = Object.values(sellingProduct).reduce((acc, x) => acc + x, 0);

    return (
        <div className="flex flex-col gap-40">
              
            <div className="relative top-10 flex justify-center gap-10 ">
                <Card3D title={"Best Selling:"} description={dashBoardDetails.bestSellingProduct?.productName} />
                <Card3D title={"Total Number of Sales:"} description={dashBoardDetails.totalProductsSold} />
            <Card3D title={"Total Sales Amount:"} description={dashBoardDetails.totalSale} />
            <Card3D title={"Total Users:"} description={dashBoardDetails.users} />
            </div>
             
                {/* <Card3D title={"Total Admins:"} description={dashBoardDetails?.admins?.length} /> */}
             <div className="chart-main-div">
            {/* <div className="total-sale"> */}
                    {/* <div className="total-sales-heading">Best Selling:</div> */}
                    {/* <Typewriter words={dashBoardDetails.bestSellingProduct?.productName}/> */}
                    {/* <div className="total-sales-value">{dashBoardDetails.bestSellingProduct?.productName}</div> */}
                    {/* <div className="total-sales-value">{dashBoardDetails.bestSellingProduct?.totalSold}</div> */}
                {/* </div> */}
                {/* <div className="total-sale">
                    <div className="total-sales-heading">Total Number of Sales:</div>
                    <div className="total-sales-value">{dashBoardDetails.totalProductsSold}</div>
                </div> */}
                {/* <div className="total-sale">
                    <div className="total-sales-heading">Total Sales Amount:</div>
                    <div className="total-sales-value">₹ {dashBoardDetails.totalSale}</div>
                </div> */}
                {/* <div className="total-sale">
                    <div className="total-sales-heading">Total Users:</div>
                    <div className="total-sales-value">{dashBoardDetails.users}</div>
                </div>
                <div className="total-sale">
                    <div className="total-sales-heading">Total Admins:</div>
                    <div className="total-sales-value">{dashBoardDetails?.admins?.length}</div>
                </div> */}
                {/* <div className="total-sale">
                    <div className="total-sales-heading">Types in Stock:</div>
                    <div className="total-sales-value">{dashBoardDetails.allProducts}</div>
                </div> */}
            </div>
            
            <div className="flex justify-center items-center relative bottom-10">
                <TinyBarChart />
              
                <BasicLineChart />
            </div> 
        </div>
    );
};

export default Chart;
