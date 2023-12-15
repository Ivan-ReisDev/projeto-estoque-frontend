import { useContext } from 'react'
import ReactModal from 'react-modal';
import { Context } from '../../Context/AuthContext';
import './style.css'

const Modal = ({ isOpen, onClose, reserve }) => {


    const { formatarData } = useContext(Context)

    return (
        <ReactModal isOpen={isOpen} onRequestClose={onClose} contentLabel="Detalhes do produto">
            <h2>Detalhes da Reserva</h2>
            {reserve && (
                <div className='container_modal'>
                    <div>
                        <p>Criação: {formatarData(reserve.createdAt)}</p>
                        <p>Atualização: {formatarData(reserve.updatedAt)}</p>
                        <p>Nome: {reserve.nameProducts}</p>
                        <p>Descrição: {reserve.description}</p>
                        <p>Usuário: {reserve.category}</p>
                        <p>SKU: {reserve.codeSKU}</p>
                        <p>Marca: {reserve.mark}</p>
                        <p>Estoque: {reserve.stock}</p>
                        <p>Preço: {reserve.price}</p>
                        <p>Localização: {reserve.localization}</p>
                    </div>
                    <div>
                        <button onClick={onClose}>X</button>
                    </div>
                </div>
            )}
        </ReactModal>
    );

}

export default Modal