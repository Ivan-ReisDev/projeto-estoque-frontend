import React, { useContext, useEffect } from 'react'
import { useForm } from "react-hook-form";
import ReactModal from 'react-modal';
import { Button } from 'react-bootstrap';
import { ContextCategory } from '../../Context/CategoryContext';
const ModalCategory = ({ isOpen, onClose }) => {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const { handleSubmitCategory, message, setMessage } = useContext(ContextCategory);


    useEffect(() => {
        // Definir um temporizador para mudar a mensagem após 3 segundos
        const time = setTimeout(() => {
          setMessage('');
        }, 5000);
        // Limpando o temporizador ao desmontar o componente (componentWillUnmount)
        return () => clearTimeout(time);
      }, [message]);
    const onSubmit = (data) => {
        handleSubmitCategory(data);
        setValue("category", "")
    };

    return (
        <>
            <ReactModal isOpen={isOpen} onRequestClose={onClose} contentLabel="Detalhes do produto">
                <div className='border-b-2 w-full h-{20%}'>
                    <h2 className=' text-xl m-2 '>Cadastrar nova categoria</h2>
                </div>

                <div className='w-full flex flex-col items-center justify-center'>
                    <form className='w-full h-{100%} ' onSubmit={handleSubmit(onSubmit)}>
                        <div className='my-4 pb-2'>


                            <label htmlFor="category" className="m-0">Categoria *</label>
                            <input
                                type="text"
                                className={errors?.category ?.type === "required" ? " h-9 w-full  border-1 px-2 py-1 rounded-md focus:outline-none border-rose-500" : "w-full border-1 h-9 border-gray-300 px-2 py-1 rounded-md focus:outline-none focus:border-blue-500"}
                                id="category"
                                placeholder={"Digite o nome da categoria..."}
                                {...register("category", { required: true })}
                            />
                            {errors?.category && <p className=" text-xs p-0 m-0 my-2 text-red-500 ">Adicione o nome da categoria</p>}
                        </div>
                        {message && <p className=' text-center text-zinc-800 '>{message}</p>}
                        <div className=' h-{20%} flex flex-row items-center justify-end border-t-2 w-full'>
                            <Button type='submit' className='m-2' variant='primary'> Cadastrar </Button>
                            <Button className='m-2' variant="danger" onClick={onClose}> Cancelar </Button>
                        </div>
                    </form>
                    
                </div>

            </ReactModal>

        </>
    )
}

export default ModalCategory