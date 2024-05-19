import React, { useState } from 'react';
import "./Sidebar.scss";
import SidebarItem from "./SidebarItem"
import menu from '../../content/SidebarContent'
import telit from "../../assets/Telit_Cinterion_Logo.png"
import { HiMenuAlt4 } from "react-icons/hi";
import { useNavigate } from 'react-router-dom'


const Sidebar = ({children}) => {
  //State of sidebar is true
  const [open, setOpen] = useState(true);
  //Function to set the state of sidebar false
  const hide = () => setOpen(!open);
  const navi = useNavigate()

  const goToHome = () => {
    navi("/")
  }
  
  return (
    <div className='layout'>
        <div className='sidebar' style={{width: open ? "300px" : "70px"}}>
          <div className='top_section'>
            <div className='logo' style={{ display: open ? "block" : "none"}}>
                <img src={telit} width="70%" height="auto" onClick = {goToHome}></img>
            </div>
            <div className='hide-bar' style={{marginLeft: open ? "100px" : "0px"}}>
              <HiMenuAlt4 size={35} onClick={hide} />
            </div>
          </div>
          {menu.map((item, index) => {
            return <SidebarItem key = {index} item = {item} open={open}/>
          })} 
        </div>

        <main style={{paddingLeft: open ? "300px" : "70px"}}>{children}</main>
    </div>
  ) 
}

export default Sidebar;