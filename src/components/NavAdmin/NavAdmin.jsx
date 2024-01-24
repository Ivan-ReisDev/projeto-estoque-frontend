import React from 'react';
import { FaUsers } from "react-icons/fa6";
import { BiCategory } from "react-icons/bi";

const NavAdmin = () => {
  return (
    <div className='w-80  absolute top-8 border-1 border-[#acacac]'>
      <div className='text-white pl-1 h-full  bg-[#34495E] w-full'>
        <h4 className='m-0 text-base py-0.5'>Menu administrativo</h4>
      </div>
      <div className='flex flex-col text-lg min-h-full bg-[#fff] items-start ' >
        <button className=' pl-2 text-base flex flex-row items-center w-full border-b p-1 border-[#d8d8d8]'><span className='mx-2'><FaUsers /></span> Usuários</button>
        <button className=' pl-2 text-base flex flex-row items-center w-full border-b p-1  border-[#d8d8d8]'><span className='mx-2'><BiCategory /></span> Categoria</button>
        <button className=' pl-2 text-base flex flex-row items-center w-full border-b p-1 '><span className='mx-2'><FaUsers /></span> Usuários</button>
      </div>
    </div>
  );
};

export default NavAdmin;
