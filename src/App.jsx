import { Routes, Navigate, Route } from 'react-router-dom'
import { useContext } from 'react'
import Home from './pages/home/Home'
import AllProducts from './pages/allProducts/AllProducts'
import Navbar from './components/Navbar/Navbar'
import Login from './pages/login/Login'
import PanelUser from './pages/registerUser/PenelUser'
import './App.css'
import { Context } from './Context/AuthContext'


function App() {
  const { tokenUser } = useContext(Context)

  return (
    <>
      {tokenUser && <Navbar />}
      <Routes>
        <Route path='/' element={!tokenUser ? <Login /> : <Navigate to="/home" />} />
        <Route path='/home' element={tokenUser ? <Home /> : <Navigate to="/" />} />
        <Route path='/products' element={tokenUser ? <AllProducts /> : <Navigate to="/" />} />
        <Route path='/paneluser' element={tokenUser ? <PanelUser /> : <Navigate to="/" />} />
        <Route path='/*' element={!tokenUser && <Navigate to="/" />} />
      </Routes>

    </>
  )
}

export default App
