import React, { useContext, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { FaMixer, FaBars } from "react-icons/fa";

import Logo from '../../assets/logoFundo.jpg'
import './navbar.css'
import { Context } from '../../Context/AuthContext';

const Navbar = () => {

    const [sidebar, setSidebar] = useState(false);
    const { exit } = useContext(Context)

    const eventSidebar = () => {
        setSidebar(!sidebar)

    }

    return (
        <header className='header'>

            <nav className='Navbar'>
                {sidebar ? (<button onClick={eventSidebar} className='btn-sidebar'><FaMixer /></button>) :
                    (<button onClick={eventSidebar} className='btn-sidebar'><FaBars /></button>)}
                <ul className={sidebar ? 'Navbar-ul' : 'Navbar-ul  active'}>
                    <li><NavLink to={'/home'}>Home</NavLink></li>
                    <li><NavLink to={'/products'}>Produtos</NavLink></li>
                    <li><NavLink to={'/cadastro'}>Cadastrar</NavLink></li>
                    <li><NavLink to={'/users'}>Usuários</NavLink></li>
                    <li><button onClick={() => exit()}>Logout</button></li>
                </ul>
            </nav>
            <NavLink to={'/home'} className='logo'>
                <img src={Logo} alt="logo carropeça" /><h1>Carro peça</h1>
            </NavLink>

        </header>
    )
}

export default Navbar