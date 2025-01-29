import  { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWishlist, removeFromWishlist } from "../../redux/slices/wishlistSlice";
import ProductModal from "../modal/ProductModal";
import ProductCard from "../Product/ProductCard";
// import "./Wishlist.css";

const Wishlist = () => {
    const dispatch = useDispatch();
    const { items } = useSelector((state) => state.wishlist);

    useEffect(() => {
        dispatch(fetchWishlist());
    }, [dispatch]);

    const handleRemove = (productId) => {
        dispatch(removeFromWishlist(productId));
    };

    return (
        <div className="wishlist-container">
            <div className="grid bg-white grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 p-4 justify-items-center mx-aut">
                {items.map((item,ind) => (
                <ProductCard key={ind} product={item}/>
                ))}
            </div>
        </div>
    );
};

export default Wishlist;
