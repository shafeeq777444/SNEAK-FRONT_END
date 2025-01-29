/* eslint-disable react-hooks/exhaustive-deps */
import {  useEffect, useState } from 'react';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import './Cart.css'
import { useDispatch, useSelector } from 'react-redux';
import { getCart, removeCartProduct, updateCartItemQuantity } from '../redux/thunks/cartThunk';
import { cartValidationSchema } from './cartValidation';
// import Payment from '../components/PaymentModal.js/Payment';
import RazorpayPayment from '../components/cart/Razorpay';
import { razorpay } from '../redux/thunks/orderThunk';
import { setAddres } from '../redux/slices/orderSlice';
import { toast, ToastContainer } from 'react-toastify';

const Cart = () => {

  
  
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(getCart())
  },[])
  const userData=useSelector(state=>state.user.user)
  const [showpaymentModal,setPaymentModal]=useState(false)
  const cartItems=useSelector(state=>state.cart.cartItems)
  console.log(cartItems,"cart items");

  
  const calculateTotalPrice = () => {
    return cartItems?.reduce((total, item) => {
      if (item) {
        return total + item?.productId?.price * item?.quantity;
      }
      return total; 
    }, 0);
  };
  

  console.log(calculateTotalPrice());
  return (
    <>
      <div className="container mx-auto p-6">
        
        <h2 className="text-2xl font-semibold mb-4">Your Shopping Cart</h2>

        {userData ? (
          <>
            <Formik
              initialValues={{
                phoneNumber: '',
                address: '',
                pincode: '',
              }}
              validationSchema={cartValidationSchema}
              onSubmit={async(values)=>{
  
                await dispatch(setAddres(values))

                await dispatch(razorpay(parseInt(calculateTotalPrice())));
                console.log("clicked")
                setPaymentModal(true)
              }}
            >
              {() => (
                <Form className="mb-6">
                  <div className="mb-4">
                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                      Phone Number
                    </label>
                    <Field
                      name="phoneNumber"
                      type="text"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Enter phone number"
                    />
                    <ErrorMessage name="phoneNumber" component="div" className="text-red-500 text-sm" />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                      Address
                    </label>
                    <Field
                      name="address"
                      type="text"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Enter address"
                    />
                    <ErrorMessage name="address" component="div" className="text-red-500 text-sm" />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="pincode" className="block text-sm font-medium text-gray-700">
                      Pincode
                    </label>
                    <Field
                      name="pincode"
                      type="text"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Enter pincode"
                    />
                    <ErrorMessage name="pincode" component="div" className="text-red-500 text-sm" />
                  </div>
<div className='flex gap-3'>
                  <button
                    type="submit"
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md shadow hover:bg-indigo-700"
                  >
                    Payment
                  </button>
                  {showpaymentModal&&<RazorpayPayment setPaymentModal={setPaymentModal} amount={parseInt(calculateTotalPrice())}/>}
                  </div>
                </Form>
              )}
            </Formik>

            <div className="space-y-4">
            {cartItems?.map((item, ind) => (
  <div
    key={ind}
    className="flex justify-between items-center p-4 border border-gray-200 rounded-lg shadow-sm"
  >
    {item?.productId ? (
      <>
        <div className="w-16 h-16">
          {Array.isArray(item.productId.image) && item.productId.image.length > 0 ? (
            <img
              src={item.productId.image[0]}
              alt={item.productId.productName || "Product Image"}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span>No Image</span>
            </div>
          )}
        </div>

        <div className="flex-grow ml-4">
          <h3 className="text-lg font-medium">{item.productId.productName}</h3>
          <p className="text-gray-500">₹{item.productId.price}</p>
        </div>
      </>
    ) : (
      <div className="flex-grow text-red-500">
        <p>Invalid Product</p>
      </div>
    )}
    <div className="button-div w-52 flex items-center space-x-2">
      <button
        onClick={() => {
          dispatch(
            updateCartItemQuantity({
              productId: item?.productId?._id,
              size: item?.size,
              updateQuantity: +1,
            })
          ).then((re) => {
            console.log(re.error?.message);
            toast.error(re.error?.message);
          });
        }}
        className="px-1 py-0.5 text-black rounded"
      >
        +
      </button>
      <span>{item.quantity}</span>
      <button
        onClick={() => {
          dispatch(
            updateCartItemQuantity({
              productId: item?.productId?._id,
              size: item?.size,
              updateQuantity: -1,
            })
          ).then((re) => {
            console.log(re.error?.message);
            toast.error(re.error?.message, {
              style: {
                backgroundColor: "black",
                color: "white",
                border: "1px solid white",
              },
            });
          });
        }}
        className="px-1 py-0.5 text-black rounded"
      >
        -
      </button>
      <button
        onClick={() =>
          dispatch(
            removeCartProduct({
              productId: item?.productId?._id,
              size: item?.size,
            })
          )
        }
        className="px-2 py-1 text-xl text-black rounded-2xl"
      >
        x
      </button>
    </div>
  </div>
))}
           
            </div>
            <div className="mt-4 p-4 border border-gray-300 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium">Total Price</h3>
              <p className="text-xl font-bold">₹{calculateTotalPrice() ||0}</p>
            </div>
            <ToastContainer 
        position="top-center" 
        autoClose={1500} 
        newestOnTop={true} 
        hideProgressBar={false} 
        closeButton={false} 
        limit={3} 
        pauseOnHover={true}
        draggable={false} 
        rtl={false}
      />
            
          </>
        ) : (
          <p className="text-center text-gray-500">No items in the cart</p>
        )}
      </div>
    </>
  );
};

export default Cart;
