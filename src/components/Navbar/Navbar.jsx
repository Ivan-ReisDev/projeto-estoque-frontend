import { useContext, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { FaMixer, FaBars, FaHome, FaBoxOpen } from "react-icons/fa";
import { MdAddBox } from "react-icons/md";
import { FaUsers } from "react-icons/fa6";
import { MdAdminPanelSettings  } from "react-icons/md";
import Logo from '../../assets/logoFundo.png'
import './navbar.css'
import { UserContext } from '../../Context/UserContext';

const Navbar = () => {

    const [sidebar, setSidebar] = useState(false);
    const { exit, profile} = useContext(UserContext)

    const eventSidebar = () => {
        setSidebar(!sidebar)

    }

    return (
        <header className='header'>

            <nav className='Navbar'>
                {sidebar ? (<button onClick={eventSidebar} className='btn-sidebar'><FaMixer /></button>) :
                    (<button onClick={eventSidebar} className='btn-sidebar'><FaBars /></button>)}
                <ul className={sidebar ? 'Navbar-ul' : 'Navbar-ul  active'}>
                    <li><NavLink to={'/home'}><span><FaHome className='iconNav' /></span> Home</NavLink></li>
                    <li><NavLink to={'/products'}> <span><FaBoxOpen className='iconNav' /></span> Inventário</NavLink></li>
                    <li><NavLink to={'/products/register'}> <span><MdAddBox className='iconNav' /></span>Cadastrar</NavLink></li>
                    <li><NavLink to={'/admin'}> <span><MdAdminPanelSettings  className='iconNav' /></span> Painel Administrativo</NavLink></li>
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