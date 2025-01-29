
import { useEffect, useRef, useState } from 'react';
import ProductCard from './ProductCard'; // Import the ProductCard component
import { useDispatch, useSelector } from 'react-redux'; // Import useSelector to access Redux state
import {  fetchMaleProducts} from '../../redux/thunks/productThunk';

const MenCard = () => {
  const topRef = useRef(null);
  const scrollToTop = () => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' }); // Smoothly scroll to the top of the element
    }
  };

  // Access womenProducts from the Redux store
  const { menProducts, totalPages } = useSelector((state) => state.products.maleProducts);
  const [page, setPage] = useState(1);
  const handleNextPage = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
    scrollToTop();  // Scroll to top
  };

  const handlePreviousPage = () => {
    if (page > 1) setPage((prev) => prev - 1);
    scrollToTop(); // Scroll to top
  };
  const dispatch=useDispatch()
  useEffect(() => {
    dispatch(fetchMaleProducts({ page }));
  }, [page, dispatch]);

  return (<>
    <div className="grid bg-white grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 p-4 justify-items-center mx-auto">
      {menProducts.map((product, ind) => (
        <ProductCard 
          key={ind} 
          product={product} 
        />
      ))}
    </div>
    <div className="flex justify-center items-center mt-6 space-x-4 ">
    <button
      className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50"
      onClick={handlePreviousPage}
      disabled={page === 1}
    >
      Previous
    </button>
    <span className="text-gray-700">Page {page} of {totalPages}</span>
    <button
      className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50"
      onClick={handleNextPage}
      disabled={page === totalPages}
    >
      Next
    </button>
  </div>
  <br />
  </>
  );
};

export default MenCard;
