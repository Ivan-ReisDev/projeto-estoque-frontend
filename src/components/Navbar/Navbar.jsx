import { useContext, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { FaMixer, FaBars, FaHome, FaBoxOpen } from "react-icons/fa";
import { MdAddBox } from "react-icons/md";
import { FaUsers } from "react-icons/fa6";
import Logo from '../../assets/logoFundo.png'
import './navbar.css'
import { UserContext } from '../../Context/UserContext';

const Navbar = () => {

    const [sidebar, setSidebar] = useState(false);
    const { exit } = useContext(UserContext)

    const eventSidebar = () => {
        setSidebar(!sidebar)

    }

    return (
        <header className='header'>

            <nav className='Navbar'>
                {sidebar ? (<button onClick={eventSidebar} className='btn-sidebar'><FaMixer /></button>) :
                    (<button onClick={eventSidebar} className='btn-sidebar'><FaBars /></button>)}
                <ul className={sidebar ? 'Navbar-ul' : 'Navbar-ul  active'}>
                    <li><NavLink to={'/home'}><span><FaHome className='icon' /></span> Home</NavLink></li>
                    <li><NavLink to={'/products'}> <span><FaBoxOpen className='icon' /></span> Inventário</NavLink></li>
                    <li><NavLink to={'/cadastro'}> <span><MdAddBox className='icon' /></span>Cadastrar</NavLink></li>
                    <li><NavLink to={'/users'}> <span><FaUsers className='icon' /></span> Usuários</NavLink></li>
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