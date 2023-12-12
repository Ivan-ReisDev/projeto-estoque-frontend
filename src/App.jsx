import { Routes, Route} from 'react-router-dom'
import { useContext } from 'react'
import   Home   from './pages/home/Home'
import Login from './pages/login/Login'
import './App.css'
import { Context } from './Context/AuthContext'


function App() {
   const {tokenUser} = useContext(Context)

  return (
    <>
    <Routes>
      <Route path='/' element={<Login />}/>
      <Route path='/home' element={ tokenUser && <Home/>}/>
      <Route path='/*' element={ !tokenUser && <Login/>}/>
      <Route path='/*' element={ tokenUser && <Home/>}/>
    </Routes>
  
    </>
  )
}

export default App
