import React, { useState } from 'react'
import "./UpdatePassword.scss"
import { toast } from 'react-toastify'
import { updatePassword } from '../../services/authService'
import Card from '../card/Card'
import { useNavigate } from 'react-router-dom'


const initialState = {
    oldPassword: "",
    newPassword: "",
    newPassword2: "",
} 

const UpdatePassword = () => {

    const navigate = useNavigate()
  
    //Get data when typing password information
    //Use of initialState
    const [formData, setFormData] = useState(initialState);
  
    //Structure all information in object formData
    const{oldPassword, newPassword, newPassword2} = formData;

    //Handle all information when typing password
    //e: parameter event
    const handleInput = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    }

    //Cases when updating password and show results in screen
    const updateP = async (e) => {
        e.preventDefault();

        if(newPassword !== newPassword2){
            return toast.error("New passwords have to match")
        }

        const formData = {
            oldPassword,
            newPassword
        }

        const data = await updatePassword(formData)

        toast.success(data)
        navigate("/profile")
    }

  return (
    <div className='updatepassword'>
        <Card cardClass={"password-card"}>
            <h2>Update Password</h2>
            <form onSubmit={updateP} className='--form-control'>

                <input type='password' placeholder='Old Password' 
                required name='oldPassword'
                value={oldPassword} onChange={handleInput} />

                <input type='password' placeholder='New Password' 
                required name='newPassword'
                value={newPassword} onChange={handleInput} />

                
                <input type='password' placeholder='Confirm new Password' 
                required name='newPassword2'
                value={newPassword2} onChange={handleInput} /> 

                <button type='submit' className='--btn --btn-primary'>
                    Update Password
                </button>  
                
            </form>
        </Card>
    </div>
  )
}

export default UpdatePassword