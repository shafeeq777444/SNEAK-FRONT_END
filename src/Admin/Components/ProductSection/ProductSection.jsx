

import { useDispatch, useSelector } from "react-redux";
import { setProductModal, setEditableProduct } from "../../../redux/slices/productSlice";
import { deleteProduct, fetchProducts } from "../../../redux/thunks/productThunk";
import AddProduct from "../../Modals/AddProduct/AddProduct";
import "./ProductSection.css";
import { useEffect, useState } from "react";
import AdminProductCard from "./AdminProductCard";
// import { useNavigate } from "react-router-dom";
// import ProductCard from "../../../components/Product/ProductCard";

const ProductSection = () => {
    // const navigate=useNavigate()
    const dispatch = useDispatch();
    
    const [page, setPage] = useState(1);
      const handleNextPage = () => {
        if (page < totalPages) setPage((prev) => prev + 1);
      };
    
      const handlePreviousPage = () => {
        if (page > 1) setPage((prev) => prev - 1);
      };
      useEffect(()=>{
        dispatch(fetchProducts({page,limit:12}))
    },[page, dispatch])
    const { completeProducts, productModal } = useSelector((state) => state.products);
    const { products, totalPages }=completeProducts
   const allShoes=products || []
    

    // Add product Modal
    const handleAddProductModal = () => {
        dispatch(setProductModal(true));
        dispatch(setEditableProduct(null)); // Clear editable product for adding a new one
        // navigate("/productView")
    };

    const handleEditProduct = (product) => {
        dispatch(setEditableProduct(product));
        dispatch(setProductModal(true));
    };

    // const handleDeleteProduct = (product) => {
    //     dispatch(deleteProduct(product.id)); // Dispatch thunk to delete the product
    // };

    return (
        <div>
          {!productModal ? (
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-2 p-4 justify-items-center mx-auto">
                {allShoes.map((product, ind) => (
                  <AdminProductCard key={ind} product={product} />
                ))}
              </div>
              <button
                className="fixed right-5 bottom-5 addProduct-button"
                onClick={handleAddProductModal}
              >
                Add Product
              </button>
              <div className="flex  items-center mt-6 space-x-4 ">
    {/* <button
      className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50"
      onClick={handlePreviousPage}
      disabled={page === 1
    >
      Previous
    </button> */}
    {/* <span className="text-gray-700">Page {page} of {totalPages}</span>
    <button
      className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50"
      onClick={handleNextPage}
      disabled={page === totalPages}
    >
      Next
    </button> */}
  </div>
  <br />
            </div>
          ) : (
            <AddProduct />
          )}
        </div>
      );
      
};

export default ProductSection;
