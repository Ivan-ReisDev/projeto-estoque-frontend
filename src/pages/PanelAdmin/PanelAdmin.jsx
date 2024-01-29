import React, { useContext, useState } from 'react'
import  { InfoPanelAdmin }  from '../../components/InfoPenalAdmin/InfoPanelAdmin'
import './style.css'

import  NavAdmin  from '../../components/NavAdmin/NavAdmin'
import TableUser from '../../components/TableUser/TableUser'
import { UserContext } from '../../Context/UserContext'
import TableCategory from '../../components/TableCategory/TableCategory'

const PanelAdmin = () => {
  const { statePage } = useContext(UserContext)

  return (
    <div className='PanelAdmin flex flex-row '>
      <div className='w-2/6 flex flex-col'>
        <div className='w-full flex items-center justify-center'>
          <NavAdmin />
        </div>
        <div>

        </div>
      </div>

      <div className='w-4/6 flex flex-col'>
        <div className='flex w-full justify-center items-center '>
          <InfoPanelAdmin />
        </div>
        <div>
            {statePage === 1 && <TableUser />}
            {statePage === 2 && <TableCategory />}
        </div>
      </div>
    </div>
  )
}

export default PanelAdmin