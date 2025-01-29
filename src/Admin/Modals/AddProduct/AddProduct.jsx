/* eslint-disable react/prop-types */

import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field } from "formik";
import { addOrEditProduct } from "../../../redux/thunks/productThunk";
import { setProductModal, setEditableProduct } from "../../../redux/slices/productSlice";
import "./AddProducts.css";

const AddProduct = () => {
   
    const dispatch = useDispatch();
    const { productModal,editableProduct } = useSelector((state) => state.products);
    const initial = {
        productName: editableProduct ? editableProduct.productName : "",
        category:editableProduct ? editableProduct.category : "",
        description: editableProduct ? editableProduct.description : "",
        price: editableProduct ? editableProduct.price : 0,
        oldPrice: editableProduct ? editableProduct.oldPrice : 0,
        image: editableProduct ? editableProduct.image: "",
        sex: editableProduct ? editableProduct.sex : "",
        stock: editableProduct ? editableProduct.stock : "",
    };

    const handleSubmit = (values) => {
       console.log(values,"das")
        const isEdit=!!editableProduct
        const product={...values,_id:editableProduct?._id}
        dispatch(addOrEditProduct({product,isEdit})); 
        dispatch(setProductModal(false));
    };

    const closeModal = () => {
        dispatch(setProductModal(false));
        dispatch(setEditableProduct(null));
    };

    return (
        productModal && (
            <div className="absolute overlay-addproducts">
                <div className="addproduct-modal-main-div">
                    <Formik initialValues={initial} onSubmit={handleSubmit}>
                        {({setFieldValue})=>(
                        <Form className="addproducts-Form">
                            <button onClick={closeModal} className="close-product-modal">
                                &times;
                            </button>
                            <h1 className="add-product-head">{editableProduct ? "Edit Product" : "Add Product"}</h1>

                            

                            <div className="div-product-code">
                                <label htmlFor="productName">Product Name</label>
                                <Field
                                    className="product-field"
                                    type="text"
                                    id="productName"
                                    name="productName"
                                    placeholder="Product Name"
                                />
                            </div>

                            <div className="div-product-code">
                                <label htmlFor="productName">Category</label>
                                <Field
                                    className="product-field"
                                    type="text"
                                    id="category"
                                    name="category"
                                    placeholder="Category"
                                />
                            </div>

                            <div className="div-product-code">
                                <label htmlFor="description">Description</label>
                                <Field
                                    className="product-field"
                                    type="text"
                                    id="description"
                                    name="description"
                                    placeholder="Description..."
                                />
                            </div>

                            <div className="div-product-code">
                                <label htmlFor="price">Price</label>
                                <Field
                                    className="product-field"
                                    type="number"
                                    id="price"
                                    name="price"
                                    placeholder="Offer Price"
                                />
                            </div>

                            <div className="div-product-code">
                                <label htmlFor="oldPrice">Old Price</label>
                                <Field
                                    className="product-field"
                                    type="number"
                                    id="oldPrice"
                                    name="oldPrice"
                                    placeholder="Old Price"
                                />
                            </div>

                            <div className="div-product-code">
                                <label htmlFor="stock">stock</label>
                                <Field
                                    className="product-field"
                                    type="number"
                                    id="stock"
                                    name="stock"
                                    placeholder="stock"
                                />
                            </div>

                            <div className="div-product-code">
                                <label>Sex</label>
                                <div className="gender-div">
                                    <label>
                                        <Field type="radio" name="sex" value="male" /> Male
                                    </label>
                                    <label>
                                        <Field type="radio" name="sex" value="female" /> Female
                                    </label>
                                </div>
                            </div>

                            <div className="div-product-code">
                                <label htmlFor="image0">Image 1</label>
                                <input
                                    className="product-field"
                                    type="file"
                                    id="image0"
                                    name="image0"
                                    onChange={(event) => {
                                        const file = event.currentTarget.files[0]; // Get the selected file
                                        if (file) {
                                            // Set the field value with the file object
                                            setFieldValue("image0", file);
                                        } else {
                                            // If no file is selected, clear the field value
                                            setFieldValue("image", "");
                                        }
                                      }}
                                />
                            </div>
                            <div className="div-product-code">
                                <label htmlFor="image0">Image 2</label>
                                <input
                                    className="product-field"
                                    type="file"
                                    id="image1"
                                    name="image1"
                                    onChange={(event) => {
                                        const file = event.currentTarget.files[0]; // Get the selected file
                                        if (file) {
                                            // Set the field value with the file object
                                            setFieldValue("image1", file);
                                        } else {
                                            // If no file is selected, clear the field value
                                            setFieldValue("image", "");
                                        }
                                      }}
                                />
                            </div>
                            <button className="div-product-submit" type="submit">
                                Submit
                            </button>
                        </Form>)}
                    </Formik>
                </div>
            </div>
        )
    );
};

export default AddProduct;
