import ReactModal from 'react-modal';
import './style.css'

// eslint-disable-next-line react/prop-types
const ModalDelete = ({ isOpen, onClose, reserve, handleDelete }) => {

    
    return (
        <ReactModal isOpen={isOpen} onRequestClose={onClose} contentLabel="Detalhes do produto" className='modalDelete'>
            <h2>Atenção!</h2>
            {reserve && (
                <div className='container_modal container_modal_delete'>
                    <p>Você tem certeza que deseja excluir o produto <span className='itemProducts'>{reserve.nameProducts}</span></p>
                    <input type="button" value={"Excluir"} onClick={() => handleDelete(reserve._id)} />
                    <div className='close'>
                        <button onClick={onClose}>X</button>
                    </div>
                </div>
            )}
        </ReactModal>
    );

}

export default ModalDelete;