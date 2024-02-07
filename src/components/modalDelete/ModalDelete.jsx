import Modal from 'react-modal';
import { Button } from 'react-bootstrap';
import { ContextCategory } from '../../Context/CategoryContext';
import './style.css'

// eslint-disable-next-line react/prop-types
const ModalDelete = ({ isOpen, onClose, reserve, handleDelete }) => {

    
    return (
        <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="Detalhes do produto">
        <div className='border-b-2 w-full h-{20%}'>
            <h2 className=' text-xl m-2 '>Excluir Produto</h2>
        </div>
        <div className='w-full flex flex-col items-center justify-center '>
            <p className='pt-2' key={reserve._id}>Você deseja exluir o produto <span className='font-bold'>{reserve.nameProducts}</span> ?  </p>
        </div>
        <div className=' h-{20%} flex flex-row items-center justify-end border-t-2 w-full'>
            <Button type='submit' className='m-2' variant='primary' onClick={() => handleDelete(reserve._id)}> Excluir </Button>
            <Button className='m-2' variant="danger" onClick={onClose}> Cancelar </Button>
        </div>
        </Modal>
    );

}

export default ModalDelete;