import React, { useContext, useEffect } from 'react'
import Modal from 'react-modal';
import { Button } from 'react-bootstrap';
import { UserContext } from '../../Context/UserContext';
const ModalDeleteUser = ({ isOpen, onClose, user  }) => {

    const { handleDeleteUser, setIsModalOpenUserDelete } = useContext(UserContext)

    const deleteUser = (id) => {
        handleDeleteUser(user._id)
        setIsModalOpenUserDelete(false)
    }
    return (
        <>
            <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="Detalhes do produto">
                <div className='border-b-2 w-full h-{20%}'>
                    <h2 className=' text-xl m-2 '>Excluir usuário</h2>
                </div>
                <div className='w-full flex flex-col items-center justify-center '>
                    <p className='pt-2' key={user._id}>Você deseja exluir o usuário <span className='font-bold'>{user.user}</span> ?  </p>
                </div>
                <div className=' h-{20%} flex flex-row items-center justify-end border-t-2 w-full'>
                    <Button type='submit' className='m-2' variant='primary' onClick={() => deleteUser(user._id)}> Excluir </Button>
                    <Button className='m-2' variant="danger" onClick={onClose}> Cancelar </Button>
                </div>
            </Modal>
        </>
    )
}

export default ModalDeleteUser