import { Routes, Route} from 'react-router-dom'
import { useContext } from 'react'
import  Home    from './pages/home/Home'
import AllProducts from './pages/allProducts/AllProducts'
import Navbar from './components/Navbar/Navbar'
import Login from './pages/login/Login'
import './App.css'
import { Context } from './Context/AuthContext'


function App() {
   const {tokenUser} = useContext(Context)

  return (
    <>
    {tokenUser && <Navbar />}
    <Routes>
      <Route path='/' element={ tokenUser ? <Home /> : <Login />}/>
      <Route path='/home' element={ tokenUser && <Home/>}/>
      <Route path='/products' element={ tokenUser && <AllProducts/>}/>
      <Route path='/*' element={ !tokenUser && <Login/>}/>
    </Routes>
  
    </>
  )
}

export default App
