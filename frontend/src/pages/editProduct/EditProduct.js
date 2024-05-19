import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';
import { selectIsLoading, selectProduct,getProduct, 
  updateProduct,getProducts } from "../../redux/features/product/productSlice"
import ProductForm from '../../components/product/form/ProductForm';


const EditProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  //const navigate = useNavigate();

  const isLoading = useSelector(selectIsLoading)

  const edit = useSelector(selectProduct)
  const [product, setProduct] = useState(edit)
  const [productImage, setProductImage] = useState("")
  const [imagePreview, setImagePreview] = useState(null)
  const [description, setDescription] = useState("");

  useEffect(() => {
    dispatch(getProduct(id))
  }, [dispatch, id])

  useEffect(() => {
    setProduct(edit)
    setImagePreview(
      edit && edit.image ? `${edit.image.filePath}` : null
    )
    setDescription(
      edit && edit.description ? edit.description : ""
    )
  }, [edit])

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

    formData.append("name", product?.name)
    formData.append("category", product?.category)
    formData.append("inventorynumber", product?.inventorynumber)
    formData.append("serialnumber", product?.serialnumber)
    formData.append("model", product?.model)
    formData.append("guarantee", product?.guarantee)
    formData.append("price", product?.price)
    formData.append("statusDevice", product?.statusDevice)
    formData.append("belongTo", product?.belongTo)
    formData.append("description", product?.description)
    formData.append("comment", product?.comment)
    if(productImage){
      formData.append("image", productImage)
    }

    console.log(...formData)

    await dispatch(updateProduct({id, formData}))
    await dispatch(getProducts())

  }

  return (
    <div>
      {isLoading}
      <h3 className='--mt'>Edit a product</h3>
      <ProductForm 
      product = {product}
      productImage = {productImage}
      imagePreview = {imagePreview}
      description = {description}
      setDescription={setDescription}
      handleInput = {handleInput}
      handleImage = {handleImage}
      handleBelongToChange = {handleBelongToChange}
      saveProduct = {saveProduct}
      />
    </div>
  )
}

export default EditProduct