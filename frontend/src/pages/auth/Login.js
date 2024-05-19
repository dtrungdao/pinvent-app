import React, { useState } from 'react';
import styles from './auth.module.scss'
import Card from '../../components/card/Card';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { loginUser, validateEmail } from '../../services/authService';
import { SET_LOGIN, SET_NAME } from '../../redux/features/auth/authSlice';

const initialState = {
  email: "",
  password: "",
} 

const Login = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Loading process of browser
  const [isLoading, setIsLoading] = useState(false);

  //Get data when typing login information
  //Use of initialState
  const [formData, setFormData] = useState(initialState);

  //Structure all information in object formData
  const{email, password} = formData;

  //Handle all information when typing login
  //e: parameter event
  const handleInput = (e) => {
    const {name, value} = e.target;
    setFormData({...formData, [name]: value});
  }

  const loginSubmit = async (e) => {
    e.preventDefault();

    if(!email || !password){
      return toast.error("Please fill out all fields")
    }

    if(!validateEmail(email)){
      return toast.error("Please enter a valid email")
    }

    const userData = {
      email, password,
    };
    setIsLoading(true)
    try {
      const data = await loginUser(userData)
      console.log(data)
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
          <h2>Login to your account</h2>

          <form onSubmit={loginSubmit}>
            <input type='email' placeholder='Login' required name='email'
            value={email} onChange={handleInput} />
            <input type='password' placeholder='Password' required name='password'
            value={password} onChange={handleInput} />
            <button type='submit' className='--btn --btn-primary --btn-block'>Login</button>
          </form>
          <p>Forget password? Please contact our supporting team</p>
          <span className={styles.register}>
            <p>&nbsp; Don't have an account &nbsp;</p>
            <Link to="/register">Register</Link>
          </span>
        </div>
      </Card>
    </div>
  )
}

export default Login