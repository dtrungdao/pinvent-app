import axios from 'axios';

const BACKEND_URL= process.env.REACT_APP_BACKEND_URL;
const API_URL = `${BACKEND_URL}/api/products/`

//Task create new product
export const createProduct = async (formData) => {
    const response = await axios.post(API_URL, formData)
    return response.data
}

//Task get one product
export const getProduct = async (id) => {
    const response = await axios.get(API_URL + id);
    return response.data;
}

//Task get all products
export const getProducts = async () => {
    const response = await axios.get(API_URL)
    return response.data
}

//Task delete product
export const deleteProduct = async (id) => {
    const response = await axios.delete(API_URL + id)
    return response.data
}

//Task update product
export const updateProduct = async (id, formData) => {
    const response = await axios.get(`${API_URL}${id}`, formData)
    return response.data
}

//Export all functions of class
export const productService = {
    createProduct,
    getProducts,
    getProduct,
    deleteProduct,
    updateProduct,
}