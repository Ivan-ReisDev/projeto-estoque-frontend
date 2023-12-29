import React from 'react'
import './style.css'

export default function InputNew({type, name, id, value, handleChange, placeholder, step, min, required}) {
  return (
    <>
        <input className='InputStandard' 
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        step={step}
        min={min}
        required={required}
        />
    </>
  )
}
