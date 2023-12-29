import React from 'react'
import InputMask from 'react-input-mask';



export default function InputFormatMoeda({ format, children }) {

  return (
    <InputMask
      mask= "999,99"  // Máscara de formatação
      maskChar={null}  // Remove o caractere de espaço reservado '_'
      placeholder="Digite o valor"
    />
  );
}
