import { useContext } from 'react'
import ReactModal from 'react-modal';
import { UserContext } from '../../Context/UserContext';
import './style.css'

// eslint-disable-next-line react/prop-types
const Modal = ({ isOpen, onClose, reserve }) => {


    const { formatarData } = useContext(UserContext)

    return (
        <ReactModal isOpen={isOpen} onRequestClose={onClose} contentLabel="Detalhes do produto">
            <h2>Detalhes da Reserva</h2>
            {reserve && (
                <div className='container_modal'>
                    <div>
                        <p>Criação: {formatarData(reserve.createdAt)}</p>
                        <p>Atualização: {formatarData(reserve.updatedAt)}</p>
                        <p>Usuario: {reserve.nameUser}</p>
                        <p>Produto: {reserve.nameProducts}</p>
                        <p>Descrição: {reserve.description}</p>
                        <p>Categoria: {reserve.category}</p>
                        <p>SKU: {reserve.codeSKU}</p>
                        <p>Link: <a href={reserve.link}>{reserve.link}</a></p>
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