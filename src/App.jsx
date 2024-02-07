import { Routes, Route } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react';
import { useContext } from 'react'
import Home from './pages/home/Home'
import AllProducts from './pages/allProducts/AllProducts'
import Navbar from './components/Navbar/Navbar'
import Login from './pages/login/Login'
import './App.css'
import { UserContext } from './Context/UserContext'
import RegisterProducts from './pages/registerProducts/RegisterProducts'
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './components/Footer/Footer';
import PanelAdmin from './pages/PanelAdmin/PanelAdmin';


function App() {
  const { tokenUser, profile } = useContext(UserContext)

  return (
    <>
      {tokenUser && <Navbar />}
      <Routes>
        <Route path='/' element={tokenUser ? <Home /> : <Login />} />
        <Route path='/home' element={tokenUser && <Home />} />
        <Route path='/products' element={tokenUser && <AllProducts />} />
        <Route path='/products/register' element={tokenUser && <RegisterProducts />} />
        <Route path='/*' element={tokenUser ? <Home /> : <Login />} />
        <Route path ='/admin' element={tokenUser && profile && profile.userType === "Administrador" && <PanelAdmin />} />
      </Routes>
      <Analytics />
    </>
  )
}

export default App
