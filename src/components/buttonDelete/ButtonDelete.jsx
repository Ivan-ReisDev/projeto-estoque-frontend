import React from 'react'
import { IoTrashBin } from "react-icons/io5";


export default function ButtonDelete({ info }) {
  return (
    <>
    <button className='buttonDelete'>
        <IoTrashBin/>
    </button>
    </>
  )
}
