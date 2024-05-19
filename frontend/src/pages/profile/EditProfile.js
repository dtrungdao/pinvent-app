import React, { useEffect, useState } from 'react'
import './Profile.scss'
import { useSelector } from 'react-redux'
import { selectUser } from '../../redux/features/auth/authSlice'
import Card from '../../components/card/Card'
import { Link, useNavigate } from 'react-router-dom'
import { userUpdate } from '../../services/authService'
import { toast } from 'react-toastify'
import UpdatePassword from '../../components/password/UpdatePassword'


const EditProfile = () => {
    const [isLoading, setIsLoading] = useState(false)
    const user = useSelector(selectUser)
    const {email} = user
    const navigate = useNavigate()

    useEffect (() => {
        if (!email) {
            navigate("/profile")
        }
    }, [email,navigate])

    const initialState = {
        name: user?.name,
        email: user?.email,
        phone: user?.phone,
        department: user?.department,
        bio: user?.bio,
        photo: user?.photo,
    }

    const [profile, setProfile] = useState(initialState)
    const [profileImage, setProfileImage] = useState("second")

    //Handle all information when typing login
    //e: parameter event
    const handleInput = (e) => {
        const {name, value} = e.target;
        setProfile({...profile, [name]: value});
    };

    const handleImage = (e) => {
        setProfileImage(e.target.files[0])
    }

    const saveProfile = async (e) => {
        e.preventDefault();
        
        //Save profile to database
        const formData = {
            name: profile.name,
            phone: profile.phone,
            department: profile.department,
            bio: profile.bio,
            photo: profile.photo, //problem to be solved
        }

        const data = await userUpdate(formData)
        console.log(data)
        toast.success("User updated")
        navigate("/profile")
        setIsLoading(false)
    }

  return (
    <div className='profile --my2'>
        {isLoading}
        <Card cardClass={"card --flex-dir-column"}>
            <span className='profile-photo'>
                <img src={user?.photo} alt='profilepic' />
            </span>

            <form className='--form-control --m' onSubmit={saveProfile}>

            <span className='profile-data'>
                <p> 
                    <label>Name: </label>
                    <input type='text' name='name' value={profile?.name} 
                    onChange={handleInput}/>
                </p>

                <p> 
                    <label>Email: </label>
                    <input type='text' name='email' value={profile?.email} disabled />
                </p>

                <label>Department:</label>
                <select name="department" value={profile?.department} onChange={handleInput}>
                    <option value="">Select department (required)</option>
                    <option value="R&D">R&D</option>
                    <option value="Program management">Program management</option>
                    <option value="IT">IT</option>
                    <option value="Admin & HR">Admin & HR</option>
                    <option value="Operations">Operations</option>
                    <option value="Sales">Sales</option>
                </select>

                <p> 
                    <label>Phone number: </label>
                    <input type='text' name='phone' value={profile?.phone} 
                    onChange={handleInput}/>
                </p>
                
                <p> 
                    <label>Description: </label>
                    <input type='text' name='bio' value={profile?.bio} 
                    onChange={handleInput}/>
                    {/*<textarea type='text' name='bio' value={profile?.bio} 
                    onChange={handleInput} cols="20" rows="10"/>*/}
                </p>

                <p> 
                    <label>Photo: </label>
                    <input type='file' name='image' value={profile?.image} 
                    onChange={handleImage}/>
                </p>

                <div>
                    <button className='--btn --btn-primary'>Save Profile</button>
                </div>
            </span>
            </form>
        </Card>
        <br />

        <UpdatePassword />
    </div>
  )
}

export default EditProfile