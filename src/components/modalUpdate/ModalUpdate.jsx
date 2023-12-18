import { useContext } from 'react'
import ReactModal from 'react-modal';
import { UserContext } from '../../Context/UserContext';
import './style.css'

// eslint-disable-next-line react/prop-types
const Modal = ({ isOpen, onClose, reserve }) => {


    const { formatarData } = useContext(UserContext)

    return (
        <ReactModal isOpen={isOpen} onRequestClose={onClose} contentLabel="Detalhes do produto">
            <h2>Detalhes do Produto</h2>
            {reserve && (
                <div className='container_modal'>
                    
                        <div className='content_Modal'>

                            <label htmlFor="user">Usuário:</label>
                            <input type="text" value={`${reserve.nameUser}`} />

                            {/* <p><span className='itemProducts'>Criação:</span> {formatarData(reserve.createdAt)}</p>
                            <p><span className='itemProducts'>Atualização:</span> {formatarData(reserve.updatedAt)}</p>
                            <p><span className='itemProducts'>Usuario:</span> {reserve.nameUser}</p>
                            <p><span className='itemProducts'>Produto:</span> {reserve.nameProducts}</p>
                            <p><span className='itemProducts'>Categoria:</span> {reserve.category}</p>
                            <p><span className='itemProducts'>SKU:</span> {reserve.codeSKU}</p> */}
                        </div>
                        <div className='content_Modal'> 
                        <h2>Atualizar Produto</h2>
                            {/* <p><span className='itemProducts'>Link:</span> <a href={reserve.link} target='_blank' >{reserve.link}</a></p>
                            <p><span className='itemProducts'>Marca:</span> {reserve.mark}</p>
                            <p><span className='itemProducts'>Estoque:</span> {reserve.stock}</p>
                            <p><span className='itemProducts'>Preço:</span> R$ {reserve.price}</p>
                            <p><span className='itemProducts'>Localização:</span> {reserve.localization}</p>
                            <p><span className='itemProducts'>Descrição:</span> {reserve.description}</p> */}
                        </div>
                    
                    <div className='close'>
                        <button onClick={onClose}>X</button>
                    </div>
                </div>
            )}
        </ReactModal>
    );

}

export default Modal