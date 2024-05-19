import axios from 'axios';
import {toast} from 'react-toastify'


export const BACKEND_URL= process.env.REACT_APP_BACKEND_URL


export const validateEmail = (email) => {
    return email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
}

//Task register user
export const registerUser = async (userData) => {
    try {
        const response = await axios.post
        (`${BACKEND_URL}/api/users/register`, userData, 
        {withCredentials: true})
        if(response.statusText === "OK"){
            toast.success("Successful registered")
        }
        return response.data
    } catch (error) {
        const message = (
            error.response && error.response.data && error.response.data.message
        ) || error.message || error.toString();
        toast.error(message);
        console.log(error)
    }
}

//Task login user
export const loginUser = async (userData) => {
    try {
        const response = await axios.post
        (`${BACKEND_URL}/api/users/login`, userData)
        if(response.statusText === "OK"){
            toast.success("Successful logged in")
        }
        return response.data
    } catch (error) {
        const message = (
            error.response && error.response.data && error.response.data.message
        ) || error.message || error.toString();
        toast.error(message);
        console.log(error)
    }
}

//Task logout user
export const logoutUser = async () => {
    try {
        await axios.get(`${BACKEND_URL}/api/users/logout`);
    } catch (error) {
        const message = (
            error.response && error.response.data && error.response.data.message
        ) || error.message || error.toString();
        toast.error(message);
    }
}

//Task get login status
export const loginStatus = async () => {
    try {
        const response = await axios.get
        (`${BACKEND_URL}/api/users/loggedin`)
        return response.data
    } catch (error) {
        const message = (
            error.response && error.response.data && error.response.data.message
        ) || error.message || error.toString();
        toast.error(message);
        console.log(error)
    }
}

//Task get user data
export const userData = async () => {
    try {
        const response = await axios.get
        (`${BACKEND_URL}/api/users/getuser`)
        return response.data
    } catch (error) {
        const message = (
            error.response && error.response.data && error.response.data.message
        ) || error.message || error.toString();
        toast.error(message);
        console.log(error)
    }
}

//Task get all users data
export const allUsersData = async () => {
    try {
        const response = await axios.get
        (`${BACKEND_URL}/api/users/getusers`)
        return response.data
    } catch (error) {
        const message = (
            error.response && error.response.data && error.response.data.message
        ) || error.message || error.toString();
        toast.error(message);
        console.log(error)
    }
}

//Task update user profile
export const userUpdate = async (formData) => {
    try {
        const response = await axios.patch
        (`${BACKEND_URL}/api/users/update`, formData)
        return response.data
    } catch (error) {
        const message = (
            error.response && error.response.data && error.response.data.message
        ) || error.message || error.toString();
        toast.error(message);
        console.log(error)
    }
}

//Task change password
export const updatePassword = async (formData) => {
    try {
        const response = await axios.patch
        (`${BACKEND_URL}/api/users/updatepassword`, formData)
        return response.data
    } catch (error) {
        const message = (
            error.response && error.response.data && error.response.data.message
        ) || error.message || error.toString();
        toast.error(message);
        console.log(error)
    }
}