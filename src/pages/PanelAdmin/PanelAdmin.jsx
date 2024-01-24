import React from 'react'
import  { InfoPanelAdmin }  from '../../components/InfoPenalAdmin/InfoPanelAdmin'
import './style.css'
import  NavAdmin  from '../../components/NavAdmin/NavAdmin'
import TableUser from '../../components/TableUser/TableUser'

const PanelAdmin = () => {
  return (
    <div className='PanelAdmin flex flex-row '>
      <div className='w-2/6  flex flex-col'>
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
          <TableUser />
        </div>
      </div>
    </div>
  )
}

export default PanelAdmin