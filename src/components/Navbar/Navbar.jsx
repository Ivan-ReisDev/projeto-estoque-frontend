import { useContext, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { FaBars, FaHome, FaBoxOpen } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { MdAddBox } from "react-icons/md";

import { MdAdminPanelSettings  } from "react-icons/md";
import Logo from '../../assets/logoFundo.png'
import './navbar.css'
import { UserContext } from '../../Context/UserContext';
import { ContextProducts } from '../../Context/ProductsContext';

const Navbar = () => {

    const [sidebar, setSidebar] = useState(false);
    const { exit, profile} = useContext(UserContext)
    const { searchAllProducts } = useContext(ContextProducts);


    const eventSidebar = () => {
        setSidebar(!sidebar)
        
    }

    const getProducts = () => {
        eventSidebar()
        searchAllProducts()
    }

    return (
        <header className='header'>

            <nav className='Navbar'>
                {sidebar ? (<button onClick={eventSidebar} className='btn-sidebar'><AiOutlineClose /></button>) :
                    (<button onClick={eventSidebar} className='btn-sidebar'><FaBars /></button>)}
                <ul className={sidebar ? 'Navbar-ul' : 'Navbar-ul  active'}>
                    <li><NavLink to={'/home'} onClick={eventSidebar} ><span><FaHome className='iconNav' /></span> Home</NavLink></li>
                    <li><NavLink to={'/products'} onClick={eventSidebar}> <span><FaBoxOpen className='iconNav' /></span> Inventário</NavLink></li>
                    <li><NavLink to={'/products/register'} onClick={eventSidebar}> <span><MdAddBox className='iconNav' /></span>Cadastrar</NavLink></li>
                    { profile && profile.userType === "Administrador" && <li><NavLink to={'/admin'} onClick={eventSidebar}> <span><MdAdminPanelSettings  className='iconNav' /></span> Painel Administrativo</NavLink></li>}
                    <li><button onClick={() => exit()}>Logout</button></li>
                </ul>
            </nav>
            <NavLink to={'/home'} className='logo'>
                <img src={Logo} alt="logo carropeça" /><h1>Carro peças</h1> <span>v Alfa 1.5</span>
            </NavLink>

        </header>
    )
}

export default Navbar