import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../Context/AuthContext'
import { Link } from 'react-router-dom'
import Logo from '../../assets/logoFundo.jpg'


import { FaBars, FaMixer, FaPhoneAlt  } from "react-icons/fa";
import { FaHouse, FaUserTie, FaReact  } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";
import './style.css'

const Navbar = () => {
    const { exit } = useContext(Context)
    
    const [sidebar, setSidebar] = useState(false);
    const eventSidebar = () => { 
      setSidebar(!sidebar)
        }

    return (
        <header>
            <nav>
                {sidebar ? (<button onClick={eventSidebar} className='btn-sidebar'><FaMixer /></button>) :
                    (<button onClick={eventSidebar} className='btn-sidebar'><FaBars /></button>)}
                <ul className={sidebar ? "active" : ""} id='navBar'>
                   <li>,<Link to={'/home'}>Home</Link></li>
                   <li>,<Link to={'/products'}>Produtos</Link></li>
                   <li>,<Link to={'/home'}>Home</Link></li>
                </ul>
            </nav>

        </header>
    )
}

export default Navbar