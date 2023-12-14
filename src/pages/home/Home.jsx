import React, { useContext, useEffect } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { Link } from 'react-router-dom'
import { Context } from '../../Context/AuthContext'
import './Home.css'


const Home = () => {

  const { profile } = useContext(Context);

  return (

    <div className='Home'>
      <div className='home-Principal'>
        <p>Olá, seja bem-vindo(a) {profile.user}.</p>

        <div className='services'>
            <Link to={'/products'} className='service'>

                    gdfgdfg
            </Link>

        </div>
      </div>


    </div>
  )
}

export default Home