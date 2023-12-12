import React, { useContext } from 'react'
import { Context } from '../../Context/AuthContext'
import Logoimg from '../../assets/0d439584-f7db-40ea-bc41-207e06308528-removebg-preview.png'
import './style.css'



const Login = () => {

const {dataLogin, setDataLogin, handleSubmitLogin, message} = useContext(Context)






  return (
    <div className='wallpaper'>
        <div className='login'>
        <h1>Login</h1>
          <img src={Logoimg} className='Logo' alt="Logo Carro Peça" />

          <form className='form' onSubmit={handleSubmitLogin}>
            <label htmlFor="email">e-mail</label>
            <input 
            className='inputEntry' 
            type="text" 
            id='email' 
            name='email' 
            placeholder='Digite seu e-mail' 
            onChange={(e) => setDataLogin({...dataLogin, email:e.target.value})}/>

            <label htmlFor="password">Senha</label>
            <input  className='inputEntry'
             type="password" 
             name='password' 
             id='password'
             onChange={(e) => setDataLogin({...dataLogin, password:e.target.value})}/> 
            <input className='btn-login' type="submit" value='Login' />
          </form>
            <p>{message ? message.error : ''}</p>
        </div>
  </div>
  )
}

export default Login