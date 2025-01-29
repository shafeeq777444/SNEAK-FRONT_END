/* eslint-disable react/prop-types */
// import { useSelector } from "react-redux";

import { useDispatch, useSelector } from "react-redux";
import { razorpay, verifyPayment } from "../../redux/thunks/orderThunk";
import { useNavigate } from "react-router-dom";

const RazorpayPayment = ({setPaymentModal,amount}) => {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const {phoneNumber,address,pincode}=useSelector(state=>state.order)
  const order=useSelector(state=>state.order)
  const loadRazorpay = () => {
    return new Promise((resolve, reject) => {
      if (document.getElementById('razorpay-script')) {
        // If script already exists, resolve immediately
        return resolve(true);
      }
  
      const script = document.createElement('script');
      script.id = 'razorpay-script';
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => reject(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    try {
      // Load Razorpay
      await dispatch(razorpay(amount));
      await loadRazorpay();

      // Create an order
     

      const options = {
        key: 'rzp_test_x3wKquS7fZKOHr', // Replace with your Razorpay key ID
        amount: order.amount*100,
        currency: "INR",
        order_id: order.id,
        name: 'SNEAK PAYMENT',
        description: 'Test transaction',
        image: 'https://res.cloudinary.com/dzznvyae4/image/upload/v1737520934/logo_tijvii.png', // Optional: Add your logo
        handler: async (response) => {
          await dispatch(verifyPayment({paymentId:response.razorpay_payment_id,address:{phoneNumber,address,pincode}}))
         
          console.log('Payment Response:', response);
          navigate('/')
        },
        prefill: {
          name: 'Your Name',
          email: 'your-email@example.com',
          contact: '9644335511',
        },
        theme: {
          color: '#F37254',
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error('Error during payment:', error);
    }
  };

  return (
    <div>
      <button className="bg-black text-white px-4 py-2 rounded-md shadow hover:bg-indigo-700" onClick={()=>{handlePayment()
        setPaymentModal(false)
      }}>Payment By Razorpay</button>
    </div>
  );
};

export default RazorpayPayment;
