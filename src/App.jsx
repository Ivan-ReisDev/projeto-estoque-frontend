import './App.css'
import Logoimg from './assets/0d439584-f7db-40ea-bc41-207e06308528-removebg-preview.png'

function App() {
  return (
    <>
      <div className='wallpaper'>
        <div className='login'>
          <img src={Logoimg} className='Logo' alt="Logo Carro Peça" />
          <h1>Carro Peça</h1>
          <form className='form' action="POST">
            <label htmlFor="email">e-mail</label>
            <input type="email" id='email' name='email' />
            <label htmlFor="password">Senha</label>
            <input type="password" name='password' id='password' />
            <input type="submit" value='Login' />
          </form>

        </div>
      </div>
    </>
  )
}

export default App
