/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux"; // Import hooks from Redux
import "./search.css";
import ProductModal from "../modal/ProductModal";
import { fetchProducts, searchFetchProducts } from "../../redux/thunks/productThunk";
import { useNavigate } from "react-router-dom";
import { setWHishlistProduct } from "../../redux/slices/productSlice";

const Search = ({ handleSearch }) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [product, setProduct] = useState(null);
    const [searchValue, setSearch] = useState("");
    const [filterItems, setFilterItems] = useState([]);
    const [isSearchVisible, setSearchVisible] = useState(true);
    const dispatch = useDispatch();
    const searchRef = useRef(null); // Reference for the search component
const navigate=useNavigate()
    useEffect(() => {
        dispatch(searchFetchProducts());
    }, []);
console.log()
    const allShoes = useSelector((state) => state.products.searchProducts) || [];
    console.log(allShoes);

    useEffect(() => {
        const filteredItems = allShoes.filter((item) =>
            item.productName.toLowerCase().includes(searchValue.toLowerCase())
        );
        setFilterItems(filteredItems);
    }, [searchValue, allShoes]);

    // Handle outside clicks
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setSearchVisible(false); // Close the search component
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleCardClick = (item) => {
        dispatch(setWHishlistProduct(item))
        navigate(`/productView/${item._id}`)
        setModalOpen(true);
        setSearchVisible(false);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleOpenSearch = () => {
        setSearchVisible(true);
        setSearch("");
    };

    return (
        <>
            {isSearchVisible && (
                <div
                    ref={searchRef} // Attach the ref to this element
                    className="relative flex w-full flex-col rounded-lg border border-slate-200 bg-white shadow-sm p-4"
                >
                    <form className="mb-4">
                        <div onClick={handleSearch} className="search-close-btn-div">
                            <button className="search-close">x</button>
                        </div>
                        <input
                            value={searchValue}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search for products..."
                            className="w-full p-2 border border-slate-300 rounded-lg focus:outline-none"
                        />
                    </form>

                    <nav className="flex flex-col gap-2">
                        {filterItems.map((item, ind) => (
                            <div
                                onClick={() => handleCardClick(item)}
                                className="text-slate-800 flex w-full items-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 cursor-pointer"
                                key={ind}
                            >
                                <div className="mr-4 grid place-items-center">
                                    <img
                                        alt={item.productName}
                                        src={item.image[0]}
                                        className="relative inline-block h-12 w-12 rounded-full object-cover object-center"
                                    />
                                </div>
                                <div>
                                    <h6 className="text-slate-800 font-medium">{item.productName}</h6>
                                    <p className="text-slate-500 text-sm truncate">{item.description.split(' ').slice(0, 5).join(' ')}...</p>
                                </div>
                            </div>
                        ))}
                    </nav>
                </div>
            )}

           {/* {ProductModal && <ProductModal  product={product} />} */}
        </>
    );
};

export default Search;
