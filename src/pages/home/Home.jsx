import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext.jsx'
import InventarioImg from '../../assets/Checking boxes-amico.png'
import CadastroProdut from '../../assets/cadastro.png'
import UsersImg from '../../assets/users.png'
import Relatorio from '../../assets/relatorio.png'
import './Home.css'


const Home = () => {

  const { profile } = useContext(UserContext);

  return (

    <div className='Home'>
      <div className='home-Principal'>
        <p>Olá, seja bem-vindo(a) {profile?.user}.</p>

        <div className='services'>
          <div className='service'>

            <Link to={'/products'} >
              <img src={InventarioImg} alt="" />
              Inventário
            </Link>
          </div>

          <div className='service'>
            <Link to={'/products/register'} >
              <img src={CadastroProdut} alt="" />
              Cadastrar Produto
            </Link>
          </div>

          <div className='service'>
            <Link to={'/products'} >
              <img src={Relatorio} alt="" />
              Relatórios
            </Link>
          </div>

          <div className='service'>
            <Link to={'/paneluser'} >
              <img src={UsersImg} alt="" />
              Usuários
            </Link>
          </div>


        </div>

      </div>

    </div>
  )
}

export default Home