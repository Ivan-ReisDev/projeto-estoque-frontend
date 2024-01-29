
import React, { useContext, useEffect } from 'react'
import Modal from 'react-modal';
import { Button } from 'react-bootstrap';
import { ContextCategory } from '../../Context/CategoryContext';
const ModalCategoryDelete = ({ isOpen, onClose, category, handleDeleteCategory }) => {
    const { message, setMessage } = useContext(ContextCategory);

    // useEffect(() => {
    //     // Definir um temporizador para mudar a mensagem após 3 segundos
    //     const time = setTimeout(() => {
    //       setMessage('');
    //     }, 5000);
    //     // Limpando o temporizador ao desmontar o componente (componentWillUnmount)
    //     return () => clearTimeout(time);
    //   }, [message]);


    return (
        <>
            <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="Detalhes do produto">
                <div className='border-b-2 w-full h-{20%}'>
                    <h2 className=' text-xl m-2 '>Excluir categoria</h2>
                </div>
                <div className='w-full flex flex-col items-center justify-center '>
                    <p className='pt-2' key={category._id}>Você deseja exluir a categoria <span className='font-bold'>{category.category}</span> ?  </p>
                </div>
                <div className=' h-{20%} flex flex-row items-center justify-end border-t-2 w-full'>
                    <Button type='submit' className='m-2' variant='primary' onClick={() => handleDeleteCategory(category._id)}> Excluir </Button>
                    <Button className='m-2' variant="danger" onClick={onClose}> Cancelar </Button>
                </div>
            </Modal>

        </>
    )
}

export default ModalCategoryDelete