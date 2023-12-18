import { Routes, Route } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react';
import { useContext } from 'react'
import Home from './pages/home/Home'
import AllProducts from './pages/allProducts/AllProducts'
import Navbar from './components/Navbar/Navbar'
import Login from './pages/login/Login'
import PanelUser from './pages/registerUser/PenelUser'
import './App.css'
import { UserContext } from './Context/UserContext'
import RegisterProducts from './pages/registerProducts/RegisterProducts'


function App() {
  const { tokenUser } = useContext(UserContext)

  return (
    <>
      {tokenUser && <Navbar />}
      <Routes>
        <Route path='/' element={!tokenUser && <Login />} />
        <Route path='/home' element={tokenUser && <Home />} />
        <Route path='/products' element={tokenUser && <AllProducts />} />
        <Route path='/products/register' element={tokenUser && <RegisterProducts />} />
        <Route path='/paneluser' element={tokenUser && <PanelUser />} />
        <Route path='/*' element={tokenUser ? <Home /> : <Login />} />
      </Routes>
      <Analytics />
    </>
  )
}

export default App
