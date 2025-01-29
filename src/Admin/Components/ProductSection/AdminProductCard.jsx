/* eslint-disable react/prop-types */
// import "./style.css";
// import { useState } from "react";
// import ProductModal from "../modal/ProductModal.jsx";
// import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { setEditableProduct, setProductModal } from "../../../redux/slices/productSlice";
import AddProduct from "../../Modals/AddProduct/AddProduct";
import { deleteProduct } from "../../../redux/thunks/productThunk";


const AdminProductCard = ({product}) => {
  const dispatch=useDispatch()
    // const navigate=useNavigate()
    // const [isModalOpen, setModalOpen] = useState(false);
    const handleEditProduct = (product) => {
      dispatch(setEditableProduct(product));
      dispatch(setProductModal(true));
  };
  const handleDeleteProduct=(product)=>{
    console.log(product)
    dispatch(deleteProduct(product._id))

  }
   const productModal= useSelector(state=>state.products.ProductModal)
    // const handleCloseModal = () => {
        // setModalOpen(false);
    // };
    return (
        <>
            <div
                
                className="over group  m-1 mx-0 flex w-full max-w-[400px] flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md"
            >
                <a className="relative  mx-3 mt-3 flex h-40 overflow-hidden rounded-xl" href="#">
                    <img
                        className="peer absolute top-0 right-0 h-full w-full object-cover"
                        src={product.image[0]}
                        alt="product image"
                    />
                    <img
                        className="peer peer-hover:right-0 absolute top-0 -right-96 h-full w-full object-cover transition-all delay-100 duration-1000 hover:right-0"
                        src={product.image[1]}
                        alt="product image"
                    />
                    {/* <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
                        {parseInt(((product.oldPrice - product.price) / product.oldPrice) * 100)}% OFF
                    </span> */}
                </a>
                <div className="mt-4 px-3 pb-4">
                    <a href="#">
                        <h5 className="text-lg tracking-tight text-slate-900">{product.productName}</h5>
                    </a>
                    <div className="mt-2 mb-3 flex items-center justify-between">
                        <p>
                            <span className="text-l font-bold text-red-600">₹{product.price}</span>
                            <br />
                            {product.oldPrice && <span className="text-sm text-gray-500 line-through">₹{product.oldPrice}</span>}
                            <br />
                        <span className=" text-sm">{product.category}</span>
                        </p>
                        
                    </div>
                    <div className="flex justify-around "> 
                    <button onClick={()=>handleEditProduct(product)} className="bg-gray-900 text-white h-12 rounded-2xl w-1/3">Edit</button>
                    <button onClick={()=>handleDeleteProduct(product)} className="bg-gray-900 text-white h-12 rounded-2xl w-1/3">{product.isDeleted?"undo":"Delete"}</button>
                    </div>
                  
                </div>
            </div>
            {productModal&&<AddProduct
                // isOpen={isModalOpen}
                // onClose={handleCloseModal}
                editableProduct={product}
            ></AddProduct>}
            
        </>
    );
};

export default AdminProductCard;
