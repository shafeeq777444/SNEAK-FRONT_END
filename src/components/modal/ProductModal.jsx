/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
// src/components/productModal/ProductModal.js

import "./ProductModal.css";
import { useDispatch, useSelector } from "react-redux";
// Import the action from your cart slice
import { useNavigate, useParams } from "react-router-dom";
import { fetchProductById } from "../../redux/thunks/productThunk";
import { useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { addToCart } from "../../redux/thunks/cartThunk";
import { addToWishlist } from "../../redux/slices/wishlistSlice";
import { toast, ToastContainer } from "react-toastify";

const ProductModal = ({ isOpen, onClose, product }) => {
    const navigate=useNavigate()
    const {productId}=useParams()
    const productById=useSelector(state=>state.products.productById)
    useEffect(()=>{
        dispatch(fetchProductById(productId))
    },[])
    // Update image state when productById changes
useEffect(() => {
    if (productById && productById.image?.length > 0) {
      setImage(productById.image?.[0]); // Set the first image as default
    }
  }, [productById]);
  

    const dispatch = useDispatch();
    const [quantity,setQuantity]=useState(1)
    const [error,setError]=useState("")
    const [selectedSize, setSelectedSize] = useState(null);
    const [image,setImage]=useState("")
const user=useSelector(state=>state.user.user)
  const handleSizeSelect = (size) => {
    setError("")
    setSelectedSize(size); // Set the selected size
  };

    
    

    const handleAddToCart = () => {
        if(!selectedSize){
            setError("Please select a size")
            return
        }
        if(user){
          
          dispatch(addToCart({productById,quantity,size:selectedSize}))
    // Dispatch action to add product to cart
        navigate("/cart")
        }
        toast.error("Please login")
        
    };
    const handleAddToWhishlist=()=>{
      if(user){
        dispatch(addToWishlist(productById._id));
      }
      else{
        toast.error("Please login")
      }
      
    }

    // if (!isOpen) return null;

    return (
        <div className="font-sans  bg-white tracking-wide max-md:mx-auto">
          <ToastContainer/>
        <div className="bg-gradient-to-r  from-gray-600 via-gray-900 to-gray-900 md:min-h-[350px] grid items-start grid-cols-1 lg:grid-cols-5 md:grid-cols-2">
  
          <div className="lg:col-span-3 bg-gray-100 h-full p-6">
            <div className="relative bg-gray-100 h-full flex items-center justify-center lg:min-h-[580px]">
              <img src={image} alt="Product" className="lg:w-3/5 w-3/4 aspect-[511/580]  max-lg:p-8 object-cover" />
  {/* image buttons --------------- */}
              <div className="flex space-x-4 items-end absolute right-0 max-md:right-4 bottom-0">
                <div onClick={()=>setImage(productById?.image?.[0])} 
                className={`${image === productById?.image?.[0] ?'bg-white': 'bg-[#333]'}  w-9 h-9 grid items-center justify-center rounded-full rotate-90 shrink-0 cursor-pointer `}>
                  <svg xmlns="http://www.w3.org/2000/svg" className={` ${image === productById?.image?.[1] ? 'fill-[#fff]':'fill-[#333]'} w-3 h-3  inline`} viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M11.99997 18.1669a2.38 2.38 0 0 1-1.68266-.69733l-9.52-9.52a2.38 2.38 0 1 1 3.36532-3.36532l7.83734 7.83734 7.83734-7.83734a2.38 2.38 0 1 1 3.36532 3.36532l-9.52 9.52a2.38 2.38 0 0 1-1.68266.69734z" clipRule="evenodd" data-original="#000000"></path>
                  </svg>
                </div>
                <div onClick={()=>setImage(productById?.image?.[1])} className={`${image === productById?.image?.[1] ?'bg-white': 'bg-[#333]'} w-9 h-9 grid items-center justify-center rounded-full -rotate-90 shrink-0 cursor-pointer`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className={` ${image === productById?.image?.[1] ? 'fill-[#333]':'fill-[#fff]'} w-3 h-3  inline`} viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M11.99997 18.1669a2.38 2.38 0 0 1-1.68266-.69733l-9.52-9.52a2.38 2.38 0 1 1 3.36532-3.36532l7.83734 7.83734 7.83734-7.83734a2.38 2.38 0 1 1 3.36532 3.36532l-9.52 9.52a2.38 2.38 0 0 1-1.68266.69734z" clipRule="evenodd" data-original="#000000"></path>
                  </svg>
                </div>
              </div>
    {/* ---------------------------- */}
            </div>
          </div>
  
          <div className="lg:col-span-2 bg-gray-100 py-6 px-8 h-full">
            <div>
              <div className="flex gap-5 items-center">
                  <h2 className="text-xl font-bold text-gray-800">{productById.productName}</h2>
                  {/* <button><FaRegHeart className=" text-l"/></button> */}
                  
              </div>
  {/* review star */}
              <div className="flex space-x-1 mt-2">
                
                <svg className="w-4 h-4 fill-gray-800" viewBox="0 0 14 13" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                </svg>
                <svg className="w-4 h-4 fill-gray-800" viewBox="0 0 14 13" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                </svg>
                <svg className="w-4 h-4 fill-gray-800" viewBox="0 0 14 13" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                </svg>
                <svg className="w-4 h-4 fill-gray-800" viewBox="0 0 14 13" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                </svg>
                <svg className="w-4 h-4 fill-[#CED5D8]" viewBox="0 0 14 13" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                </svg>
              </div>
 {/* ------- */}
            </div>
  
            <div className="mt-6">
              <h3 className="text-lg font-bold text-gray-800">Price</h3>
              <p className="text-gray-800 text-3xl font-bold mt-2">₹{productById.price}</p>
            </div>
  
  {/* choode a size --------------*/}
    <div className="mt-6">
      <h3 className="text-lg font-bold text-gray-800">Choose a Size</h3>
      <div className="flex flex-wrap gap-2 mt-2">
        {["7", "8", "9", "10"].map((size) => (
          <button
            key={size}
            type="button"
            className={`w-10 h-10 border-2 rounded-full shrink-0 ${
              selectedSize === size
                ? "bg-gray-800 text-white border-gray-800"
                : "bg-white text-gray-800 border-white hover:border-gray-800"
            }`}
            onClick={() => handleSizeSelect(size)}
          >
            {size}
          </button>
        ))}
      </div>
      {error && <p className="mt-2 text-red-600">{error}</p>} {/* Error message */}
    </div>
  {/* ------------------------- */}
  {/* Qunatity----------------- */}
            <div className="mt-6">
              <h3 className="text-lg font-bold text-gray-800">Quantity</h3>
              <div className="flex divide-x border w-max mt-2 rounded overflow-hidden">
                <button onClick={()=>setQuantity(pre=>pre>1?pre-1:pre)} type="button" className="bg-gray-100 w-10 h-9 font-semibold flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-3 fill-current inline" viewBox="0 0 124 124">
                    <path d="M112 50H12C5.4 50 0 55.4 0 62s5.4 12 12 12h100c6.6 0 12-5.4 12-12s-5.4-12-12-12z" data-original="#000000"></path>
                  </svg>
                </button>
                <div className="w-10 h-9 font-semibold flex items-center justify-center text-gray-800 text-lg">
                  {quantity}
                </div>
                <button onClick={()=>setQuantity(pre=>pre<10?pre+1:pre)} type="button" className="bg-gray-800 text-white w-10 h-9 font-semibold flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-3 fill-current inline" viewBox="0 0 42 42">
                    <path d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z" data-original="#000000"></path>
                  </svg>
                </button>
              </div>
            </div>
    {/* ----------------------- */}
  
    {/* cart and whishlist */}
            <div className="flex gap-4 mt-6">
              <button onClick={handleAddToWhishlist}  type="button" className="w-full max-w-[200px] px-4 py-3 bg-gray-800 hover:bg-gray-900 text-white text-sm font-semibold rounded">Add to whishlist</button>
              <button onClick={handleAddToCart} type="button" className="w-full max-w-[200px] px-4 py-2.5 border border-gray-800 bg-transparent hover:bg-gray-50 text-gray-800 text-sm font-semibold rounded">Add to cart</button>
            </div>
        
              
  {/* ----------------------- */}
            <div className="flex flex-wrap items-center text-sm text-gray-800 mt-8">
              {productById.description}
            </div>
          </div>
        </div>
  {/* sneaker feature */}
        <div className="lg:mt-12 mt-6 max-w-2xl px-6">
          <h3 className="text-lg font-bold text-gray-800">Sneaker Features</h3>
  
          <ul className="grid sm:grid-cols-2 gap-3 mt-4">
            <li className="flex items-center text-sm text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="17" className="mr-4 bg-green-500 fill-white rounded-full p-[3px]" viewBox="0 0 24 24">
                <path d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z" data-original="#000000" />
              </svg>
              Multi-Terrain Durability
            </li>
            <li className="flex items-center text-sm text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="17" className="mr-4 bg-green-500 fill-white rounded-full p-[3px]" viewBox="0 0 24 24">
                <path d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z" data-original="#000000" />
              </svg>
              Lightweight and Breathable Design
            </li>
            <li className="flex items-center text-sm text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="17" className="mr-4 bg-green-500 fill-white rounded-full p-[3px]" viewBox="0 0 24 24">
                <path d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z" data-original="#000000" />
              </svg>
              Sleep Tracking
            </li>
            <li className="flex items-center text-sm text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="17" className="mr-4 bg-green-500 fill-white rounded-full p-[3px]" viewBox="0 0 24 24">
                <path d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z" data-original="#000000" />
              </svg>
              Anti-Fatigue Design

            </li>
            <li className="flex items-center text-sm text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="17" className="mr-4 bg-green-500 fill-white rounded-full p-[3px]" viewBox="0 0 24 24">
                <path d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z" data-original="#000000" />
              </svg>
              Moisture-Wicking and Odor Control
            </li>
            <li className="flex items-center text-sm text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="17" className="mr-4 bg-green-500 fill-white rounded-full p-[3px]" viewBox="0 0 24 24">
                <path d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z" data-original="#000000" />
              </svg>
              Eco-Friendly Materials
            </li>
          </ul>
          {/* ---------------------------- */}

        {/* product description */}
          <div className="mt-6">
            <h3 className="text-lg font-bold text-gray-800">Product Description</h3>
            <p className="text-sm text-gray-600 mt-4">{productById.description}</p>
          </div>
          {/* ---------------------------- */}
          <div className="h-16"></div>
        </div>
      </div>
    );
};

export default ProductModal;
