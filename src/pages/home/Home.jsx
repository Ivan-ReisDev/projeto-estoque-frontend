import React, { useContext, useEffect } from 'react'
import { Context } from '../../Context/AuthContext'


const Home = () => {
  const {exit} = useContext(Context)


  return (
    <div>Home 
      <button onClick={exit}>Logo-ut</button>
    </div>
  )
}

export default Home