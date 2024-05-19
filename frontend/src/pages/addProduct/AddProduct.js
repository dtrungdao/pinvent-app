import React, { useState } from 'react'
import ProductForm from '../../components/product/form/ProductForm';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { createProduct, selectIsLoading } from "../../redux/features/product/productSlice"

const inititalState = {
    name: "",
    category: "",
    inventorynumber: "",
    serialnumber: "",
    model: "",
    guarantee: "",
    price: "",
    statusDevice: "",
    belongTo: "",
    description: "",

}

const AddProduct = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [product, setProduct] = useState(inititalState)
  const [productImage, setProductImage] = useState("")
  const [imagePreview, setImagePreview] = useState(null)
  //const [description, setDescription] = useState("");

  const isLoading = useSelector(selectIsLoading)

  const {name, category, inventorynumber, serialnumber, model, 
    guarantee, price, statusDevice, belongTo, description, comment} = product

  //Handle all information when typing add product
  //e: parameter event
  const handleInput = (e) => {
    const {name, value} = e.target;
    setProduct({...product, [name]: value});
  }

  const handleImage = (e) => { 
    setProductImage(e.target.files[0])
    setImagePreview(URL.createObjectURL(e.target.files[0]))
  }

  const handleBelongToChange = (e) => {
    setProduct({ ...product, belongTo: e.target.value });
  };

  const saveProduct = async (e) => {
    e.preventDefault()
    const formData = new FormData()

    formData.append("name", name)
    formData.append("category", category)
    formData.append("inventorynumber", inventorynumber)
    formData.append("serialnumber", serialnumber)
    formData.append("model", model)
    formData.append("guarantee", guarantee)
    formData.append("price", price)
    formData.append("statusDevice", statusDevice)
    formData.append("belongTo", belongTo)
    formData.append("description", description)
    formData.append("comment", comment)
    formData.append("image", productImage)

    console.log(...formData)

    await dispatch(createProduct(formData))

    navigate("/dashboard")
  }
    
  return <div>
    {isLoading}
    <h3 className='--mt'>Add a new product</h3>
    <ProductForm 
    product = {product}
    productImage = {productImage}
    imagePreview = {imagePreview}
    description = {description}
    handleInput = {handleInput}
    handleBelongToChange={handleBelongToChange}
    handleImage = {handleImage}
    saveProduct = {saveProduct}
    />
  </div>;
}

export default AddProduct