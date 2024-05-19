import React from 'react'
import { MdDevices } from "react-icons/md";
import { Link } from 'react-router-dom';
import "./Home.scss";
import heroImg from "../../assets/inv-img.png"
import { ShowInLogin, ShowInLogout } from '../../components/protect/HiddenLink';


const Home = () => {
  return (
    <div className='home'>
        <nav className='container --flex-between'>
            <div className='logo'>
                <MdDevices size={35}/>
            </div>
            <ul className='home-links'>

                {/*Register button is shown when user is logged out*/}
                <ShowInLogout>
                    <li>
                        <button className='--btn --btn-primary'>
                            <Link to="/register">Register</Link>
                        </button>
                    </li>
                </ShowInLogout>
                
                {/*Login button is shown when user is logged out*/}
                <ShowInLogout>
                    <li>
                        <button className='--btn --btn-primary'>
                            <Link to="/login">Log In</Link>
                        </button>
                    </li>
                </ShowInLogout>
                
                {/*Dashboard button is shown when user is logged in*/}
                <ShowInLogin>   
                    <li>
                        <button className='--btn --btn-primary'>
                            <Link to="/dashboard">Go to dashboard</Link>
                        </button>
                    </li>
                </ShowInLogin>
                
            </ul>
        </nav>

        {/* NAME SHOULD BE INPUT */}
        <section className='container hero'>
            <div className='hero-text'>
                <h2>IT Inventory Management Telit Cinterion</h2>
                <p>This is a description</p>
                <div className='hero-button'>
                    <button className='--btn --btn-secondary'>
                        <Link to="/dashboard">Explore Inventory Management</Link>
                    </button>
                </div>
                <div className='--flex-start'>
                    <NumberText num="14K" text="Brand owners" />
                    <NumberText num="25K" text="Active users" />
                    <NumberText num="500+" text="Partners" />

                </div>
            </div>
            <div className='hero-image'>
                <img src={heroImg} alt='Inventory' />
            </div>

        </section>

    </div>
  )
}

const NumberText = ({num, text}) => {
    return(
        <div className='--mr'>
            <h3 className='--color-white'>{num}</h3>
            <p className='--color-white'>{text}</p>
        </div>
    )
};

export default Home