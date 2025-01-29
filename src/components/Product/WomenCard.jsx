
import { useEffect, useState } from 'react';
import ProductCard from './ProductCard'; // Import the ProductCard component
import { useDispatch, useSelector } from 'react-redux'; // Import useSelector to access Redux state
import { fetchFemaleProducts} from '../../redux/thunks/productThunk';

const WomenCard = () => {
  // Access womenProducts from the Redux store
  const { womenProducts, totalPages } = useSelector((state) => state.products.femaleProducts);
  const [page, setPage] = useState(1);
  const handleNextPage = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top
  };

  const handlePreviousPage = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top
    if (page > 1) setPage((prev) => prev - 1);
  };
  const dispatch=useDispatch()
  useEffect(() => {
    dispatch(fetchFemaleProducts({ page }));
  }, [page, dispatch]);

  return (<>
    <div className="grid bg-white grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 p-4 justify-items-center mx-auto">
      {womenProducts.map((product, ind) => (
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

export default WomenCard;
