import React from 'react'
import './style.css'
export default function PrimaryButton({ type, value }) {
  return (
    <>
        <button className='btnPrimary m-3'
        type={type}
        >{value}</button>
    </>
  )
}
