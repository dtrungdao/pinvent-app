import React, { useState } from "react";
import styles from './auth.module.scss'
import Card from '../../components/card/Card';
import { Link, useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify'
import { registerUser, validateEmail } from '../../services/authService';
import { useDispatch } from 'react-redux'
import { SET_LOGIN, SET_NAME } from '../../redux/features/auth/authSlice';

const initialState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
} 

const Register = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Loading process of browser
  const [isLoading, setIsLoading] = useState(false);

  //Get data when typing register information
  //Use of initialState
  const [formData, setFormData] = useState(initialState);

  //Structure all information in object formData
  const{name, email, password, confirmPassword} = formData;

  //Handle all information when typing register
  //e: parameter event
  const handleInput = (e) => {
    const {name, value} = e.target;
    setFormData({...formData, [name]: value});
  }

  //Process when clicking Register button
  const registerSubmit = async (e) => {
    e.preventDefault()

    if(!name || !email || !password){
      return toast.error("Please fill out all fields")
    }

    if(password.length < 8){
      return toast.error("Passwords have to be from 8 characters")
    }

    if(!validateEmail(email)){
      return toast.error("Please enter a valid email")
    }

    if(password !== confirmPassword){
      return toast.error("Passwords have to match")
    }

    const userData = {
      name, email, password,
    };

    setIsLoading(true);

    try {
      const data = await registerUser(userData);
      await dispatch(SET_LOGIN(true))
      await dispatch(SET_NAME(data.name))
      navigate("/dashboard")
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false)
    }
  }

  return (
    <div className={`container ${styles.auth}`}>
      <Card>
        <div className={styles.form}>
          <h2>Register</h2>

          <form onSubmit={registerSubmit}>
            <input type='text' placeholder='Full Name' required name='name' 
            value={name} onChange={handleInput}/>

            <input type='email' placeholder='Email' required name='email' 
            value={email} onChange={handleInput}/>
            
            <input type='password' placeholder='Password' required name='password' 
            value={password} onChange={handleInput}/>

            <input type='password' placeholder='Confirm Password' 
            required name='confirmPassword' value={confirmPassword} onChange={handleInput}/>

            <button type='submit' className='--btn --btn-primary --btn-block'>Register</button>
          </form>

          <span className={styles.register}>
            <p>&nbsp; Already have an account &nbsp;</p>
            <Link to="/login">Go to Login</Link>
          </span>
        </div>
      </Card>
    </div>
  );
};

export default Register;